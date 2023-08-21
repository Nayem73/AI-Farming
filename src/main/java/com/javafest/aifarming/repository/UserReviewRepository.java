package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.UserReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserReviewRepository extends JpaRepository<UserReview, Long> {
    @Query("SELECT c FROM UserReview c JOIN FETCH c.userInfo cc WHERE cc.id = ?1")
    Page<UserReview> findReviewByUserId(Long userId, Pageable pageable);
}

