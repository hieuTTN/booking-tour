package com.web.entity;


import com.web.enums.PayStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numAdults;

    private Integer numChildren;

    private Double totalPrice;

    private LocalDateTime createdDate;

    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @Enumerated(EnumType.STRING)
    private PayStatus payStatus;

}
