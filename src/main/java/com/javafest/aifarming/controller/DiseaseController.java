package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.repository.CropRepository;
import com.javafest.aifarming.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DiseaseController {

    private final DiseaseRepository diseaseRepository;
    private final CropRepository cropRepository;

    @Autowired
    public DiseaseController(DiseaseRepository diseaseRepository, CropRepository cropRepository) {
        this.diseaseRepository = diseaseRepository;
        this.cropRepository = cropRepository;
    }

//    @GetMapping("/user")
//    public ResponseEntity<String> getCurrentUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        return ResponseEntity.ok("Logged in as: " + username);
//    }

    @GetMapping("/disease/")
    public List<Disease> getAllDisease() {
        return diseaseRepository.findAll();
    }

    @GetMapping("/disease/{cropTitle}/{diseaseTitle}")
    public Disease getCropsByCategoryTitleAndDisease(@PathVariable String cropTitle, @PathVariable String diseaseTitle) {
        return diseaseRepository.findByCropTitleAndDiseaseTitleExact(cropTitle, diseaseTitle);
    }

    @GetMapping("/disease")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Disease> getCropsByDisease(@RequestParam(value = "crop", required = false) String cropTitle,
                                           @RequestParam(value = "disease", required = false) String diseaseTitle,
                                           @RequestParam(value = "search", required = false) String search) {
        List<Disease> diseases;
        if (cropTitle != null) {
            // Case 1: crop is provided, search is optional
            if (cropTitle.isEmpty()) {
                diseases = diseaseRepository.findBySearch(search);
            }
            else {
                diseases = diseaseRepository.findByCategoryTitleAndDisease(cropTitle, search);
            }
        } else if (cropTitle != null) {
            diseases = diseaseRepository.findByTitle(cropTitle);
        } else if (diseaseTitle != null) {
            diseases = diseaseRepository.findByDiseaseTitle(diseaseTitle);
        } else if (search != null) {
            diseases = diseaseRepository.findBySearch(search);
        }
        else {
            // Handle the case when both parameters are missing.
            // For example, return an error message or an empty list.
            diseases = Collections.emptyList();
        }
        return diseases;
    }

//    @PostMapping("/disease/")
////    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public Disease addDisease(@RequestBody Disease disease) {
//        // Check if the Crop already exists in the database based on CropCategory ID and disease
//        List<Disease> existingDiseases = diseaseRepository.findByCropIdAndDiseaseExact(
//                disease.getCrop().getId(), disease.getTitle()
//        );
//
//        if (existingDiseases.isEmpty()) {
//            // No Crop with the same CropCategory ID and disease found, so add the new Crop
//            return diseaseRepository.save(disease);
//        } else {
//            // A Crop with the same CropCategory ID and disease already exists
//            // You can choose to handle this situation as you desire, e.g., return an error message or update the existing Crop.
//            // For simplicity, let's just return null here.
//            return null;
////            throw new IllegalArgumentException("Crop with the same CropCategory and disease already exists.");
//        }
//    }

    @PostMapping("/disease/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> addDisease(
            @RequestParam("title") String title,
            @RequestParam("img") MultipartFile file,
            @RequestParam("description") String description,
            @RequestParam("cropId") Long cropId
    ) throws IOException {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + cropId));



        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Please select a file to upload.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Check if the uploaded file is an image
        if (!isImageFile(file)) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Only image files are allowed.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Set the appropriate path to store the image (adjust this to your needs)
        String imagePath = "\\Users\\nayem\\OneDrive\\Desktop\\images";

        // Create the directory if it doesn't exist
        Path imageDir = Paths.get(imagePath);
        if (!Files.exists(imageDir)) {
            Files.createDirectories(imageDir);
        }

        // Generate a unique file name for the image
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Save the image file using the provided path
        Path targetPath = imageDir.resolve(fileName);
        Files.copy(file.getInputStream(), targetPath);

        // Set the image path to the Disease object
//        disease.setImg(targetPath.toString());
        Disease disease = new Disease(title, "/api/picture?link=images/" + fileName, description, crop);


        // Save the Disease object to the database
        diseaseRepository.save(disease);

        // Create a response with the link to the uploaded image
        Map<String, Object> response = new HashMap<>();
        response.put("successfully added!", disease);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }



//    @PutMapping("/disease/{id}")
////    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public Disease updateDisease(@PathVariable Long id, @RequestBody Disease updatedDisease) {
//        Disease disease = diseaseRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));
//
//        disease.setTitle(updatedDisease.getTitle());
//        disease.setImg(updatedDisease.getImg());
//        disease.setDescription(updatedDisease.getDescription());
//        //crop.setId(updatedCrop.getId());
//        return diseaseRepository.save(disease);
//    }

    @PutMapping("/disease/{diseaseId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> updateDisease(
            @PathVariable("diseaseId") Long id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "img", required = false) MultipartFile file,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "cropId", required = false) Long cropId
    ) throws IOException {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));

        if (title != null) {
            disease.setTitle(title);
        }

        if (file != null && !file.isEmpty()) {
            if (!isImageFile(file)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Only image files are allowed.");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            String imagePath = "\\Users\\nayem\\OneDrive\\Desktop\\images";
            Path imageDir = Paths.get(imagePath);
            if (!Files.exists(imageDir)) {
                Files.createDirectories(imageDir);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetPath = imageDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath);

            disease.setImg("/api/picture?link=images/" + fileName);
        }

        if (description != null) {
            disease.setDescription(description);
        }

        if (cropId != null) {
            Crop crop = cropRepository.findById(cropId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + cropId));
            disease.setCrop(crop);
        }

        // Save the updated Disease object to the database
        diseaseRepository.save(disease);

        // Create a response with the updated disease details
        Map<String, Object> response = new HashMap<>();
        response.put("successfully updated!", disease);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }


    @DeleteMapping("/disease/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteDisease(@PathVariable Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));

        diseaseRepository.delete(disease);
    }
}
