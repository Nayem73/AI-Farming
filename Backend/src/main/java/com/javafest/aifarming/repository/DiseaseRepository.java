package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Disease;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    @Query("SELECT c FROM Disease c WHERE c.title = ?1")
    Page<Disease> findByDiseaseTitle(String disease, Pageable pageable);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.title = ?1 AND c.title LIKE %?2%")
    Page<Disease> findByCategoryTitleAndDisease(String categoryTitle, String search, Pageable pageable);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.id = ?1 AND c.title = ?2")
    List<Disease> findByCropIdAndDiseaseExact(Long cropId, String diseaseTitle);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.title = ?1 AND c.title = ?2")
    Disease findByCropTitleAndDiseaseTitleExact(String cropTitle, String diseaseTitle);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE cc.title = ?1")
    Page<Disease> findByTitle(String categoryTitle, Pageable pageable);

    @Query("SELECT c FROM Disease c JOIN FETCH c.crop cc WHERE c.title LIKE %?1% OR cc.title LIKE %?1%")
    Page<Disease> findBySearch(String keyword, Pageable pageable);

}
