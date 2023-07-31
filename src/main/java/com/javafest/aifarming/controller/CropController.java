package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
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

//    @GetMapping("/{title}")
//    public List<Crop> getCropByTitle(@PathVariable String title) {
//        return cropRepository.findByString(title);
//    }

    @PostMapping("/")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Crop addCrop(@RequestBody Crop crop) {
        Crop existingCrop = cropRepository.findByTitle(crop.getTitle());
        if (existingCrop == null) {
            return cropRepository.save(crop);
        } else {
            // You may handle the situation when the CropCategory already exists.
            // For now, let's just return the existing CropCategory without saving.
            return existingCrop; //// need to throw some error here showing crop already exists.
        }
    }

    @PutMapping("/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Crop updateCrop(@PathVariable Long id, @RequestBody Crop updatedCrop) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + id));

        crop.setTitle(updatedCrop.getTitle());
        return cropRepository.save(crop);
    }

    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteCrop(@PathVariable Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + id));

        cropRepository.delete(crop);
    }
}
