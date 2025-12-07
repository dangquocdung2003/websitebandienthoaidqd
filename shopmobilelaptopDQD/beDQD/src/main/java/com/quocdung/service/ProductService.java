package com.quocdung.service;

import com.quocdung.dto.request.ProductRequest;
import com.quocdung.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    ProductResponse update(Long id, ProductRequest request);

    void delete(Long id);

    ProductResponse getById(Long id);

    List<ProductResponse> getAll();

    List<ProductResponse> getByCategory(Long categoryId);

    List<ProductResponse> getFeatured();
}
