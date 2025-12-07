package com.quocdung.controller;

import com.quocdung.dto.request.ProductRequest;
import com.quocdung.dto.response.ProductResponse;
import com.quocdung.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.create(request));
    }

    @PutMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id,
                                                  @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll(
            @RequestParam(required = false) Long categoryId
    ) {
        if (categoryId != null) {
            return ResponseEntity.ok(productService.getByCategory(categoryId));
        }
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProductResponse>> getFeatured() {
        return ResponseEntity.ok(productService.getFeatured());
    }
}
