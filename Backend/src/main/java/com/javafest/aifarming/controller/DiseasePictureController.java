package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.model.DiseasePicture;
import com.javafest.aifarming.repository.DiseasePictureRepository;
import com.javafest.aifarming.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
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
    public ResponseEntity<?> getAllDiseasePicturesByDiseaseId(@PathVariable Long diseaseId) {
        // Fetch the corresponding Disease object from the database using the diseaseId
        List<DiseasePicture> existingDiseasePictures = diseasePictureRepository.findByAllDiseasePictureById(diseaseId);
        if (existingDiseasePictures.isEmpty()) {
            // If the diseaseId does not match any existing Disease, return a response with the "picture not found" message
            Map<String, String> responseMessage = new HashMap<>();
            responseMessage.put("message", "Picture not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMessage);
        }

        // Create a list to store the simplified representations of DiseasePicture objects
        List<Map<String, Object>> simplifiedDiseasePictures = new ArrayList<>();

        // Iterate through the DiseasePicture entities and extract the specific fields to include in the response
        for (DiseasePicture diseasePicture : existingDiseasePictures) {
            Map<String, Object> simplifiedPicture = new LinkedHashMap<>();
            simplifiedPicture.put("id", diseasePicture.getId());
            simplifiedPicture.put("img", diseasePicture.getImg());
            simplifiedDiseasePictures.add(simplifiedPicture);
        }

        return ResponseEntity.ok().body(simplifiedDiseasePictures);
    }



    @PostMapping("/disease/picture/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> addDiseasePicture(
            @RequestParam("img") MultipartFile file,
            @RequestParam("diseaseId") Long diseaseId) throws IOException {

        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select an image file.");
            return ResponseEntity.badRequest().body(errorResponse);
        } else if (diseaseId == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select a disease");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Check if the uploaded file is an image
        if (!isImageFile(file)) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Only image files are allowed.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Set the appropriate path to store the image (adjust this to your needs)
        String imagePath = "src/main/resources/images";

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
            errorResponse.put("message", "Invalid diseaseId. No matching Disease found.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        Disease disease = optionalDisease.get();

        // Create a new DiseasePicture object with the image path and the fetched Disease object
        DiseasePicture diseasePicture = new DiseasePicture("/api/picture?link=images/" + fileName, disease);
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

    @PutMapping("/disease/picture/{pictureId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> updateDiseasePicture(
            @PathVariable Long pictureId,
            @RequestParam("img") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select an image file.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Check if the uploaded file is an image
        if (!isImageFile(file)) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Only image files are allowed.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Fetch the existing DiseasePicture object from the database using the pictureId
        Optional<DiseasePicture> optionalDiseasePicture = diseasePictureRepository.findById(pictureId);
        if (!optionalDiseasePicture.isPresent()) {
            // If the pictureId does not match any existing DiseasePicture, return an error response
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid pictureId. No matching DiseasePicture found.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        DiseasePicture existingDiseasePicture = optionalDiseasePicture.get();

        // Set the appropriate path to store the image (adjust this to your needs)
        String imagePath = "src/main/resources/images";

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

        // Update the DiseasePicture object with the new image path
        existingDiseasePicture.setImg("/api/picture?link=images/" + fileName);

        // Save the updated DiseasePicture object
        diseasePictureRepository.save(existingDiseasePicture);

        // Create a response with the updated image URL
        Map<String, Object> response = new HashMap<>();
        response.put("link", "/api/picture?link=images/" + fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @DeleteMapping("/disease/picture/{pictureId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteDiseasePicture(@PathVariable Long pictureId) {
        // Fetch the existing DiseasePicture object from the database using the pictureId
        Optional<DiseasePicture> optionalDiseasePicture = diseasePictureRepository.findById(pictureId);
        if (!optionalDiseasePicture.isPresent()) {
            // If the pictureId does not match any existing DiseasePicture, return an error response
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid pictureId. No matching DiseasePicture found.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Delete the DiseasePicture object from the database
        diseasePictureRepository.deleteById(pictureId);

        // Create a response indicating successful deletion
        Map<String, Object> response = new HashMap<>();
        response.put("message", "DiseasePicture deleted successfully.");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}
