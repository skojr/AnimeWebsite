package com.example.websitebackend.controller;

import com.example.websitebackend.auth.AuthenticationRequest;
import com.example.websitebackend.auth.AuthenticationResponse;
import com.example.websitebackend.auth.RegisterRequest;
import com.example.websitebackend.service.AuthenticationService;
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
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(this.service.register(request));
    }

    @PostMapping({"/authenticate"})
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(this.service.authenticate(request));
    }

    public AuthenticationController(final AuthenticationService service) {
        this.service = service;
    }
}
