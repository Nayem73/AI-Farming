package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.NotificationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationInfoRepository extends JpaRepository<NotificationInfo, Long> {
}
