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
        CropCategory cropCategory = new CropCategory("Some Crop Category");

        Crop crop1 = new Crop("pdisease", "md1", cropCategory);
        Crop crop2 = new Crop("pdisease2", "md2", cropCategory);
        Crop crop3 = new Crop("pdisease3", "md3", cropCategory);

        cropCategory.addCrop(crop1);
        cropCategory.addCrop(crop2);
        cropCategory.addCrop(crop3);

        cropCategoryRepository.save(cropCategory);


        CropCategory cropCategory2 = new CropCategory("Some Crop Category");
        Crop crop11 = new Crop("pdisease", "md1", cropCategory2);
        Crop crop22 = new Crop("pdisease2", "md2", cropCategory2);
        Crop crop33 = new Crop("pdisease3", "md3", cropCategory2);

        cropCategory2.addCrop(crop11);
        cropCategory2.addCrop(crop22);
        cropCategory2.addCrop(crop33);

        cropCategoryRepository.save(cropCategory2);
    }

}
