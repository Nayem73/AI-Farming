package com.javafest.aifarming.controller;

import com.javafest.aifarming.service.SubscriptionAmountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SubscriptionAmountController {
    private final SubscriptionAmountService subscriptionAmountService;

    public SubscriptionAmountController(SubscriptionAmountService subscriptionAmountService) {
        this.subscriptionAmountService = subscriptionAmountService;
    }

    @GetMapping("/admin/subscription/amount/")
    public ResponseEntity<?> getPaymentAmount() {
        Map<String, Object> response = new HashMap<>();
        response.put("amount", subscriptionAmountService.getSubscriptionAmount());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/admin/subscription/amount/")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<?> setPaymentAmount(
            @RequestParam(value="amount") double amount) {

        Map<String, Object> response = new HashMap<>();
        if (Double.isNaN(amount)) {
            response.put("message", "Invalid amount format.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        subscriptionAmountService.updateSubscriptionAmount(amount);
        response.put("message", "Subscription amount updated successfully.");
        return ResponseEntity.ok(response);
    }

}
