package com.javafest.aifarming.controller;

import com.javafest.aifarming.model.NotificationInfo;
import com.javafest.aifarming.model.PaymentInfo;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.payment.TransactionInitiator;
import com.javafest.aifarming.payment.TransactionResponseValidator;
import com.javafest.aifarming.repository.NotificationInfoRepository;
import com.javafest.aifarming.repository.PaymentInfoRepository;
import com.javafest.aifarming.repository.SearchCountRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import com.javafest.aifarming.service.SubscriptionAmountService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// ________________hemel___________________//
import org.springframework.beans.factory.annotation.Value;

//_________________hemel___________________//



@Controller
@RequestMapping("/api")
public class PaymentController {

    private final TransactionInitiator transactionInitiator;
    private final UserInfoRepository userInfoRepository;
    private final PaymentInfoRepository paymentInfoRepository;
    private final SearchCountRepository searchCountRepository;
    private final SubscriptionAmountService subscriptionAmountService;
    private final NotificationInfoRepository notificationInfoRepository;

    // ________________hemel___________________//
    @Value("${PAYMENT_SERVICE_URL:http://localhost:8080}")
    private String serverUrl;

    //_________________hemel___________________//

    public PaymentController(
            TransactionInitiator transactionInitiator,
            UserInfoRepository userInfoRepository,
            PaymentInfoRepository paymentInfoRepository,
            SearchCountRepository searchCountRepository,
            SubscriptionAmountService subscriptionAmountService,
            NotificationInfoRepository notificationInfoRepository) {
        this.transactionInitiator = transactionInitiator;
        this.userInfoRepository = userInfoRepository;
        this.paymentInfoRepository = paymentInfoRepository;
        this.searchCountRepository = searchCountRepository;
        this.subscriptionAmountService = subscriptionAmountService;
        this.notificationInfoRepository = notificationInfoRepository;
    }

    @GetMapping("/payment")
    public ResponseEntity<?> initiatePayment(
            Authentication authentication,
            HttpServletRequest request) {
         //Check if the user is authenticated (logged in)
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first.");
        }
        // Retrieve the userName of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        // Check if UserInfo entity exists for the user
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please login first.");
        }
        if (userInfo.isSubscribed()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("You are already a subscribed user.");
        }
        // String serverUrl = request.getRequestURL().toString().split("/api")[0];

        // System.out.println("1111111111111111111111111111111111 "+serverUrl);
        String paymentUrl = transactionInitiator.initTrnxnRequest(userInfo, subscriptionAmountService, paymentInfoRepository, serverUrl);
//        return "redirect:" + paymentUrl; // Redirect to the payment URL


        return ResponseEntity.ok(paymentUrl);
    }

    @PostMapping("/ssl-success-page")
    public ResponseEntity<String> successPage(@RequestParam Map<String, String> responseParams) {

        try {
            // Validate the payment response using the TransactionResponseValidator class
            TransactionResponseValidator transactionResponseValidator = new TransactionResponseValidator(subscriptionAmountService);
            // System.out.println("----------------------------------------------------------------------------------------------------");
            // System.out.println(responseParams);
            // System.out.println("----------------------------------------------------------------------------------------------------");
            if (transactionResponseValidator.receiveSuccessResponse(responseParams)) {
                // Payment was successful
                // Perform any necessary actions for successful payment, e.g., updating the order status
                PaymentInfo paymentInfo = paymentInfoRepository.findByTranId(responseParams.get("tran_id"));
                UserInfo userInfo = paymentInfo.getUserInfo();

                NotificationInfo notificationInfo = new NotificationInfo();
                notificationInfo.setUserInfo(userInfo);
                notificationInfo.setNotificationType("payment");
                notificationInfo.setTitle("Subscription fee Tk " + responseParams.get("amount") + " received Successfully. Transaction Id: "+
                        responseParams.get("tran_id"));
                notificationInfo.setStatus(false);
                notificationInfoRepository.save(notificationInfo);

                Date currentDate = new Date();
                long currentTimeMillis = currentDate.getTime();

                long millisecondsInADay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
                long thirtyDaysInMillis = 30 * millisecondsInADay;
                long dateAfter30DaysMillis = currentTimeMillis + thirtyDaysInMillis;
                Date dateAfter30Days = new Date(dateAfter30DaysMillis);
                paymentInfo.setExpiryDate(dateAfter30Days);
                //paymentInfo.setTranId(responseParams.get("tran_id")); tran_id is already set from user side in ParameterBuilder class.
                paymentInfo.setValId(responseParams.get("val_id"));
                paymentInfo.setUserInfo(userInfo);
                paymentInfo.setAmount(responseParams.get("amount"));
                paymentInfo.setCardType(responseParams.get("card_type"));
                paymentInfo.setCardIssuer(responseParams.get("card_issuer"));
                paymentInfo.setCurrency(responseParams.get("currency"));
                paymentInfo.setTranDate(responseParams.get("tran_date"));

                // Save the PaymentInfo object to the database
                paymentInfoRepository.save(paymentInfo);
//                return ResponseEntity.ok("Payment successful!");
                return ResponseEntity.status(HttpStatus.SEE_OTHER)
                        .header(HttpHeaders.LOCATION, "/profile")
                        .build();
            } else {
                // Payment validation failed
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment validation failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/admin/subscriptions")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') OR hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<?> getAllPaymentHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
        Page<PaymentInfo> paymentInfoPage = paymentInfoRepository.findAll(pageable);
        List<Map<String, Object>> response = new ArrayList<>();

        for (PaymentInfo paymentInfo : paymentInfoPage.getContent()) {
            Map<String, Object> res = new LinkedHashMap<>();
            res.put("id", paymentInfo.getId());
            res.put("userName", paymentInfo.getUserInfo().getUserName());
            res.put("amount", paymentInfo.getAmount());
            res.put("currency", paymentInfo.getCurrency());
            res.put("transactionId", paymentInfo.getTranId());
            res.put("paymentDate", paymentInfo.getTranDate());
            res.put("method", paymentInfo.getCardType());
            response.add(res);
        }
        return ResponseEntity.ok()
                .body(new PageImpl<>(response, pageable, paymentInfoPage.getTotalElements()));
    }
}