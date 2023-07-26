package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.CropCategory;
import com.javafest.aifarming.repository.CropCategoryRepository;
import com.javafest.aifarming.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CropController {

    private final CropRepository cropRepository;
    private final CropCategoryRepository cropCategoryRepository;

    @Autowired
    public CropController(CropRepository cropRepository, CropCategoryRepository cropCategoryRepository) {
        this.cropRepository = cropRepository;
        this.cropCategoryRepository = cropCategoryRepository;
    }

    @GetMapping("/crops/")
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    @GetMapping("/{categoryTitle}/{disease}")
    public Crop getCropsByCategoryTitleAndDisease(@PathVariable String categoryTitle, @PathVariable String disease) {
        return cropRepository.findByCategoryTitleAndDiseaseExact(categoryTitle, disease);
    }

    @GetMapping("/crops")
    public List<Crop> getCropsByDisease(@RequestParam(value = "crop", required = false) String categoryTitle,
                                        @RequestParam(value = "disease", required = false) String disease,
                                        @RequestParam(value = "search", required = false) String search) {
        List<Crop> crops;
        if (categoryTitle != null && search != null) {
            crops = cropRepository.findByCategoryTitleAndDisease(categoryTitle, search);
        } else if (categoryTitle != null) {
            crops = cropRepository.findByTitle(categoryTitle);
        } else if (disease != null) {
            crops = cropRepository.findByDisease(disease);
        } else if (search != null) {
            crops = cropRepository.findBySearch(search);
        }
        else {
            // Handle the case when both parameters are missing.
            // For example, return an error message or an empty list.
            crops = Collections.emptyList();
        }
        return crops;
    }

    @PostMapping
    public Crop addCrop(@RequestBody Crop crop) {
        // Check if the Crop already exists in the database based on CropCategory ID and disease
        List<Crop> existingCrops = cropRepository.findByCategoryIdAndDiseaseExact(
                crop.getCropCategory().getId(), crop.getDisease()
        );

        if (existingCrops.isEmpty()) {
            // No Crop with the same CropCategory ID and disease found, so add the new Crop
            return cropRepository.save(crop);
        } else {
            // A Crop with the same CropCategory ID and disease already exists
            // You can choose to handle this situation as you desire, e.g., return an error message or update the existing Crop.
            // For simplicity, let's just return null here.
            return null;
//            throw new IllegalArgumentException("Crop with the same CropCategory and disease already exists.");
        }
    }



    @PutMapping("/{id}")
    public Crop updateCrop(@PathVariable Long id, @RequestBody Crop updatedCrop) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + id));

        crop.setDisease(updatedCrop.getDisease());
        crop.setMarkdownFile(updatedCrop.getMarkdownFile());
        return cropRepository.save(crop);
    }

    @DeleteMapping("/{id}")
    public void deleteCrop(@PathVariable Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + id));

        cropRepository.delete(crop);
    }
}
