package com.web.api;

import com.web.dto.request.TourDto;
import com.web.dto.response.CategoryDto;
import com.web.entity.Category;
import com.web.entity.Guide;
import com.web.entity.Tour;
import com.web.service.CategoryService;
import com.web.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tour")
@CrossOrigin
public class TourApi {

    @Autowired
    private TourService tourService;

    @PostMapping("/admin/create")
    public ResponseEntity<?> save(@RequestBody TourDto tourDto){
        Tour result = tourService.save(tourDto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        tourService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/public/find-all")
    public ResponseEntity<?> findAllList(@RequestParam(required = false)Date from,
                                         @RequestParam(required = false)Date to, Pageable pageable){
        Page<Tour> result = tourService.findAll(from, to, pageable);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/public/find-all-by-user")
    public ResponseEntity<?> findAll(@RequestParam(required = false)Date from, @RequestParam(required = false) Long categoryId,
                                         @RequestParam(required = false) Date to, Pageable pageable){
        Page<Tour> result = tourService.findAllPublic(from, to,categoryId, pageable);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/admin/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Tour result = tourService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
