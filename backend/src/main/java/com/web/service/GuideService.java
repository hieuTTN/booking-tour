package com.web.service;

import com.web.entity.Category;
import com.web.entity.Guide;
import com.web.exception.MessageException;
import com.web.repository.AuthorityRepository;
import com.web.repository.GuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GuideService {

    @Autowired
    private GuideRepository guideRepository;

    public Guide save(Guide guide) {
        guideRepository.save(guide);
        return guide;
    }

    public void delete(Long id) {
        guideRepository.deleteById(id);
    }

    public Guide findById(Long id) {
        return guideRepository.findById(id).get();
    }

    public Page<Guide> findAll(Pageable pageable) {
        Page<Guide> page = guideRepository.findAll(pageable);
        return page;
    }

    public List<Guide> findAll() {
        List<Guide> page = guideRepository.findAll();
        return page;
    }

}
