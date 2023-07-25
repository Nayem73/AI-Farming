package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.CropCategory;
import com.javafest.aifarming.repository.CropCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crop-categories")
public class CropCategoryController {

    private final CropCategoryRepository cropCategoryRepository;

    @Autowired
    public CropCategoryController(CropCategoryRepository cropCategoryRepository) {
        this.cropCategoryRepository = cropCategoryRepository;
    }

    @GetMapping
    public List<CropCategory> getAllCropCategories() {
        return cropCategoryRepository.findAll();
    }

    @GetMapping("/{title}")
    public CropCategory getCropCategoryByTitle(@PathVariable String title) {
        return cropCategoryRepository.findByTitle(title);
    }

    @PostMapping
    public CropCategory addCropCategory(@RequestBody CropCategory cropCategory) {
        CropCategory existingCropCategory = cropCategoryRepository.findByTitle(cropCategory.getTitle());
        if (existingCropCategory == null) {
            return cropCategoryRepository.save(cropCategory);
        } else {
            // You may handle the situation when the CropCategory already exists.
            // For now, let's just return the existing CropCategory without saving.
            return existingCropCategory;
        }
    }

    @PutMapping("/{id}")
    public CropCategory updateCropCategory(@PathVariable Long id, @RequestBody CropCategory updatedCropCategory) {
        CropCategory cropCategory = cropCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid CropCategory ID: " + id));

        cropCategory.setTitle(updatedCropCategory.getTitle());
        return cropCategoryRepository.save(cropCategory);
    }

    @DeleteMapping("/{id}")
    public void deleteCropCategory(@PathVariable Long id) {
        CropCategory cropCategory = cropCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid CropCategory ID: " + id));

        cropCategoryRepository.delete(cropCategory);
    }
}
