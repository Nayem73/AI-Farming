package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.repository.CropRepository;
import com.javafest.aifarming.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DiseaseController {

    private final DiseaseRepository diseaseRepository;
    private final CropRepository cropRepository;

    @Autowired
    public DiseaseController(DiseaseRepository diseaseRepository, CropRepository cropRepository) {
        this.diseaseRepository = diseaseRepository;
        this.cropRepository = cropRepository;
    }

//    @GetMapping("/user")
//    public ResponseEntity<String> getCurrentUser() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        return ResponseEntity.ok("Logged in as: " + username);
//    }

    @GetMapping("/disease/")
    public List<Disease> getAllDisease() {
        return diseaseRepository.findAll();
    }

    @GetMapping("/disease/{cropTitle}/{diseaseTitle}")
    public Disease getCropsByCategoryTitleAndDisease(@PathVariable String cropTitle, @PathVariable String diseaseTitle) {
        return diseaseRepository.findByCropTitleAndDiseaseTitleExact(cropTitle, diseaseTitle);
    }

    @GetMapping("/disease")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Disease> getCropsByDisease(@RequestParam(value = "crop", required = false) String cropTitle,
                                           @RequestParam(value = "disease", required = false) String diseaseTitle,
                                           @RequestParam(value = "search", required = false) String search) {
        List<Disease> diseases;
        if (cropTitle != null && search != null) {
            diseases = diseaseRepository.findByCategoryTitleAndDisease(cropTitle, search);
        } else if (cropTitle != null) {
            diseases = diseaseRepository.findByTitle(cropTitle);
        } else if (diseaseTitle != null) {
            diseases = diseaseRepository.findByDiseaseTitle(diseaseTitle);
        } else if (search != null) {
            diseases = diseaseRepository.findBySearch(search);
        }
        else {
            // Handle the case when both parameters are missing.
            // For example, return an error message or an empty list.
            diseases = Collections.emptyList();
        }
        return diseases;
    }

    @PostMapping("/disease/")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Disease addDisease(@RequestBody Disease disease) {
        // Check if the Crop already exists in the database based on CropCategory ID and disease
        List<Disease> existingDiseases = diseaseRepository.findByCropIdAndDiseaseExact(
                disease.getCrop().getId(), disease.getTitle()
        );

        if (existingDiseases.isEmpty()) {
            // No Crop with the same CropCategory ID and disease found, so add the new Crop
            return diseaseRepository.save(disease);
        } else {
            // A Crop with the same CropCategory ID and disease already exists
            // You can choose to handle this situation as you desire, e.g., return an error message or update the existing Crop.
            // For simplicity, let's just return null here.
            return null;
//            throw new IllegalArgumentException("Crop with the same CropCategory and disease already exists.");
        }
    }



    @PutMapping("/disease/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Disease updateDisease(@PathVariable Long id, @RequestBody Disease updatedDisease) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));

        disease.setTitle(updatedDisease.getTitle());
        disease.setImg(updatedDisease.getImg());
        disease.setDescription(updatedDisease.getDescription());
        //crop.setId(updatedCrop.getId());
        return diseaseRepository.save(disease);
    }

    @DeleteMapping("/disease/{id}")
//    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void deleteDisease(@PathVariable Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));

        diseaseRepository.delete(disease);
    }
}
