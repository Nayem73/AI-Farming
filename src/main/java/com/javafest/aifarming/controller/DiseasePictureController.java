package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.model.DiseasePicture;
import com.javafest.aifarming.repository.DiseasePictureRepository;
import com.javafest.aifarming.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DiseasePictureController {
    private final DiseasePictureRepository diseasePictureRepository;
    private final DiseaseRepository diseaseRepository;

    @Autowired
    public DiseasePictureController(DiseasePictureRepository diseasePictureRepository, DiseaseRepository diseaseRepository) {
        this.diseasePictureRepository = diseasePictureRepository;
        this.diseaseRepository = diseaseRepository;
    }

    @GetMapping("/disease/{diseaseId}/picture/")
    public List<DiseasePicture> getAllDiseasePictureById(@PathVariable String diseaseId) {
        return diseasePictureRepository.findByAllDiseasePictureById(diseaseId);
    }

//    public DiseasePicture addDiseasePicture(@RequestBody DiseasePicture diseasePicture) {
//        List<DiseasePicture> existingDiseasePicture = diseasePictureRepository.findByDiseaseIdAndDiseasePictureExact(
//                diseasePicture.getDisease().getId(), diseasePicture.getImg()
//        );
//
//        if (existingDiseasePicture.isEmpty()) {
//            return diseasePictureRepository.save(diseasePicture)
//        }
//    }

//    @PostMapping("/disease/picture/")
//    public ResponseEntity<Map<String, Object>> addDiseasePicture(
//            @RequestParam("image") MultipartFile file,
//            @RequestParam("diseaseId") Long diseaseId) throws IOException {
//
//        if (file.isEmpty()) {
//            Map<String, Object> errorResponse = new HashMap<>();
//            errorResponse.put("error", "Please select an image file.");
//            return ResponseEntity.badRequest().body(errorResponse);
//        }
//
//        // Check if the uploaded file is an image
//        if (!isImageFile(file)) {
//            Map<String, Object> errorResponse = new HashMap<>();
//            errorResponse.put("error", "Only image files are allowed.");
//            return ResponseEntity.badRequest().body(errorResponse);
//        }
//
//        // Set the appropriate path to store the image (adjust this to your needs)
//        String imagePath = "\\Users\\nayem\\OneDrive\\Desktop\\images";
//
//        // Create the directory if it doesn't exist
//        Path imageDir = Paths.get(imagePath);
//        if (!Files.exists(imageDir)) {
//            Files.createDirectories(imageDir);
//        }
//
//        // Generate a unique file name for the image
//        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//
//        // Save the image file using the provided path
//        Path targetPath = imageDir.resolve(fileName);
//        Files.copy(file.getInputStream(), targetPath);
//
//        // Create a new DiseasePicture object with the image path and the provided Disease object
//        DiseasePicture diseasePicture = new DiseasePicture(targetPath.toString(), disease);
//        diseasePictureRepository.save(diseasePicture);
//
//        // Create a response with the picture ID and image URL
//        Map<String, Object> response = new HashMap<>();
//        response.put("link", "/api/picture?link=images/" + fileName);
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_JSON)
//                .body(response);
//    }

    @PostMapping("/disease/picture/")
    public ResponseEntity<Map<String, Object>> addDiseasePicture(
            @RequestParam("image") MultipartFile file,
            @RequestParam("diseaseId") Long diseaseId) throws IOException {

        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Please select an image file.");
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

        // Fetch the corresponding Disease object from the database using the diseaseId
        Optional<Disease> optionalDisease = diseaseRepository.findById(diseaseId);
        if (!optionalDisease.isPresent()) {
            // If the diseaseId does not match any existing Disease, return an error response
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid diseaseId. No matching Disease found.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        Disease disease = optionalDisease.get();

        // Create a new DiseasePicture object with the image path and the fetched Disease object
        DiseasePicture diseasePicture = new DiseasePicture(targetPath.toString(), disease);
        diseasePictureRepository.save(diseasePicture);

        // Create a response with the picture ID and image URL
        Map<String, Object> response = new HashMap<>();
        response.put("link", "/api/picture?link=images/" + fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }


    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }
}
