package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Picture;
import com.javafest.aifarming.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
@Controller
@RequestMapping("/api/picture")
public class PictureController {
    private final PictureRepository pictureRepository;

    @Autowired
    public PictureController(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    @PostMapping("/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadPicture(@RequestParam("img") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select a file to upload.");
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

        Picture picture = new Picture(targetPath.toString());
        pictureRepository.save(picture);

        // Create a response with the picture ID and image URL
        //String responseMessage = "Picture uploaded successfully. Picture ID: " + picture.getId() + "";
        Map<String, Object> response = new HashMap<>();
        //response.put("message", "Picture uploaded successfully.");
        response.put("link", "/api/picture?link=images/" + fileName);

        //return ResponseEntity.ok(responseMessage);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }

    @GetMapping
    public ResponseEntity<Resource> showPicture(@RequestParam("link") String imagePath) throws IOException {
        // Concatenate the base image path with the relative image path from the request parameter
        String baseImagePath = "src/main/resources/";
        Path imageFilePath = Paths.get(baseImagePath, imagePath);

        if (!Files.exists(imageFilePath)) {
            return ResponseEntity.notFound().build();
        }

        // Read the image file as a Resource and set appropriate headers
        Resource imageResource = new UrlResource(imageFilePath.toUri());
        String contentType = Files.probeContentType(imageFilePath);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageResource);
    }
}
