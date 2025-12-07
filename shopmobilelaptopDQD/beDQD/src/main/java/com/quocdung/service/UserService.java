package com.quocdung.service;

import com.quocdung.dto.request.LoginRequest;
import com.quocdung.dto.request.UserRequest;
import com.quocdung.dto.response.AuthResponse;
import com.quocdung.dto.response.UserResponse;

public interface UserService {
    UserResponse register(UserRequest request);
    AuthResponse login(LoginRequest request);
    UserResponse me(String username); // lấy từ SecurityContext (username)
}
