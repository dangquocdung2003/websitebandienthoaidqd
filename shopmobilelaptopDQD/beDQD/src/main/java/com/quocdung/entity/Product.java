package com.quocdung.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @Column(length = 2000)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    // SỐ LƯỢNG TỒN
    @Column(nullable = false)
    private Integer stock;

    // để sau này FE dễ lọc “sản phẩm nổi bật”
    @Column(nullable = false)
    private Boolean featured = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
