package com.web.api;

import com.web.entity.Booking;
import com.web.entity.Category;
import com.web.entity.Tour;
import com.web.enums.PayStatus;
import com.web.service.BookingService;
import com.web.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin
public class BookingApi {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/user/create")
    public ResponseEntity<?> save(@RequestParam Integer numChild, @RequestParam Integer numAudit, @RequestParam Long tourId){
        Booking result = bookingService.createBooking(numChild, numAudit, tourId);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }


    @GetMapping("/user/my-booking")
    public ResponseEntity<?> myBooking(Pageable pageable){
        Page<Booking> result = bookingService.myBooking(pageable);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/admin/my-booking")
    public ResponseEntity<?> all(Pageable pageable){
        Page<Booking> result = bookingService.all(pageable);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/user/cancel")
    public ResponseEntity<?> all(@RequestParam Long id){
        Booking result = bookingService.cancel(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/admin/update-status")
    public ResponseEntity<?> updateStatus(@RequestParam Long id, @RequestParam PayStatus payStatus){
        Booking result = bookingService.updateStatus(id, payStatus);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
