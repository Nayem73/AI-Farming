package com.javafest.aifarming;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AifarmingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AifarmingApplication.class, args);
	}


//	@Bean
//	CommandLineRunner commandLineRunner(CropCategoryRepository cropCategoryRepository, CropRepository cropRepository) {
//		this.cropRepository = cropRepository;
//		this.cropCategoryRepository = cropCategoryRepository;
//
//		return args -> {
////            CropCategory cropCategory = new CropCategory("Potato");
//////            cropCategoryRepository.save(cropCategory);
////            Crop crop = new Crop("Potato Disease", "The markdownFile", cropCategory);
////            cropRepository.save(crop);
////
////
////            CropCategory cropCategory2 = new CropCategory("Potato");
//////            cropCategoryRepository.save(cropCategory);
////            Crop crop2 = new Crop("Coli Flower Disease", "The markdownFile - 2", cropCategory2);
////            cropRepository.save(crop2);
//
//			CropCategory cropCategory = new CropCategory();
//			cropCategory.addCrop(new Crop("pdisease", "md1"));
//			cropCategory.addCrop(new Crop("pdisease2", "md2"));
//			cropCategory.addCrop(new Crop("pdisease3", "md3"));
//		};
//
//	}
}
