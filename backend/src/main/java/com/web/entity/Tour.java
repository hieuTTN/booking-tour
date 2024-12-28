package com.web.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.web.enums.PayStatus;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tours")
@Getter
@Setter
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String content;

    private Double priceAdults;

    private Double priceChildren;

    private Date regisExpirationDate;

    private Date startDate;

    private Date endDate;

    private Integer maxParticipants;

    private Integer numRegistered;

    private String image;

    private LocalDateTime createdDate;

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.REMOVE)
    private List<ImageTour> imageTours = new ArrayList<>();

    @OneToMany(mappedBy = "tour", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<TourGuide> tourGuides = new ArrayList<>();
}
