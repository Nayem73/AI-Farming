package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.Picture;
import com.javafest.aifarming.repository.CropRepository;
import com.javafest.aifarming.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Controller
@RequestMapping("/api/pictures")
public class PictureController {
    private final PictureRepository pictureRepository;
    private final CropRepository cropRepository;

    @Autowired
    public PictureController(PictureRepository pictureRepository, CropRepository cropRepository) {
        this.pictureRepository = pictureRepository;
        this.cropRepository = cropRepository;
    }

    @PostMapping("/{cropId}")
    public ResponseEntity<String> uploadPicture(@PathVariable Long cropId, @RequestParam("image") MultipartFile file) throws IOException {
        Crop crop = cropRepository.findById(cropId).orElse(null);
        if (crop == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Crop not found");
        }

        // Set the appropriate path to store the image
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

        Picture picture = new Picture(targetPath.toString(), crop);
        pictureRepository.save(picture);

        return ResponseEntity.ok("Picture uploaded successfully");
    }

    @GetMapping("/{cropId}")
    public ResponseEntity<List<Picture>> getPicturesByCropId(@PathVariable Long cropId) {
        Crop crop = cropRepository.findById(cropId).orElse(null);
        if (crop == null) {
            return ResponseEntity.notFound().build();
        }

        List<Picture> pictures = pictureRepository.findByCropId(cropId);
        return ResponseEntity.ok(pictures);
    }
}
