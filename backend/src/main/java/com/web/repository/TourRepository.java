package com.web.repository;

import com.web.entity.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;

public interface TourRepository extends JpaRepository<Tour, Long>, JpaSpecificationExecutor<Tour> {

    @Query("select t from Tour t where t.startDate >= ?1 and t.endDate <= ?2")
    Page<Tour> findByDate(Date start, Date end, Pageable pageable);

    @Query("select t from Tour t where t.startDate >= ?1 and t.endDate <= ?2 and t.regisExpirationDate >= current_date ")
    Page<Tour> findByDatePublic(Date start, Date end, Pageable pageable);

    @Query("select t from Tour t where t.regisExpirationDate >= current_date and t.category.id = ?1")
    Page<Tour> findByCategory(Long categoryId,Pageable pageable);
}
