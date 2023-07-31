package com.javafest.aifarming.model;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import static jakarta.persistence.GenerationType.SEQUENCE;
@CrossOrigin(origins = "http://localhost:3000")

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
}
