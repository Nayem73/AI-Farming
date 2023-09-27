package com.javafest.aifarming.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javafest.aifarming.model.SearchCount;
import com.javafest.aifarming.model.UserInfo;
import com.javafest.aifarming.repository.DiseaseRepository;
import com.javafest.aifarming.repository.SearchCountRepository;
import com.javafest.aifarming.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
// ________________hemel___________________//
import org.springframework.beans.factory.annotation.Value;

//_________________hemel___________________//

@RestController
@RequestMapping("/api")
public class ForwardController {
    private final RestTemplate restTemplate;
    private ObjectMapper objectMapper;
    private DiseaseRepository diseaseRepository;
    private SearchCountRepository searchCountRepository;
    private UserInfoRepository userInfoRepository;

    // ________________hemel___________________//
    @Value("${AI_SERVICE_URL:http://localhost:8080}")
    private String predictionURL;

    //_________________hemel___________________//

    @Autowired
    public ForwardController(RestTemplate restTemplate, ObjectMapper objectMapper, DiseaseRepository diseaseRepository, SearchCountRepository searchCountRepository, UserInfoRepository userInfoRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.diseaseRepository = diseaseRepository;
        this.searchCountRepository = searchCountRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public final int maxRequestCountPerMonth = 20;

    @PostMapping("/search/")
    public ResponseEntity<Map<String, Object>> forwardPredictRequest(
            @RequestParam("crop") String text,
            @RequestParam("file") MultipartFile image,
            Authentication authentication
    ) throws IOException {

        // Check if the user is authenticated (logged in)
        if (authentication == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        // Retrieve the email of the logged-in user from the Authentication object
        String userName = authentication.getName();
        // Retrieve the UserInfo entity for the logged-in user
        UserInfo userInfo = userInfoRepository.getByUserName(userName);
        // Check if UserInfo entity exists for the user
        if (userInfo == null) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Please login first.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (!userInfo.isSubscribed()) {
            // Retrieve the SearchCount entity for the logged-in user
            SearchCount searchCount = searchCountRepository.findByUserInfo(userInfo);

            // Check if SearchCount entity exists for the user, if not create it
            Date currentDate = new Date();
            if (searchCount == null) {
                searchCount = new SearchCount(userInfo, 0);
                searchCount.setLastResetDate(currentDate);
                searchCountRepository.save(searchCount);
            } else {
                if (is30DaysAgo(searchCount.getLastResetDate(), currentDate)) {
                    searchCount.setCount(0);
                    searchCount.setLastResetDate(currentDate);
                    searchCountRepository.save(searchCount);
                }
            }

            // Check if the user has exceeded the maximum allowed request count
            int requestCount = searchCount.getCount();
            if (requestCount >= maxRequestCountPerMonth) {
                // If the user has exceeded the request limit, return an error response
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("message", "You have exceeded your search limit. Please try again later.");
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
            }

            // Increment the user's request count for today
            searchCount.setCount(requestCount + 1);
            searchCountRepository.save(searchCount);
        }


        // Step 1: Prepare the request body as form-data
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("crop", text);
        body.add("file", image.getResource());

        // Step 2: Prepare headers for the request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // Step 3: Prepare the request entity with body and headers
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Step 4: Define the URL of the other server (localhost:8000/predict)
        // String predictionURL = "http://localhost:8000/predict";
        // System.out.println("1111111111111111111111111111111111 "+predictionURL);
        // System.out.println("1111111111111111111111111111111111 "+predictionURL);
        // System.out.println("1111111111111111111111111111111111 "+predictionURL);
        // System.out.println("1111111111111111111111111111111111 "+predictionURL);
        // Step 5: Make the POST request to the other server
        ResponseEntity<String> response = restTemplate.exchange(
                predictionURL,
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        String jsonResponse = response.getBody();
        JsonNode jsonNode = objectMapper.readTree(jsonResponse);
        String predictionClass = jsonNode.get("class").asText();

        // Step 7: Print the response
        // System.out.println("???????????????????????" + text);
        // System.out.println("???????????????????????" + predictionClass);
        Map<String, Object> returnResponse = new LinkedHashMap<>();
        returnResponse.put("crop",  text);
        returnResponse.put("disease", predictionClass);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(returnResponse);
    }

    private boolean is30DaysAgo(Date startDate, Date endDate) {
        long differenceMillis = endDate.getTime() - startDate.getTime();
        long days = TimeUnit.MILLISECONDS.toDays(differenceMillis);
        return days >= 30;
    }
}
