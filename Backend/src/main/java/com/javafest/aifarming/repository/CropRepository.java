package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    Crop findByTitle(String title);
    Crop findCropById(Long id);

    @Query("SELECT cc FROM Crop cc WHERE cc.title LIKE %?1%")
    List<Crop> findByString(String title);
}
