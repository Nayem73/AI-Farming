package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropCategoryRepository extends JpaRepository<CropCategory, Long> {
    CropCategory findByTitle(String title);
}
