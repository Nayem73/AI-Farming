package com.javafest.aifarming.service;

import com.javafest.aifarming.model.SubscriptionAmount;
import com.javafest.aifarming.repository.SubscriptionAmountRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionAmountService {

    private final SubscriptionAmountRepository subscriptionAmountRepository;

    public SubscriptionAmountService(SubscriptionAmountRepository subscriptionAmountRepository) {
        this.subscriptionAmountRepository = subscriptionAmountRepository;
    }

    @PostConstruct
    public void SetSubscriptionAmountIfNull() {
        SubscriptionAmount subscriptionAmount = subscriptionAmountRepository.findById(1L).orElse(null);
        if (subscriptionAmount == null) {
            // If no entry exists, assign a default amount
            subscriptionAmount = new SubscriptionAmount(500.0); // Set your default amount here
            subscriptionAmountRepository.save(subscriptionAmount);
        }
    }

    public void updateSubscriptionAmount(double amount) {
        SubscriptionAmount subscriptionAmount = subscriptionAmountRepository.findById(1L).orElse(null);
        if (subscriptionAmount != null) {
            subscriptionAmount.setAmount(amount);
            subscriptionAmountRepository.save(subscriptionAmount);
        }
    }

    public double getSubscriptionAmount() {
        SubscriptionAmount subscriptionAmount = subscriptionAmountRepository.findById(1L).orElse(null);
        return subscriptionAmount.getAmount();
    }
}