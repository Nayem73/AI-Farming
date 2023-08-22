package com.javafest.aifarming.service;

import com.javafest.aifarming.model.Crop;
import com.javafest.aifarming.model.Disease;
import com.javafest.aifarming.repository.CropRepository;
import com.javafest.aifarming.repository.DiseaseRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CropService {
    private DiseaseRepository diseaseRepository;
    private CropRepository cropRepository;

    @Autowired
    public CropService(DiseaseRepository diseaseRepository, CropRepository cropRepository) {
        this.diseaseRepository = diseaseRepository;
        this.cropRepository = cropRepository;
    }


//    @PostConstruct // This annotation ensures that this method is executed after the bean is initialized.
//    public void initData() {
//        Crop crop = new Crop("Potato");
//
//        Disease disease1 = new Disease("Potato Early Blight", "http://localhost:8080/api/pictures?link=images/1690681620188_star.png", "md1", crop);
//        Disease disease2 = new Disease("medium", "assets/images/placeholder.png", "md2", crop);
//        Disease disease3 = new Disease("Potato Late Blight", "http://localhost:8080/api/pictures?link=images/1690681620188_star.png", "md3", crop);
//
//        crop.addDisease(disease1);
//        crop.addDisease(disease2);
//        crop.addDisease(disease3);
//
//        cropRepository.save(crop);
//
//
//        Crop crop2 = new Crop("Jute");
//        Disease disease11 = new Disease("rog", "http://localhost:8080/api/pictures?link=images/1690681620188_star.png", "md11", crop2);
//        Disease disease22 = new Disease("Kothin", "assets/images/placeholder.png", "md22", crop2);
//        Disease disease33 = new Disease("Cholera", "http://localhost:8080/api/pictures?link=images/1690681620188_star.png", "md33", crop2);
//
//        crop2.addDisease(disease11);
//        crop2.addDisease(disease22);
//        crop2.addDisease(disease33);;
//
//        saveCropIfNotExists(crop2);
//    }

    private void saveCropIfNotExists(Crop crop) {
        Crop existingCrop = cropRepository.findByTitle(crop.getTitle());
        if (existingCrop == null) {
            cropRepository.save(crop);
        }
    }
}
