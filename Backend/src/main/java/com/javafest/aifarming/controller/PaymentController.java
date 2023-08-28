package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.PaymentInfo;
import com.javafest.aifarming.model.SearchCount;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.payment.TransactionInitiator;
import com.javafest.aifarming.payment.TransactionResponseValidator;
import com.javafest.aifarming.repository.PaymentInfoRepository;
import com.javafest.aifarming.repository.SearchCountRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class PaymentController {

    private final TransactionInitiator transactionInitiator;
    private final UserInfoRepository userInfoRepository;
    private final PaymentInfoRepository paymentInfoRepository;
    private final SearchCountRepository searchCountRepository;

    public PaymentController(TransactionInitiator transactionInitiator, UserInfoRepository userInfoRepository, PaymentInfoRepository paymentInfoRepository, SearchCountRepository searchCountRepository) {
        this.transactionInitiator = transactionInitiator;
        this.userInfoRepository = userInfoRepository;
        this.paymentInfoRepository = paymentInfoRepository;
        this.searchCountRepository = searchCountRepository;
    }

    @GetMapping("/payment")
    public ResponseEntity<?> initiatePayment(Authentication authentication) {
         //Check if the user is authenticated (logged in)
        if (authentication == null) {
//            return "redirect:/api/disease/"; // Redirect to your login page
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first.");
        }

        // Retrieve the userName of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);

        // Check if UserInfo entity exists for the user
        if (userInfo == null) {
//            return "redirect:/api/disease/";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first.");
        }
        System.out.println("---------------------------------------------------------------- "+ userName);
        Date currentDate = new Date();
        System.out.println(currentDate +" gettime = "+ currentDate.getTime());

        String paymentUrl = transactionInitiator.initTrnxnRequest();
//        return "redirect:" + paymentUrl; // Redirect to the payment URL
        return ResponseEntity.ok(paymentUrl);
    }

    @PostMapping("/ssl-success-page")
    public ResponseEntity<String> successPage(
            @RequestParam Map<String, String> responseParams,
            Authentication authentication) {

        // Check if the user is authenticated (logged in)
        if (authentication == null) {
//            return "redirect:/login"; // Redirect to your login page
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("please login first.");
        }

         //Retrieve the userName of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        System.out.println("**** username: "+ userName);

        // Check if UserInfo entity exists for the user
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("please login first.");
        }
        try {
            // Validate the payment response using the TransactionResponseValidator class
            TransactionResponseValidator transactionResponseValidator = new TransactionResponseValidator();
            System.out.println("----------------------------------------------------------------------------------------------------");
            System.out.println(responseParams);
            System.out.println("----------------------------------------------------------------------------------------------------");
            boolean pr = transactionResponseValidator.receiveSuccessResponse(responseParams);
            System.out.println("~~~~~~~~~~~~~~~ "+ pr);
            if (transactionResponseValidator.receiveSuccessResponse(responseParams)) {
                // Payment was successful
                // Perform any necessary actions for successful payment, e.g., updating the order status
                SearchCount searchCount = searchCountRepository.findByUserInfo(userInfo);
                Date currentDate = new Date();
                searchCount.setLastResetDate(currentDate);
                searchCountRepository.save(searchCount);

                PaymentInfo paymentInfo = new PaymentInfo();
                paymentInfo.setTranId(responseParams.get("tran_id"));
                paymentInfo.setValId(responseParams.get("val_id"));
                paymentInfo.setUserInfo(userInfo);
                paymentInfo.setAmount(responseParams.get("amount"));
                paymentInfo.setCardType(responseParams.get("card_type"));

                // Save the PaymentInfo object to the database
                paymentInfoRepository.save(paymentInfo);

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