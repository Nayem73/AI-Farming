package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.DiseasePicture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiseasePictureRepository extends JpaRepository<DiseasePicture, Long> {

    @Query("SELECT c FROM DiseasePicture c JOIN FETCH c.disease cc WHERE cc.id = ?1")
    List<DiseasePicture> findByAllDiseasePictureById(Long diseaseId);

    @Query("SELECT c FROM DiseasePicture c JOIN FETCH c.disease cc WHERE cc.id = ?1 AND c.img = ?2")
    List<DiseasePicture> findByDiseaseIdAndDiseasePictureExact(Long id, String img);
}
