package com.javafest.aifarming.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Crop")
@Table(
        name = "crop",
        uniqueConstraints = {
                @UniqueConstraint(name = "title_unique", columnNames = "title")
        }
)
public class Crop {

    @Id
    @SequenceGenerator(
            name = "crop_sequence",
            sequenceName = "crop_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "crop_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "title",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String title;

    @OneToMany(
            mappedBy = "crop",
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    private List<Disease> diseases = new ArrayList<>();
    public Crop() {
    }

    public Crop(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    //bidirectional relationship, so we add a Crop here
    //also on the Crop class, we set CropCategory back for that crop
    public void addDisease(Disease disease) {
        if (!this.diseases.contains(disease)) {
            this.diseases.add(disease);
            disease.setCrop(this);
        }
    }

    public void removeDisease(Disease disease) {
        if (this.diseases.contains(disease)) {
            this.diseases.remove(disease);
            disease.setCrop(null);
        }
    }

}