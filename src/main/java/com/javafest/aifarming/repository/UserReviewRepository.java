package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReviewRepository extends JpaRepository<UserReview, Long> {
}
