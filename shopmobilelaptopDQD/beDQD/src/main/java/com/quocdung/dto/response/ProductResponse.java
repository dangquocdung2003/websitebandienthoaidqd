package com.quocdung.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private Integer stock;
    private Boolean featured;

    private Long categoryId;
    private String categoryName;
}
