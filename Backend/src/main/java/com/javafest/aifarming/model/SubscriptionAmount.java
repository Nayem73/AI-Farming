package com.javafest.aifarming.model;

import jakarta.persistence.*;

@Entity(name = "SubscriptionAmount")
@Table(name = "subscription_amount")
public class SubscriptionAmount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private Double amount;

    public SubscriptionAmount() {
    }

    public SubscriptionAmount(Double amount) {
        this.amount = amount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
