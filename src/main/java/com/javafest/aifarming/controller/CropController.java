package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

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

//    @GetMapping()
//    public List<Crop> getCropsByDisease(@RequestParam String disease) {
//        return cropRepository.findByDisease(disease);
//    }
@GetMapping
public List<Crop> getCropsByDisease(@RequestParam(value = "title", required = false) String categoryTitle,
                                    @RequestParam(value = "disease", required = false) String disease) {
    List<Crop> crops;
    if (categoryTitle != null && disease != null) {
        crops = cropRepository.findByCategoryTitleAndDisease(categoryTitle, disease);
    } else if (categoryTitle != null) {
        crops = cropRepository.findByDisease(categoryTitle);
    } else if (disease != null) {
        crops = cropRepository.findByDisease(disease);
    } else {
        // Handle the case when both parameters are missing.
        // For example, return an error message or an empty list.
        crops = Collections.emptyList();
    }
    return crops;
}

    @PostMapping
    public Crop addCrop(@RequestBody Crop crop) {
        return cropRepository.save(crop);
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
