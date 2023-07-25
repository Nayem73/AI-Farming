package com.javafest.aifarming.service;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.CropCategory;
import com.javafest.aifarming.repository.CropCategoryRepository;
import com.javafest.aifarming.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class CropService {
    private CropRepository cropRepository;
    private CropCategoryRepository cropCategoryRepository;

    @Bean
    CommandLineRunner commandLineRunner(CropCategoryRepository cropCategoryRepository, CropRepository cropRepository) {
        this.cropRepository = cropRepository;
        this.cropCategoryRepository = cropCategoryRepository;

        return args -> {
            CropCategory cropCategory = new CropCategory("Potato");
//            cropCategoryRepository.save(cropCategory);
            Crop crop = new Crop("The markdownFile", cropCategory);
            cropRepository.save(crop);


            CropCategory cropCategory2 = new CropCategory("Coli Flower");
//            cropCategoryRepository.save(cropCategory);
            Crop crop2 = new Crop("The markdownFile - 2", cropCategory2);
            cropRepository.save(crop2);
        };

    }


}
