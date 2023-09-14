package com.javafest.aifarming.model;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;
@Entity(name = "Disease")
@Table(name = "disease")
public class Disease {
    @Id
    @SequenceGenerator(
            name = "disease_sequence",
            sequenceName = "disease_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "disease_sequence"
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

    @Column(name = "img")
    private String img;

    @Column(
            name = "description",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;


    @ManyToOne
    @JoinColumn(
            name = "disease_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "disease_foreign_key"
            )
    )
    private Crop crop;

    @OneToMany(
            mappedBy = "disease",
            orphanRemoval = true,
            cascade = CascadeType.ALL
    )
    private List<DiseasePicture> diseasePictures;

    public Disease() {
    }

    public Disease(String title, String img, String description) {
        this.title = title;
        this.img = img;
        this.description = description;
    }

    public Disease(String title, String img, String description, Crop crop) {
        this.title = title;
        this.img = img;
        this.description = description;
        this.crop = crop;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Crop getCrop() {
        return crop;
    }

    public void setCrop(Crop crop) {
        this.crop = crop;
    }

}
