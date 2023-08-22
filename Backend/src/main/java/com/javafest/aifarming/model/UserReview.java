package com.javafest.aifarming.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "UserReview")
@Table(name = "user_review")
public class UserReview {
    @Id
    @SequenceGenerator(
            name = "user_review_sequence",
            sequenceName = "user_review_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_review_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "description",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(name = "img")
    private String img;

    @ManyToOne
    @JoinColumn(
            name = "user_review_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "user_foreign_key"
            )
    )
    private UserInfo userInfo;

    public UserReview() {
    }

    public UserReview(String description, String img, UserInfo userInfo) {
        this.description = description;
        this.img = img;
        this.userInfo = userInfo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
