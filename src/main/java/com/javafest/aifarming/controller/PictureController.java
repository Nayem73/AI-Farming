package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.Picture;
import com.javafest.aifarming.repository.CropRepository;
import com.javafest.aifarming.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/pictures")
public class PictureController {
    private final PictureRepository pictureRepository;

    @Autowired
    public PictureController(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    @PostMapping
    public ResponseEntity<String> uploadPicture(@RequestParam("image") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
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

        Picture picture = new Picture(targetPath.toString());
        pictureRepository.save(picture);

        // Create a response with the picture ID and image URL
        //String responseMessage = "Picture uploaded successfully. Picture ID: " + picture.getId() + "";
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Picture uploaded successfully.");
        response.put("pictureId", picture.getId());
        response.put("link", picture.getImagePath());

        //return ResponseEntity.ok(responseMessage);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response.toString());
    }

}
