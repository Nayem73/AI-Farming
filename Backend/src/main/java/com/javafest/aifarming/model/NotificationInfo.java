package com.javafest.aifarming.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "NotificationInfo")
@Table(name = "notification_info")
public class NotificationInfo {
    @Id
    @SequenceGenerator(
            name = "notification_info_sequence",
            sequenceName = "notification_info_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "notification_info_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(name = "title")
    String title;

    @Column(name = "notificationType")
    String notificationType;

    @Column(name = "crop")
    String crop;

    @Column(name = "disease")
    String disease;

    @Column(name = "status")
    Boolean status;

    @ManyToOne
    @JoinColumn(
            name = "notification_info_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "user_notification_foreign_key"
            )
    )
    private UserInfo userInfo;

    public NotificationInfo() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
