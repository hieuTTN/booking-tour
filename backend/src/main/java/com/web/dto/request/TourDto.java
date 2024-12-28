package com.web.dto.request;

import com.web.entity.Category;
import com.web.entity.Guide;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TourDto {

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

    private String image;

    private Category category;

    private String address;

    private List<String> images = new ArrayList<>();

    private List<Long> guides = new ArrayList<>();
}
