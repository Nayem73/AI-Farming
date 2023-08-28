package com.javafest.aifarming.controller;

import com.javafest.aifarming.payment.TransactionInitiator;
import com.javafest.aifarming.payment.TransactionResponseValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/api")
public class PaymentController {

    private final TransactionInitiator transactionInitiator;

    public PaymentController(TransactionInitiator transactionInitiator) {
        this.transactionInitiator = transactionInitiator;
    }

    @GetMapping("/payment")
    public String initiatePayment() {
        String paymentUrl = transactionInitiator.initTrnxnRequest();
        return "redirect:" + paymentUrl;
    }

    @GetMapping("/ssl-success-page")
    @ResponseBody
    public String successPage() {
        return "Payment successful!"; // This is the logical view name
    }
}