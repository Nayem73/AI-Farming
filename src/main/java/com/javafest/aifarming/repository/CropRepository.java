package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    @Query("SELECT c FROM Crop c WHERE c.disease = ?1")
    List<Crop> findByDisease(String disease);

    @Query("SELECT c FROM Crop c JOIN FETCH c.cropCategory cc WHERE cc.title = ?1 AND c.disease LIKE %?2%")
    List<Crop> findByCategoryTitleAndDisease(String categoryTitle, String disease);

    @Query("SELECT c FROM Crop c JOIN FETCH c.cropCategory cc WHERE cc.id = ?1 AND c.disease = ?2")
    List<Crop> findByCategoryTitleAndDiseaseExact(Long categoryId, String disease);

    @Query("SELECT c FROM Crop c JOIN FETCH c.cropCategory cc WHERE cc.title = ?1")
    List<Crop> findByTitle(String categoryTitle);

    @Query("SELECT c FROM Crop c JOIN FETCH c.cropCategory cc WHERE c.disease LIKE %?1% OR cc.title LIKE %?1%")
    List<Crop> findBySearch(String keyword);
}
