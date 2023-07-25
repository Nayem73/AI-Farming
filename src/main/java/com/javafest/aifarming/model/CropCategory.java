package com.javafest.aifarming.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "CropCategory")
@Table(
        name = "crop_category",
        uniqueConstraints = {
                @UniqueConstraint(name = "title_unique", columnNames = "title")
        }
)
public class CropCategory {

    @Id
    @SequenceGenerator(
            name = "crop_category_sequence",
            sequenceName = "crop_category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "crop_category_sequence"
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
            mappedBy = "cropCategory",
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    private List<Crop> crops = new ArrayList<>();
    public CropCategory() {
    }

    public CropCategory(String title) {
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
    public void addCrop(Crop crop) {
        if (!this.crops.contains(crop)) {
            this.crops.add(crop);
            crop.setCropCategory(this);
        }
    }

    public void removeCrop(Crop crop) {
        if (this.crops.contains(crop)) {
            this.crops.remove(crop);
            crop.setCropCategory(null);
        }
    }

    @Override
    public String toString() {
        return "CropCategory{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
