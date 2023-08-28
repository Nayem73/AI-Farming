package com.javafest.aifarming.payment;

import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/api")
public class PaymentController {

    private final TransactionInitiator transactionInitiator;
    private final UserInfoRepository userInfoRepository;

    public PaymentController(TransactionInitiator transactionInitiator, UserInfoRepository userInfoRepository) {
        this.transactionInitiator = transactionInitiator;
        this.userInfoRepository = userInfoRepository;
    }

    @GetMapping("/payment")
    public String initiatePayment() {
//    public String initiatePayment(Authentication authentication) {
        // Check if the user is authenticated (logged in)
//        if (authentication == null) {
//            return "redirect:/login"; // Redirect to your login page
//        }
//
//        // Retrieve the userName of the logged-in user from the Authentication object
//        String userName = authentication.getName();
//        // Retrieve the UserInfo entity for the logged-in user
//        UserInfo userInfo = userInfoRepository.getByUserName(userName);
//
//        // Check if UserInfo entity exists for the user
//        if (userInfo == null) {
//            return "error"; // Return an error view
//        }

        String paymentUrl = transactionInitiator.initTrnxnRequest();
        return "redirect:" + paymentUrl; // Redirect to the payment URL
    }

    @PostMapping("/ssl-success-page")
    public ResponseEntity<String> successPage(@RequestParam Map<String, String> responseParams) {
        try {
            // Validate the payment response using the TransactionResponseValidator class
            TransactionResponseValidator transactionResponseValidator = new TransactionResponseValidator();
            System.out.println(responseParams);
            boolean pr = transactionResponseValidator.receiveSuccessResponse(responseParams);
            System.out.println("~~~~~~~~~~~~~~~ "+ pr);
            if (transactionResponseValidator.receiveSuccessResponse(responseParams)) {
                // Payment was successful
                // Perform any necessary actions for successful payment, e.g., updating the order status
                return ResponseEntity.ok("Payment successful!");
            } else {
                // Payment validation failed
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment validation failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

}