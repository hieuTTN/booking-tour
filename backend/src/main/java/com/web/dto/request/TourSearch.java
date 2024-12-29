package com.web.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TourSearch {
    private List<Long> categoryIds = new ArrayList<>();
    private Double minPrice;
    private Double maxPrice;
    private Date from;
    private Date to;
}
