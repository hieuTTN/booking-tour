package com.web.dto.request;

import com.web.entity.Tour;
import org.apache.commons.math3.stat.descriptive.summary.Product;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.sql.Date;
import java.util.List;

public class TourSpecification implements Specification<Tour> {

    private List<Long> categoryIds;
    private Double minPrice;
    private Double maxPrice;
    private Date from;
    private Date to;

    public TourSpecification(List<Long> categoryIds, Double minPrice, Double maxPrice, Date from, Date to) {
        this.categoryIds = categoryIds;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.from = from;
        this.to = to;
    }

    @Override
    public Predicate toPredicate(Root<Tour> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        Predicate predicate = cb.conjunction();
        query.distinct(true);

        if (categoryIds != null && !categoryIds.isEmpty()) {
            predicate = cb.and(predicate, root.get("category").get("id").in(categoryIds));
        }

        if (minPrice != null) {
            predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("priceAdults"), minPrice));
        }

        if (maxPrice != null) {
            predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("priceAdults"), maxPrice));
        }

        if (from != null && to != null) {
            predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("startDate"), from));
            predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("endDate"), to));
        }
        return predicate;
    }
}
