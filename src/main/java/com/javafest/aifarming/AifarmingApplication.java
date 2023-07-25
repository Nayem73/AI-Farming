package com.javafest.aifarming;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.CropCategory;
import com.javafest.aifarming.repository.CropCategoryRepository;
import com.javafest.aifarming.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AifarmingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AifarmingApplication.class, args);
	}
}
