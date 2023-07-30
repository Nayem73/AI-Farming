package com.javafest.aifarming.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ForwardController {
    private final RestTemplate restTemplate;
    private ObjectMapper objectMapper;
    private DiseaseRepository diseaseRepository;

    @Autowired
    public ForwardController(RestTemplate restTemplate, ObjectMapper objectMapper, DiseaseRepository diseaseRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.diseaseRepository = diseaseRepository;
    }

    @PostMapping("/search/")
    public ResponseEntity<Map<String, Object>> forwardPredictRequest(
            @RequestParam("crop") String text,
            @RequestParam("file") MultipartFile image
    ) throws IOException {

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
        String predictionURL = "http://localhost:8000/predict";

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
        System.out.println("???????????????????????" + text);
        System.out.println("???????????????????????" + predictionClass);
        Map<String, Object> returnResponse = new LinkedHashMap<>();
        returnResponse.put("crop",  text);
        returnResponse.put("disease", predictionClass);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(returnResponse);


//        Disease disease = diseaseRepository.findByCropTitleAndDiseaseTitleExact(text, predictionClass);
//        if (disease != null) {
//            return ResponseEntity.ok(disease);
//        } else {
//            // Handle the case where the Crop is not found
//            return ResponseEntity.notFound().build();
//        }

        // Step 6: Return the response from the other server
        //return response;
    }
}
