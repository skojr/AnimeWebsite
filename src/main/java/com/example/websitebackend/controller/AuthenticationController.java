package com.example.websitebackend.controller;

import com.example.websitebackend.auth.AuthenticationRequest;
import com.example.websitebackend.auth.AuthenticationResponse;
import com.example.websitebackend.auth.RegisterRequest;
import com.example.websitebackend.service.AuthenticationService;
import com.example.websitebackend.service.CsrfService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/users/auth"})
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping({"/register"})
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(this.service.register(request));
    }

    @PostMapping({"/authenticate"})
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response, HttpSession session) {
        return ResponseEntity.ok(this.service.authenticate(request, response, session));
    }

    public AuthenticationController(final AuthenticationService service) {
        this.service = service;
    }
}
