package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.model.UserReview;
import com.javafest.aifarming.repository.UserInfoRepository;
import com.javafest.aifarming.repository.UserReviewRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<List<Map<String, Object>>> getAllUserReviewByUserId(@PathVariable Long userId) {
        // Fetch the corresponding Disease object from the database using the diseaseId
        List<UserReview> userReviews = userReviewRepository.findReviewByUserId(userId);


        // Create a list to store all reviews of userId
        List<Map<String, Object>> response = new ArrayList<>();

        // Iterate through the userReview entities and extract the specific fields to include in the response
        for (UserReview userReview : userReviews) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("reviewId", userReview.getId());
            res.put("description", userReview.getDescription());
            res.put("img", userReview.getImg());

            response.add(res);
        }
        return ResponseEntity.ok().body(response);
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

        UserReview userReview = new UserReview(text, "/img/placeholder.jpg", userInfo);
        userReviewRepository.save(userReview);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("reviewId", userReview.getId());
        response.put("description", text);
        response.put("img", userReview.getImg());
        response.put("userId", userReview.getUserInfo().getId());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }
}
