package com.javafest.aifarming.payment;

import com.javafest.aifarming.repository.SubscriptionAmountRepository;
import com.javafest.aifarming.service.SubscriptionAmountService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

/**
 * This class handles the Response parameters redirected from payment success page.
 * Validates those parameters fetched from payment page response and returns true for successful transaction
 * and false otherwise.
 */
public class TransactionResponseValidator {
    private final SubscriptionAmountService subscriptionAmountService;

    public TransactionResponseValidator(SubscriptionAmountService subscriptionAmountService) {
        this.subscriptionAmountService = subscriptionAmountService;
    }

    /**
     *
     * @param request
     * @return
     * @throws Exception
     * Send Received params from your success resoponse (POST ) in this Map</>
     */
    public boolean receiveSuccessResponse(Map<String, String> request) throws Exception {

        String trxId = request.get("tran_id");
        /**
         *Get your AMOUNT and Currency FROM DB to initiate this Transaction
         */
        //String amount = "500";
        String amount = Double.toString(subscriptionAmountService.getSubscriptionAmount());
        String currency = "BDT";
        // Set your store Id and store password and define TestMode
        SSLCommerz sslcz = new SSLCommerz("aifar64ea1f7a8c3ec", "aifar64ea1f7a8c3ec@ssl", true);

        /**
         * If following order validation returns true, then process transaction as success.
         * if this following validation returns false , then query status if failed of canceled.
         *      Check request.get("status") for this purpose
         */
        return sslcz.orderValidate(trxId, amount, currency, request);

    }
}