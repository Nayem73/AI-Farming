package com.javafest.aifarming.service;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.UserInfoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SuperAdminService {

    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SuperAdminService(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void createSuperAdmin() {
        String userName = "rakib";
        String email = "rakib@gmail.com";
        String password = "root";
        String role = "ROLE_SUPER_ADMIN";

        // Check if user already exists
        if (!userInfoRepository.findByEmail(email).isPresent() && !userInfoRepository.findByUserName(userName).isPresent()) {
            // Encode the password before saving
            String encodedPassword = passwordEncoder.encode(password);

            UserInfo superAdmin = new UserInfo();
            superAdmin.setUserName(userName);
            superAdmin.setEmail(email);
            superAdmin.setPassword(encodedPassword);
            superAdmin.setRole(role);
            superAdmin.setSubscribed(true);

            userInfoRepository.save(superAdmin);
        }
    }
}
