package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropCategoryRepository extends JpaRepository<CropCategory, Long> {
    CropCategory findByTitle(String title);

    @Query("SELECT cc FROM CropCategory cc WHERE cc.title LIKE %?1%")
    List<CropCategory> findByString(String title);
}
