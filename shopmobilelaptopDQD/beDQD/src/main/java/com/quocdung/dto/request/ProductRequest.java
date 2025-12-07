package com.quocdung.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank
    private String name;

    @NotNull
    @Min(0)
    private BigDecimal price;

    private String description;

    private String imageUrl;

    @NotNull
    @Min(0)
    private Integer stock;      // số lượng tồn

    @NotNull
    private Long categoryId;

    private Boolean featured = false;
}
