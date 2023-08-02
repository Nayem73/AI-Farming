package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.SearchCount;
import com.javafest.aifarming.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchCountRepository extends JpaRepository<SearchCount, Long> {
    SearchCount findByUserInfo(UserInfo userInfo);
}
