package com.javafest.aifarming.controller;

import com.javafest.aifarming.payment.TransactionInitiator;
import com.javafest.aifarming.payment.TransactionResponseValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class PaymentController {

    private TransactionInitiator transactionInitiator;

    @Autowired
    public PaymentController(TransactionInitiator transactionInitiator) {
        this.transactionInitiator = transactionInitiator;
    }

    @GetMapping("/initiate-payment")
    public String initiatePayment() {
        String paymentUrl = transactionInitiator.initTrnxnRequest();
        return "redirect:" + paymentUrl;
    }

    // Handle the success URL
    @PostMapping("/ssl-success-page")
    public String handleSuccessResponse(@RequestParam Map<String, String> requestParams) {
        try {
            TransactionResponseValidator responseValidator = new TransactionResponseValidator();
            if (responseValidator.receiveSuccessResponse(requestParams)) {
                // Payment was successful, handle accordingly
                return "payment-success";
            } else {
                // Payment validation failed, handle accordingly
                return "payment-failed";
            }
        } catch (Exception e) {
            // Handle exception
            return "error-page";
        }
    }
}
