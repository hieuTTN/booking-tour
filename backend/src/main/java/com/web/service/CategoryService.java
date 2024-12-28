package com.web.service;

import com.web.dto.response.CategoryDto;
import com.web.entity.Category;
import com.web.exception.MessageException;
import com.web.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category save(Category category) {
        categoryRepository.save(category);
        return category;
    }

    public void delete(Long categoryId) {
        try {
            categoryRepository.deleteById(categoryId);
        }
        catch (Exception e){
            throw new MessageException("Danh mục đã có tour, không thể xóa");
        }
    }

    public Category findById(Long id) {
        return null;
    }

    public List<Category> findAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    public List<CategoryDto> findAllQuantity() {
        return categoryRepository.findAllQuantity();
    }
}
