package com.javafest.aifarming.service;

import com.javafest.aifarming.model.NotificationInfo;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.NotificationInfoRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {
    private final NotificationInfoRepository notificationInfoRepository;
    private final UserInfoRepository userInfoRepository;

    public NotificationService(NotificationInfoRepository notificationInfoRepository, UserInfoRepository userInfoRepository) {
        this.notificationInfoRepository = notificationInfoRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public ResponseEntity<?> getLast5Notifications(UserInfo userInfo) {
        List<NotificationInfo> latestNotifications = notificationInfoRepository.findLatestNotifications(userInfo);
        List<Map<String, Object>> simplifiedNotifications = new ArrayList<>();
        int count = 0;
        for (NotificationInfo notificationInfo : latestNotifications) {
            if (count >= 5) {
                break;
            }
            Map<String, Object> currentNotification = new LinkedHashMap<>();
            currentNotification.put("id", notificationInfo.getId());
            currentNotification.put("title", notificationInfo.getTitle());
            currentNotification.put("type", notificationInfo.getNotificationType());
            if ("disease".equals(notificationInfo.getNotificationType())) {
                currentNotification.put("disease", notificationInfo.getDisease());
                currentNotification.put("crop", notificationInfo.getCrop());
            }
            simplifiedNotifications.add(currentNotification);
            count++;
        }
        return ResponseEntity.ok().body(simplifiedNotifications);
    }

    public void saveDiseaseNotificationForAllUsers(String disease, String crop) {
        List<UserInfo> allUserInfos = userInfoRepository.findAll();
        for (UserInfo userInfo : allUserInfos) {
            NotificationInfo notificationInfo = new NotificationInfo();
            notificationInfo.setUserInfo(userInfo);
            notificationInfo.setNotificationType("disease");
            notificationInfo.setTitle("New disease " + disease + " is added! Check out it's information.");
            notificationInfo.setDisease(disease);
            notificationInfo.setCrop(crop);
            notificationInfoRepository.save(notificationInfo);
        }
    }

    public ResponseEntity<?> deleteNotification(Long notificationId, UserInfo userInfo) {
        List<NotificationInfo> notificationInfos = notificationInfoRepository.findNotificationByUserInfo(notificationId, userInfo);
        if (notificationInfos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this notification does not exist!");
        }
        notificationInfoRepository.deleteById(notificationId);
        return ResponseEntity.ok().body("Notification deleted successfully.");
    }
}
