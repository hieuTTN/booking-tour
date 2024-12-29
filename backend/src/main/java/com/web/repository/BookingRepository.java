package com.web.repository;

import com.web.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("select b from Booking b where b.user.id = ?1")
    Page<Booking> myBooking(Long id, Pageable pageable);
}
