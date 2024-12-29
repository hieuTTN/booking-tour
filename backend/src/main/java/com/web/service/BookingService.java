package com.web.service;

import com.web.entity.Booking;
import com.web.entity.Tour;
import com.web.entity.User;
import com.web.enums.PayStatus;
import com.web.exception.MessageException;
import com.web.repository.BookingRepository;
import com.web.repository.TourRepository;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private UserUtils userUtils;

    public Booking createBooking(Integer numChild, Integer numAudit, Long idTour){
        Tour tour = tourRepository.findById(idTour).get();
        User user = userUtils.getUserWithAuthority();
        if((tour.getMaxParticipants() - tour.getNumRegistered()) < (numAudit + numChild)){
            throw new MessageException("Chỉ còn lại "+ (tour.getMaxParticipants() - tour.getNumRegistered()) +" slot đăng ký");
        }
        Double amount = tour.getPriceAdults() * numAudit + tour.getPriceChildren() + numChild;
        Booking booking = new Booking();
        booking.setCreatedDate(LocalDateTime.now());
        booking.setTour(tour);
        booking.setNumAdults(numAudit);
        booking.setNumChildren(numChild);
        booking.setPayStatus(PayStatus.CHUA_THANH_TOAN);
        booking.setTotalPrice(amount);
        booking.setUser(user);
        bookingRepository.save(booking);
        tour.setNumRegistered(tour.getNumRegistered() + numChild + numAudit);
        tourRepository.save(tour);
        return booking;
    }

    public Page<Booking> myBooking(Pageable pageable){
        User user = userUtils.getUserWithAuthority();
        Page<Booking> page = bookingRepository.myBooking(user.getId(),pageable);
        return page;
    }

    public Page<Booking> all(Pageable pageable){
        Page<Booking> page = bookingRepository.findAll(pageable);
        return page;
    }

    public Booking cancel(Long id){
        Booking booking = bookingRepository.findById(id).get();
        if(!booking.getPayStatus().equals(PayStatus.CHUA_THANH_TOAN)){
            throw new MessageException("Không thể hủy");
        }
        booking.setPayStatus(PayStatus.DA_HUY);
        bookingRepository.save(booking);
        booking.getTour().setNumRegistered(booking.getTour().getNumRegistered() - booking.getNumAdults() - booking.getNumChildren());
        tourRepository.save(booking.getTour());
        return booking;
    }

    public Booking updateStatus(Long id, PayStatus payStatus){
        Booking booking = bookingRepository.findById(id).get();
        if(booking.getPayStatus().equals(PayStatus.DA_HUY)){
            throw new MessageException("Đã hủy, không thể cập nhật trạng thái");
        }
        booking.setPayStatus(payStatus);
        bookingRepository.save(booking);
        if(payStatus.equals(PayStatus.DA_HUY)){
            booking.getTour().setNumRegistered(booking.getTour().getNumRegistered() - booking.getNumAdults() - booking.getNumChildren());
            tourRepository.save(booking.getTour());
        }
        return booking;
    }
}
