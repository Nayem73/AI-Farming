package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    @Query("SELECT c FROM Crop c JOIN FETCH c.cropCategory cc WHERE c.disease LIKE %?1% OR cc.title LIKE %?1%")
    List<Crop> findByDisease(String keyword);

    @Query("SELECT c FROM Crop c JOIN FETCH c.cropCategory cc WHERE cc.title = ?1 AND c.disease LIKE %?2%")
    List<Crop> findByCategoryTitleAndDisease(String categoryTitle, String disease);
}
