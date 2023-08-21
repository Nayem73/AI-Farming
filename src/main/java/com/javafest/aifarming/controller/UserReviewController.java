package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.model.UserReview;
import com.javafest.aifarming.repository.UserInfoRepository;
import com.javafest.aifarming.repository.UserReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
public class UserReviewController {
    private final UserReviewRepository userReviewRepository;
    private final UserInfoRepository userInfoRepository;

    public UserReviewController(UserReviewRepository userReviewRepository, UserInfoRepository userInfoRepository) {
        this.userReviewRepository = userReviewRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping("/review/{userId}")
    public ResponseEntity<Page<Map<String, Object>>> getAllUserReviewByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page, //start of page
            @RequestParam(defaultValue = "5") int size) { //pageSize - number of review per page

        // Create a Pageable object to represent pagination parameters
        Pageable pageable = PageRequest.of(page, size);

        // Fetch the Page of UserReview objects using the userReviewRepository
        Page<UserReview> userReviewPage = userReviewRepository.findReviewByUserId(userId, pageable);

        Page<Map<String, Object>> responsePage = userReviewPage.map(userReview -> {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("reviewId", userReview.getId());
            res.put("description", userReview.getDescription());
            res.put("img", userReview.getImg());
            return res;
        });

        return ResponseEntity.ok().body(responsePage);
    }


    @PostMapping("/review/")
    public ResponseEntity<Map<String, Object>> addUserReview(
            @RequestParam("description") String text,
            @RequestParam(value = "img", required = false) MultipartFile file,
            Authentication authentication
            ) throws IOException {

        // Check if the user is authenticated (logged in)
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        // Retrieve the userName of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        // Check if UserInfo entity exists for the user
        if (userInfo == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        String realPath;
        if (file.isEmpty()) {
            realPath = "null";
        } else {
            // Check if the uploaded file is an image
            if (!isImageFile(file)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Only image files are allowed.");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            // Set the appropriate path to store the image
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
            realPath = "/api/picture?link=images/" + fileName;
        }

        UserReview userReview = new UserReview(text, realPath, userInfo);
        userReviewRepository.save(userReview);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("reviewId", userReview.getId());
        response.put("description", text);
        response.put("img", userReview.getImg());
        response.put("userName", userReview.getUserInfo().getUserName());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    private boolean isImageFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png"));
    }
}
