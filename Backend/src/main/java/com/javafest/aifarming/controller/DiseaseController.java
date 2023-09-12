package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.model.NotificationInfo;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.CropRepository;
import com.javafest.aifarming.repository.DiseaseRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import com.javafest.aifarming.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api")
public class DiseaseController {

    private final DiseaseRepository diseaseRepository;
    private final CropRepository cropRepository;
    private final UserInfoRepository userInfoRepository;
    private final NotificationService notificationService;

    @Autowired
    public DiseaseController(
            DiseaseRepository diseaseRepository,
            CropRepository cropRepository,
            UserInfoRepository userInfoRepository,
            NotificationService notificationService) {
        this.diseaseRepository = diseaseRepository;
        this.cropRepository = cropRepository;
        this.userInfoRepository = userInfoRepository;
        this.notificationService = notificationService;
    }

    @GetMapping("/disease/")
    public ResponseEntity<Page<Map<String, Object>>> getAllDisease(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Disease> diseasePage = diseaseRepository.findAll(pageable);

        List<Map<String, Object>> response = new ArrayList<>();

        for (Disease disease : diseasePage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("id", disease.getId());
            res.put("title", disease.getTitle());
            res.put("img", disease.getImg());
            res.put("crop", disease.getCrop());

            response.add(res);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, diseasePage.getTotalElements()));
    }


    @GetMapping("/disease/{cropTitle}/{diseaseTitle}")
    public ResponseEntity<?> getCropsByCategoryTitleAndDisease(@PathVariable String cropTitle, @PathVariable String diseaseTitle) {
        Disease disease = diseaseRepository.findByCropTitleAndDiseaseTitleExact(cropTitle, diseaseTitle);
        if (disease == null || disease.getTitle().isEmpty()) {
            //return new ResponseEntity<>("Disease not found", HttpStatus.NOT_FOUND);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Disease not found");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        return new ResponseEntity<>(disease, HttpStatus.OK);
    }

    @GetMapping("/disease")
    public ResponseEntity<Page<Disease>> getCropsByDisease(
            @RequestParam(value = "crop", required = false) String cropTitle,
            @RequestParam(value = "disease", required = false) String diseaseTitle,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Disease> diseases;
        if (cropTitle != null) {
            // Case 1: crop is provided, search is optional
            if (cropTitle.isEmpty()) {
                diseases = diseaseRepository.findBySearch(search, pageable);
            } else if ((search == null || search.isEmpty()) && (diseaseTitle == null || diseaseTitle.isEmpty())) {
                diseases = diseaseRepository.findByTitle(cropTitle, pageable);
            } else if (diseaseTitle != null) {
                Disease dis = diseaseRepository.findByCropTitleAndDiseaseTitleExact(cropTitle, diseaseTitle);
                List<Disease> disList = Collections.singletonList(dis);
                diseases = new PageImpl<>(disList, pageable, disList.size());
            }
            else {
                diseases = diseaseRepository.findByCategoryTitleAndDisease(cropTitle, search, pageable);
            }
        } else if (diseaseTitle != null) {
            diseases = diseaseRepository.findByDiseaseTitle(diseaseTitle, pageable);
        } else if (search != null) {
            diseases = diseaseRepository.findBySearch(search, pageable);
        } else {
            // Handle the case when both parameters are missing.
            // For example, return an error message or an empty list.
            diseases = new PageImpl<>(Collections.emptyList());
        }
        return ResponseEntity.ok(diseases);
    }

    @PostMapping("/disease/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> addDisease(
            @RequestParam("title") String title,
            @RequestParam("img") MultipartFile file,
            @RequestParam("description") String description,
            @RequestParam("cropId") Long cropId
    ) throws IOException {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + cropId));



        if (file.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select an image");
            return ResponseEntity.badRequest().body(errorResponse);
        } else if (title.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select a title for the disease");
            return ResponseEntity.badRequest().body(errorResponse);
        }  else if (cropId == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Please select a cropId for the disease");
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

        // Set the image path to the Disease object
//        disease.setImg(targetPath.toString());
        Disease disease = new Disease(title, "/api/picture?link=images/" + fileName, description, crop);

        // Save the Disease object to the database
        diseaseRepository.save(disease);
        //save notifications for all users
        notificationService.saveDiseaseNotificationForAllUsers(title, crop.getTitle());

        // Create a response with the link to the uploaded image
        Map<String, Object> response = new HashMap<>();
        response.put("successfully added!", disease);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }

    @PutMapping("/disease/{diseaseId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<Map<String, Object>> updateDisease(
            @PathVariable("diseaseId") Long id,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "img", required = false) MultipartFile file,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "cropId", required = false) Long cropId
    ) throws IOException {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));

        if (title != null) {
            disease.setTitle(title);
        }

        if (file != null && !file.isEmpty()) {
            if (!isImageFile(file)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", "Only image files are allowed.");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            String imagePath = "src/main/resources/images";
            Path imageDir = Paths.get(imagePath);
            if (!Files.exists(imageDir)) {
                Files.createDirectories(imageDir);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetPath = imageDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath);

            disease.setImg("/api/picture?link=images/" + fileName);
        }

        if (description != null) {
            disease.setDescription(description);
        }

        if (cropId != null) {
            Crop crop = cropRepository.findById(cropId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Crop ID: " + cropId));
            disease.setCrop(crop);
        }

        // Save the updated Disease object to the database
        diseaseRepository.save(disease);

        // Create a response with the updated disease details
        Map<String, Object> response = new HashMap<>();
        response.put("successfully updated!", disease);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }


    @DeleteMapping("/disease/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public void deleteDisease(@PathVariable Long id) {
        Disease disease = diseaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Disease ID: " + id));

        diseaseRepository.delete(disease);
    }
}
