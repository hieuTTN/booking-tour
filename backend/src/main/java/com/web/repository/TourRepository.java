package com.web.repository;

import com.web.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;

public interface TourRepository extends JpaRepository<Tour, Long> {

    @Query("select t from Tour t where t.startDate >= ?1 and t.endDate <= ?2")
    Page<Tour> findByDate(Date start, Date end, Pageable pageable);
}
