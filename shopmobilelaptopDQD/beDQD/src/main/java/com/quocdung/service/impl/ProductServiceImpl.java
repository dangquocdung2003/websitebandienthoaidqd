package com.quocdung.service.impl;

import com.quocdung.dto.request.ProductRequest;
import com.quocdung.dto.response.ProductResponse;
import com.quocdung.entity.Category;
import com.quocdung.entity.Product;
import com.quocdung.repository.CategoryRepository;
import com.quocdung.repository.ProductRepository;
import com.quocdung.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private ProductResponse mapToResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .description(p.getDescription())
                .imageUrl(p.getImageUrl())
                .stock(p.getStock())
                .featured(p.getFeatured())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .build();
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public ProductResponse create(ProductRequest request) {
        Category category = getCategory(request.getCategoryId());

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .stock(request.getStock())
                .featured(Boolean.TRUE.equals(request.getFeatured()))
                .category(category)
                .build();

        return mapToResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Category category = getCategory(request.getCategoryId());

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setStock(request.getStock());
        product.setFeatured(Boolean.TRUE.equals(request.getFeatured()));
        product.setCategory(category);

        return mapToResponse(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAll() {
        return productRepository.findAll()
                .stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId)
                .stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getFeatured() {
        return productRepository.findByFeaturedTrue()
                .stream().map(this::mapToResponse).toList();
    }
}
