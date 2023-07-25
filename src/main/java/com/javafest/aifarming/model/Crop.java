package com.javafest.aifarming.model;

import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Crop")
@Table(name = "crop")
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

    @Lob
    private String markdownFile;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "crop_id",
            referencedColumnName = "id"
    )
    private CropCategory cropCategory;

    public Crop() {
    }


    public Crop(String markdownFile, CropCategory cropCategory) {
        this.markdownFile = markdownFile;
        this.cropCategory = cropCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarkdownFile() {
        return markdownFile;
    }

    public void setMarkdownFile(String markdownFile) {
        this.markdownFile = markdownFile;
    }

    @Override
    public String toString() {
        return "Crop{" +
                "id=" + id +
                ", markdownFile='" + markdownFile + '\'' +
                ", cropCategory=" + cropCategory +
                '}';
    }
}
