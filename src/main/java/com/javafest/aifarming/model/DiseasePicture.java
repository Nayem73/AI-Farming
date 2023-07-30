package com.javafest.aifarming.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "DiseasePicture")
@Table(name = "disease_picture")
public class DiseasePicture {
    @Id
    @SequenceGenerator(
            name = "disease_picture_sequence",
            sequenceName = "disease_picture_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "disease_picture_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(name = "img")
    private String img;

    @ManyToOne
    @JoinColumn(
            name = "disease_picture_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "disease_picture_foreign_key"
            )
    )
    private Disease disease;

    public DiseasePicture() {
    }

    public DiseasePicture(String img, Disease disease) {
        this.img = img;
        this.disease = disease;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Disease getDisease() {
        return disease;
    }

    public void setDisease(Disease disease) {
        this.disease = disease;
    }
}
