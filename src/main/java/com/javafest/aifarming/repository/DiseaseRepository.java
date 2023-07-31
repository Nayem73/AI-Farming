package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    @Query("SELECT c FROM Disease c WHERE c.title = ?1")
    List<Disease> findByDiseaseTitle(String disease);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.title = ?1 AND c.title LIKE %?2%")
    List<Disease> findByCategoryTitleAndDisease(String categoryTitle, String disease);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.id = ?1 AND c.title = ?2")
    List<Disease> findByCropIdAndDiseaseExact(Long cropId, String diseaseTitle);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.title = ?1 AND c.title = ?2")
    Disease findByCropTitleAndDiseaseTitleExact(String cropTitle, String diseaseTitle);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.title = ?1")
    List<Disease> findByTitle(String categoryTitle);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE c.title LIKE %?1% OR cc.title LIKE %?1%")
    List<Disease> findBySearch(String keyword);
}
