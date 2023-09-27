package com.javafest.aifarming.payment.utility;

import com.javafest.aifarming.model.PaymentInfo;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.PaymentInfoRepository;
import com.javafest.aifarming.service.SubscriptionAmountService;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

public class ParameterBuilder {
    public static String getParamsString(Map<String, String> params, boolean urlEncode) throws UnsupportedEncodingException {
        StringBuilder result = new StringBuilder();

        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (urlEncode)
                result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            else
                result.append(entry.getKey());

            result.append("=");
            if (urlEncode)
                result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
            else
                result.append(entry.getValue());
            result.append("&");
        }

        String resultString = result.toString();
        return resultString.length() > 0
                ? resultString.substring(0, resultString.length() - 1)
                : resultString;
    }

    public static Map<String, String> constructRequestParameters(
            UserInfo userInfo,
            SubscriptionAmountService subscriptionAmountService,
            PaymentInfoRepository paymentInfoRepository,
            String baseUrl) {
        // CREATING LIST OF POST DATA
        //String baseUrl = "/api";//Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/') + "/";
        Map<String, String> postData = new HashMap<String, String>();

        postData.put("cus_name", userInfo.getUserName()); // Set the username
        postData.put("cus_email", userInfo.getEmail()); // Set the email

        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setUserInfo(userInfo);
        String uniqueTransId = generateUniqueTransId(); // Call a method to generate a unique ID
        postData.put("tran_id", uniqueTransId);
        paymentInfo.setTranId(uniqueTransId);
        paymentInfoRepository.save(paymentInfo);

//        postData.put("total_amount", "500.00");
        String amount = Double.toString(subscriptionAmountService.getSubscriptionAmount());
        postData.put("total_amount", amount);

        postData.put("success_url", baseUrl + "/api/ssl-success-page");
//        postData.put("success_url", baseUrl + "/profile");
        postData.put("fail_url", "https://sandbox.sslcommerz.com/developer/fail.php");
        postData.put("cancel_url", "https://sandbox.sslcommerz.com/developer/cancel.php");
        postData.put("version", "3.00");
        //postData.put("cus_name", "ABC XY");
        //postData.put("cus_email", "abc.xyz@mail.co");
        postData.put("cus_add1", "Address Line On");
        postData.put("cus_add2", "Address Line Tw");
        postData.put("cus_city", "City Nam");
        postData.put("cus_state", "State Nam");
        postData.put("cus_postcode", "Post Cod");
        postData.put("cus_country", "Countr");
        postData.put("cus_phone", "0111111111");
        postData.put("cus_fax", "0171111111");
        postData.put("ship_name", "ABC XY");
        postData.put("ship_add1", "Address Line On");
        postData.put("ship_add2", "Address Line Tw");
        postData.put("ship_city", "City Nam");
        postData.put("ship_state", "State Nam");
        postData.put("ship_postcode", "Post Cod");
        postData.put("ship_country", "Countr");
        postData.put("value_a", "ref00");
        postData.put("value_b", "ref00");
        postData.put("value_c", "ref00");
        postData.put("value_d", "ref00");
        return postData;
    }

    private static String generateUniqueTransId() {
        // Generate a unique transaction ID using timestamp and random number
        long timestamp = System.currentTimeMillis();
        int random = (int) (Math.random() * 10000); // Generate a random number
        return "TRANS" + timestamp + "_" + random;
    }
}