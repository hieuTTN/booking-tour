package com.web.repository;

import com.web.entity.TourGuide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface TourGuideRepository extends JpaRepository<TourGuide, Long> {

    @Modifying
    @Transactional
    @Query("delete from TourGuide p where p.tour.id = ?1")
    int deleteByTour(Long tourId);
}
