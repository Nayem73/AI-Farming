package com.javafest.aifarming.model;

import jakarta.persistence.*;

@Entity(name = "Picture")
@Table(name = "picture")
public class Picture {

    @Id
    @SequenceGenerator(
            name = "picture_sequence",
            sequenceName = "picture_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "picture_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "imagePath", nullable = false)
    private String imagePath;


    public Picture() {
    }

    public Picture(String imagePath) {
        this.imagePath = imagePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}