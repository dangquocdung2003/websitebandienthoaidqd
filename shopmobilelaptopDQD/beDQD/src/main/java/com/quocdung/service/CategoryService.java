package com.quocdung.service;

import com.quocdung.dto.request.CategoryRequest;
import com.quocdung.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    void delete(Long id);

    CategoryResponse getById(Long id);

    List<CategoryResponse> getAll();
}
