package com.web.mapper;

import com.web.dto.request.TourDto;
import com.web.dto.response.UserDto;
import com.web.entity.Tour;
import com.web.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TourMapper {

    @Autowired
    private ModelMapper mapper;

    public Tour dtoToEntity(TourDto tourDto){
        Tour dto = mapper.map(tourDto, Tour.class);
        return dto;
    }
}
