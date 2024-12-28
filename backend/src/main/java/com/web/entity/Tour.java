package com.web.entity;


import com.web.enums.PayStatus;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
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

    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.REMOVE)
    private List<ImageTour> imageTours;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.REMOVE)
    private List<TourGuide> tourGuides;
}
