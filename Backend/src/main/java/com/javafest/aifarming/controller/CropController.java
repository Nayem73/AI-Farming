package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropRepository cropRepository;

    @Autowired
    public CropController(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
    }

    @GetMapping("/")
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }


    @PostMapping("/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> addCrop(@RequestParam String title) {
        Crop existingCrop = cropRepository.findByTitle(title);
        Map<String, Object> response = new HashMap<>();

        if (existingCrop == null) {
            Crop newCrop = new Crop();
            newCrop.setTitle(title);
            Crop savedCrop = cropRepository.save(newCrop);

            response.put("message", "Crop added successfully");
            response.put("crop", savedCrop);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Crop with title '" + title + "' already exists.");
            return ResponseEntity.badRequest().body(response);
        }
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> updateCrop(@PathVariable Long id, @RequestParam String title) {
        Crop crop = cropRepository.findCropById(id);
        Crop existingCrop = cropRepository.findByTitle(title);
        Map<String, Object> response = new HashMap<>();
        if (crop == null) {
            response.put("message", "Invalid Crop Id");
            return ResponseEntity.badRequest().body(response);
        } else if (existingCrop != null) {
            response.put("message", "Crop with title '" + title + "' already exists.");
            return ResponseEntity.badRequest().body(response);
        }

        crop.setTitle(title);
        Crop updatedCrop = cropRepository.save(crop);

        response.put("message", "Crop updated successfully");
        response.put("crop", updatedCrop);

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> deleteCrop(@PathVariable Long id) {
        Crop crop = cropRepository.findCropById(id);
        Map<String, Object> response = new HashMap<>();

        if (crop == null) {
            response.put("message", "Invalid Crop Id");
            return ResponseEntity.badRequest().body(response);
        } else {
            cropRepository.delete(crop);
            response.put("message", "Crop deleted successfully");
            return ResponseEntity.ok(response);
        }
    }

}
