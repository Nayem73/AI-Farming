package com.javafest.aifarming.model;

import jakarta.persistence.*;

import java.util.Date;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "SearchCount")
@Table(name = "search_count")
public class SearchCount {
    @Id
    @SequenceGenerator(
            name = "search_count_sequence",
            sequenceName = "search_count_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "search_count_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @OneToOne
    @JoinColumn(
            name = "search_count_id",
            referencedColumnName = "id"
    )
    private UserInfo userInfo;

    @Column(name = "count")
    private int count;

    @Column(name = "last_reset_date")
    private Date lastResetDate;

    public SearchCount() {
    }

    public SearchCount(UserInfo userInfo, int count) {
        this.userInfo = userInfo;
        this.count = count;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Date getLastResetDate() {
        return lastResetDate;
    }

    public void setLastResetDate(Date lastResetDate) {
        this.lastResetDate = lastResetDate;
    }
}
