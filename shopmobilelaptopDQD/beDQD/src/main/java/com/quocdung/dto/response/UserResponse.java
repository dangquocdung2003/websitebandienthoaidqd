package com.quocdung.dto.response;

import com.quocdung.entity.Role;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<Role> roles;
}