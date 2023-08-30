package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.NotificationInfo;
import com.javafest.aifarming.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationInfoRepository extends JpaRepository<NotificationInfo, Long> {

    @Query("SELECT c FROM NotificationInfo c WHERE c.userInfo = ?1 ORDER BY c.id DESC")
    List<NotificationInfo> findLatestNotifications(UserInfo userInfo);

    @Query("SELECT c FROM NotificationInfo c WHERE c.id = ?1 AND c.userInfo =?2")
    List<NotificationInfo> findNotificationByUserInfo(Long id, UserInfo userInfo);

    @Query("SELECT COUNT(c) FROM NotificationInfo c WHERE c.userInfo = ?1 AND c.status = ?2")
    Long countUnreadNotifications(UserInfo userInfo, Boolean st);
}
