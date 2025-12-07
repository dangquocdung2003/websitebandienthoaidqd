    package com.quocdung.controller;

    import com.quocdung.dto.response.UserResponse;
    import com.quocdung.service.UserService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.core.Authentication;
    import org.springframework.web.bind.annotation.*;

    @RestController
    @RequestMapping("/api/users")
    @RequiredArgsConstructor
    public class UserController {

        private final UserService userService;

        @GetMapping("/me")
        public UserResponse me(Authentication authentication) {
            return userService.me(authentication.getName());
        }
    }