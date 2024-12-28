package com.web.api;

import com.web.dto.response.CategoryDto;
import com.web.entity.Category;
import com.web.entity.Guide;
import com.web.service.CategoryService;
import com.web.service.GuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guide")
@CrossOrigin
public class GuideApi {

    @Autowired
    private GuideService guideService;

    @PostMapping("/admin/create")
    public ResponseEntity<?> save(@RequestBody Guide guide){
        Guide result = guideService.save(guide);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<?> delete(@RequestParam("id") Long id){
        guideService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/find-all")
    public ResponseEntity<?> findAllList(Pageable pageable){
        Page<Guide> result = guideService.findAll(pageable);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/admin/find-all-list")
    public ResponseEntity<?> findAllList(){
        List<Guide> result = guideService.findAll();
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/admin/findById")
    public ResponseEntity<?> findById(@RequestParam("id") Long id){
        Guide result = guideService.findById(id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

}
