package com.quocdung.service.impl;

import com.quocdung.config.JwtService;
import com.quocdung.dto.request.LoginRequest;
import com.quocdung.dto.request.UserRequest;
import com.quocdung.dto.response.AuthResponse;
import com.quocdung.dto.response.UserResponse;
import com.quocdung.entity.Role;
import com.quocdung.entity.User;
import com.quocdung.repository.UserRepository;
import com.quocdung.service.JpaUserDetailsService;
import com.quocdung.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final JpaUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @Override
    public UserResponse register(UserRequest req) {
        if (userRepository.existsByUsername(req.getUsername()))
            throw new IllegalArgumentException("Username đã tồn tại");

        if (userRepository.existsByEmail(req.getEmail()))
            throw new IllegalArgumentException("Email đã tồn tại");

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .roles(Set.of(Role.ROLE_USER))
                .build();

        user = userRepository.save(user);
        return toUserResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsernameOrEmail(),
                        req.getPassword()
                )
        );

        var userDetails = userDetailsService.loadUserByUsername(req.getUsernameOrEmail());
        String token = jwtService.generateToken(userDetails);

        User user = userRepository
                .findByUsernameOrEmail(req.getUsernameOrEmail(), req.getUsernameOrEmail())
                .orElseThrow();

        return AuthResponse.builder()
                .token(token)
                .user(toUserResponse(user))
                .build();
    }

    @Override
    public UserResponse me(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));

        return toUserResponse(user);
    }

    private UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .build();
    }
}
