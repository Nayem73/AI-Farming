package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByUserName(String username);
    Optional<UserInfo> findByEmail(String email);
}
