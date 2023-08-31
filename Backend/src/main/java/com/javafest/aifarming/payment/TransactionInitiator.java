package com.javafest.aifarming.payment;

import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.payment.utility.ParameterBuilder;
import com.javafest.aifarming.repository.PaymentInfoRepository;
import com.javafest.aifarming.service.SubscriptionAmountService;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * This class initiates a transaction request to SSL Commerz
 * required parameters to hit SSL Commerz payment page are constructed in a Map of String as key value pair
 * Its method initTrnxnRequest returns JSON list or String with Session key which then used to select payment option
 */
@Component
public class TransactionInitiator {

    public String initTrnxnRequest(UserInfo userInfo, SubscriptionAmountService subscriptionAmountService, PaymentInfoRepository paymentInfoRepository, String serverUrl) {
        String response = "";
        try {
            /**
             * All parameters in payment order should be constructed in this follwing postData Map
             * keep an eye on success fail url correctly.
             * insert your success and fail URL correctly in this Map
             */
            Map<String, String> postData = ParameterBuilder.constructRequestParameters(userInfo, subscriptionAmountService, paymentInfoRepository, serverUrl);
            /**
             * Provide your SSL Commerz store Id and Password by this following constructor.
             * If Test Mode then insert true and false otherwise.
             */
            SSLCommerz sslcz = new SSLCommerz("aifar64ea1f7a8c3ec", "aifar64ea1f7a8c3ec@ssl", true);

            /**
             * If user want to get Gate way list then pass isGetGatewayList parameter as true
             * If user want to get URL as returned response, pass false.
             */
            response = sslcz.initiateTransaction(postData, false);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}