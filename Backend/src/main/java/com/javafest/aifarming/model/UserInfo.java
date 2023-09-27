package com.javafest.aifarming.model;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "UserInfo")
@Table(name = "user_info")
public class UserInfo {

    @Id
    @SequenceGenerator(
            name = "user_info_sequence",
            sequenceName = "user_info_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_info_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private int id;

    @Column(
            name = "userName",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String userName;

    @Column(
            name = "email",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String email;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String password;

    @Column(
            name = "role",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String role;

    @OneToOne(mappedBy = "userInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private SearchCount searchCount;

    @OneToMany(
            mappedBy = "userInfo",
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    private List<UserReview> userReviews;

    @OneToMany(
            mappedBy = "userInfo",
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    private List<PaymentInfo> paymentInfos;

    public UserInfo() {
    }
    public UserInfo(int id, String userName, String email, String password, String role) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String name) {
        this.userName = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public SearchCount getSearchCount() {
        return searchCount;
    }

    public void setSearchCount(SearchCount searchCount) {
        this.searchCount = searchCount;
    }

    public boolean isSubscribed() {
        if ("ROLE_SUPER_ADMIN".equals(role) || "ROLE_ADMIN".equals(role)) {
            return true; // Admin roles are always subscribed
        }

        if (paymentInfos.isEmpty()) {
            return false; // No payment information available
        }

        PaymentInfo lastPayment = paymentInfos.get(paymentInfos.size() - 1);
        Date expiryDate = lastPayment.getExpiryDate();
        Date currentDate = new Date();

        return expiryDate != null && expiryDate.after(currentDate); //expiredDate is after currentDate
    }

    public String getExpiryDate() {
        if (paymentInfos != null && !paymentInfos.isEmpty()) {
            PaymentInfo lastPayment = paymentInfos.get(paymentInfos.size() - 1);
            Date expiryDate = lastPayment.getExpiryDate();

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); // Define your desired date format
            String formattedExpiryDate = dateFormat.format(expiryDate);

            return formattedExpiryDate;
        } else {
            return "No payment information available.";
        }
    }

    public String getPaymentDate() {
        if (paymentInfos != null && !paymentInfos.isEmpty()) {
            PaymentInfo lastPayment = paymentInfos.get(paymentInfos.size() - 1);
            String paymentDate = lastPayment.getTranDate();
            return paymentDate;
        } else {
            return "No payment information available.";
        }
    }

}
