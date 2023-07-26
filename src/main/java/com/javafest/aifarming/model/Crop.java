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

    @Column(
            name = "disease",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String disease;

    @Column(
            name = "markdownFile"
    )
    private String markdownFile;

    @Column(name = "frontImagePath")
    private String frontImagePath;

//    @ManyToOne(
//            cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY
//    )
    @ManyToOne
    @JoinColumn(
            name = "crop_id",
            referencedColumnName = "id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "crop_foreign_key"
            )
    )
    private CropCategory cropCategory;

    public Crop() {
    }

    public Crop(String disease, String markdownFile, String frontImagePath) {
        this.disease = disease;
        this.markdownFile = markdownFile;
        this.frontImagePath = frontImagePath;
    }

    public Crop(String disease, String markdownFile, String frontImagePath, CropCategory cropCategory) {
        this.disease = disease;
        this.markdownFile = markdownFile;
        this.frontImagePath = frontImagePath;
        this.cropCategory = cropCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getMarkdownFile() {
        return markdownFile;
    }

    public void setMarkdownFile(String markdownFile) {
        this.markdownFile = markdownFile;
    }

    public String getFrontImagePath() {
        return frontImagePath;
    }

    public void setFrontImagePath(String frontImagePath) {
        this.frontImagePath = frontImagePath;
    }

    public CropCategory getCropCategory() {
        return cropCategory;
    }

    public void setCropCategory(CropCategory cropCategory) {
        this.cropCategory = cropCategory;
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
