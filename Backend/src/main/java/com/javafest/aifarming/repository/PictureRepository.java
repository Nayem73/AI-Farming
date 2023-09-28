package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    Optional<Picture> findByImagePath(String link);
}
