package com.web.service;

import com.web.dto.request.TourDto;
import com.web.dto.request.TourSpecification;
import com.web.entity.Guide;
import com.web.entity.ImageTour;
import com.web.entity.Tour;
import com.web.entity.TourGuide;
import com.web.exception.MessageException;
import com.web.mapper.TourMapper;
import com.web.repository.GuideRepository;
import com.web.repository.ImageTourRepository;
import com.web.repository.TourGuideRepository;
import com.web.repository.TourRepository;
import org.apache.commons.math3.stat.descriptive.summary.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private ImageTourRepository imageTourRepository;

    @Autowired
    private TourGuideRepository tourGuideRepository;

    @Autowired
    private TourMapper tourMapper;

    @Autowired
    private GuideRepository guideRepository;

    public Tour save(TourDto dto){
        Tour tour = tourMapper.dtoToEntity(dto);
        tour.setCreatedDate(LocalDateTime.now());
        tour.setNumRegistered(0);
        if(tour.getId() != null){
            Tour ex = tourRepository.findById(tour.getId()).get();
            tour.setNumRegistered(ex.getNumRegistered());
            tour.setCreatedDate(ex.getCreatedDate());
        }
        tourRepository.save(tour);
        for(String s : dto.getImages()){
            ImageTour imageTour = new ImageTour();
            imageTour.setTour(tour);
            imageTour.setImage(s);
            imageTourRepository.save(imageTour);
        }
        if(dto.getId() != null){
            tourGuideRepository.deleteByTour(tour.getId());
        }
        for(Long id : dto.getGuides()){
            Guide s = guideRepository.findById(id).get();
            TourGuide tourGuide = new TourGuide();
            tourGuide.setTour(tour);
            tourGuide.setGuide(s);
            tourGuideRepository.save(tourGuide);
        }
        return tour;
    }

    public void delete(Long id) {
        try {
            tourRepository.deleteById(id);
        }
        catch (Exception e) {
            throw new MessageException("Đã có người đăng ký, không thể xóa");
        }
    }

    public Tour findById(Long id) {
        return tourRepository.findById(id).get();
    }

    public Page<Tour> findAll(Date start, Date end, Pageable pageable) {
        if(start == null || end == null){
            start = Date.valueOf("2000-01-01");
            end = Date.valueOf("2200-01-01");
        }
        Page<Tour> page = tourRepository.findByDate(start, end, pageable);
        return page;
    }

    public Page<Tour> findAllPublic(Date start, Date end, Long categoryId, Pageable pageable) {
        if(start == null || end == null){
            start = Date.valueOf("2000-01-01");
            end = Date.valueOf("2200-01-01");
        }
        Page<Tour> page = null;
        if(categoryId == null){
            page = tourRepository.findByDatePublic(start, end, pageable);
        }
        else{
            page = tourRepository.findByCategory(categoryId, pageable);
        }
        return page;
    }

    public Page<Tour> searchFull(Double smallPrice, Double largePrice, List<Long> listIdCategory, Date from, Date to, Pageable pageable) {
        if(smallPrice == null || largePrice == null){
            smallPrice = 0D;
            largePrice = 1000000000D;
        }
        TourSpecification productSpecification = new TourSpecification(listIdCategory, smallPrice, largePrice, from, to);
        Page<Tour> page = tourRepository.findAll(productSpecification, pageable);
        return page;
    }

}
