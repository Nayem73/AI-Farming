package com.javafest.aifarming.service;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.CropCategory;
import com.javafest.aifarming.repository.CropCategoryRepository;
import com.javafest.aifarming.repository.CropRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class CropService {
    private CropRepository cropRepository;
    private CropCategoryRepository cropCategoryRepository;

    @Autowired
    public CropService(CropCategoryRepository cropCategoryRepository, CropRepository cropRepository) {
        this.cropCategoryRepository = cropCategoryRepository;
        this.cropRepository = cropRepository;
    }

    @PostConstruct // This annotation ensures that this method is executed after the bean is initialized.
    public void initData() {
        CropCategory cropCategory = new CropCategory("Paddy");

        Crop crop1 = new Crop("bad", "md1", "assets/images/placeholder.png" ,cropCategory);
        Crop crop2 = new Crop("medium", "md2", "assets/images/placeholder.png", cropCategory);
        Crop crop3 = new Crop("worse", "md3", "assets/images/placeholder.png", cropCategory);

        cropCategory.addCrop(crop1);
        cropCategory.addCrop(crop2);
        cropCategory.addCrop(crop3);

        cropCategoryRepository.save(cropCategory);


        CropCategory cropCategory2 = new CropCategory("Jute");
        Crop crop11 = new Crop("Rog", "md11", "assets/images/placeholder.png", cropCategory2);
        Crop crop22 = new Crop("Kothin", "md22", "assets/images/placeholder.png", cropCategory2);
        Crop crop33 = new Crop("Cholera", "md33", "assets/images/placeholder.png", cropCategory2);

        cropCategory2.addCrop(crop11);
        cropCategory2.addCrop(crop22);
        cropCategory2.addCrop(crop33);

        saveCropCategoryIfNotExists(cropCategory2);
    }

    private void saveCropCategoryIfNotExists(CropCategory cropCategory) {
        CropCategory existingCropCategory = cropCategoryRepository.findByTitle(cropCategory.getTitle());
        if (existingCropCategory == null) {
            cropCategoryRepository.save(cropCategory);
        }
    }
}
