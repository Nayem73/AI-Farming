package com.javafest.aifarming.service;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SuperAdminService implements CommandLineRunner {

    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder passwordEncoder;

    public SuperAdminService(UserInfoRepository userInfoRepository, PasswordEncoder passwordEncoder) {
        this.userInfoRepository = userInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Check if the first argument starts with "--server.port=" and ignore it
        int startIndex = 0;
        if (args.length > 0 && args[0].startsWith("--server")) {
            startIndex = 1;
        }

        String userName = (args.length > startIndex) ? args[startIndex] : "defaultUsername";
        String email = (args.length > startIndex + 1) ? args[startIndex + 1] : "defaultEmail";
        String password = (args.length > startIndex + 2) ? args[startIndex + 2] : "defaultPassword";
        String role = "ROLE_SUPER_ADMIN";

        // Check if user already exists
        if (!email.equals("defaultEmail") && !userInfoRepository.findByEmail(email).isPresent() && !userInfoRepository.findByUserName(userName).isPresent()) {
            // Encode the password before saving
            String encodedPassword = passwordEncoder.encode(password);

            UserInfo superAdmin = new UserInfo();
            superAdmin.setUserName(userName);
            superAdmin.setEmail(email);
            superAdmin.setPassword(encodedPassword);
            superAdmin.setRole(role);

            userInfoRepository.save(superAdmin);
        }
    }
}
