package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.model.UserReview;
import com.javafest.aifarming.repository.UserInfoRepository;
import com.javafest.aifarming.repository.UserReviewRepository;
import org.springframework.data.domain.*;
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

    @GetMapping("/review")
    public ResponseEntity<Page<Map<String, Object>>> getAllUserReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

//        Pageable pageable = PageRequest.of(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<UserReview> userReviewPage = userReviewRepository.findAll(pageable);

        List<Map<String, Object>> response = new ArrayList<>();

        for (UserReview userReview : userReviewPage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("reviewId", userReview.getId());
            res.put("description", userReview.getDescription());
            res.put("img", userReview.getImg());

            response.add(res);
        }

        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, userReviewPage.getTotalElements()));
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
                errorResponse.put("message", "Only image files are allowed.");
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

    @PutMapping("/review/{reviewId}")
    public ResponseEntity<Map<String, Object>> updateUserReview(
            @PathVariable Long reviewId,
            @RequestParam(value = "description", required = false) String text,
            @RequestParam(value = "img", required = false) MultipartFile file,
            Authentication authentication
    ) throws IOException {

        // Check if the user is authenticated (logged in)
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // Check if the review exists
        Optional<UserReview> optionalUserReview = userReviewRepository.findById(reviewId);
        if (!optionalUserReview.isPresent()) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Review not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        UserReview userReview = optionalUserReview.get();

        // Check if the logged-in user is the owner of the review
        String userName = authentication.getName();
        if (!userReview.getUserInfo().getUserName().equals(userName)) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Only the user who made the review can edit this review.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        // Update the description if provided
        if (text != null && !text.isEmpty()) {
            userReview.setDescription(text);
        }

        // Update the review image if provided
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

            userReview.setImg("/api/picture?link=images/" + fileName);
        }

        userReviewRepository.save(userReview);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("reviewId", userReview.getId());
        response.put("description", userReview.getDescription());
        response.put("img", userReview.getImg());
        response.put("userName", userReview.getUserInfo().getUserName());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<Map<String, Object>> deleteUserReview(
            @PathVariable Long reviewId,
            Authentication authentication) {

        // Check if the user is authenticated (logged in)
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        Optional<UserReview> optionalUserReview = userReviewRepository.findById(reviewId);

        if (optionalUserReview.isEmpty()) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Review not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        UserReview userReview = optionalUserReview.get();
        // Retrieve the email of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        if (userInfo != null && (userInfo.getRole().equals("ROLE_ADMIN") || userInfo.getRole().equals("ROLE_SUPER_ADMIN"))) {
            userReviewRepository.delete(userReview);
        } else if (userReview.getUserInfo().getUserName().equals(userName)) { // Check if the logged-in user is the owner of the review
            userReviewRepository.delete(userReview);
        } else {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "You can not delete another user's review.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Review deleted successfully.");
        return ResponseEntity.ok().body(response);
    }

}
