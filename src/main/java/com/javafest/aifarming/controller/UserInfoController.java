package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.SearchCount;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.SearchCountRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import com.javafest.aifarming.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserInfoController {
    private final UserInfoRepository userInfoRepository;
    private PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private AuthenticationManager authenticationManager;
    private ForwardController forwardController;
    private SearchCountRepository searchCountRepository;

    @Autowired
    public UserInfoController(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, ForwardController forwardController, SearchCountRepository searchCountRepository) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.forwardController = forwardController;
        this.searchCountRepository = searchCountRepository;
    }

    @PostMapping("/signup/")
    public ResponseEntity<String> addNewUser(
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "isAdmin", required = false) Boolean isAdmin) {
        String role;
        if (isAdmin != null && isAdmin) {
            role = "ROLE_ADMIN";
        } else {
            role = "ROLE_USER";
        }

        Optional<UserInfo> existingUser = userInfoRepository.findByUserName(userName);
        Optional<UserInfo> existingUserByEmail = userInfoRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: User already exists!");
        } else if (existingUserByEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: User with this email already exists");
        } else {
            // Encode the password and save the new user
            String encodedPassword = passwordEncoder.encode(password);

            UserInfo newUser = new UserInfo();
            newUser.setUserName(userName);
            newUser.setEmail(email);
            newUser.setPassword(encodedPassword);
            newUser.setRole(role);

            userInfoRepository.save(newUser);
            return ResponseEntity.ok("User added successfully");
        }
    }


    @PostMapping("/signin/")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(
            @RequestParam("email") String email,
            @RequestParam("password") String password) {

        System.out.println(email);
        System.out.println(password);

        UserInfo userInfo = userInfoRepository.getUserNameByEmail(email);
        if (userInfo == null) {
            // Create the response map
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }

        String userName = userInfo.getUserName();
        String role = userInfo.getRole();
        boolean isAdmin = "ROLE_ADMIN".equals(role); // Using .equals() for String comparison

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userName, password));

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(userName);

                // Create the response map
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("token", token);
                response.put("username", userName);
                response.put("isAdmin", isAdmin);

                return ResponseEntity.ok(response);
            } else {
                // Create the response map
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("error", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(response);
            }
        } catch (AuthenticationException e) {
            // Create the response map
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("error", "Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }

    @PostMapping("/signout/")
    public String logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer")) {
            String token = authHeader.substring(7);
            jwtService.addToBlacklist(token);
            return "Logged out successfully";
        }
        return "Logout failed";
    }


    @GetMapping("/profile/")
    public ResponseEntity<Map<String, Object>> getProfile(Authentication authentication) {
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("error", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String userName = authentication.getName();
        Optional<UserInfo> userInfoOptional = userInfoRepository.findByUserName(userName);
        if (!userInfoOptional.isPresent()) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("error", "User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        UserInfo userInfo = userInfoOptional.get();

        int searchCount = 0;
        SearchCount searchCountEntity = searchCountRepository.findByUserInfo(userInfo);
        if (searchCountEntity != null) {
            searchCount = searchCountEntity.getCount();
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("id", userInfo.getId());
        response.put("userName", userInfo.getUserName());
        response.put("email", userInfo.getEmail());
        response.put("searchLeft", forwardController.maxRequestCountPerDay - searchCount);

        return ResponseEntity.ok(response);
    }

}
