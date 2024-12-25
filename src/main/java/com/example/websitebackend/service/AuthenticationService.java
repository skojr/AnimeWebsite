package com.example.websitebackend.service;

import com.example.websitebackend.auth.AuthenticationRequest;
import com.example.websitebackend.auth.RegisterRequest;
import com.example.websitebackend.model.CustomUser;
import com.example.websitebackend.model.Role;
import com.example.websitebackend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final CsrfService csrfService;

    public ResponseEntity<?> register(RegisterRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        // Check if the email is already registered
        if (repository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already registered");
        }
        CustomUser user = CustomUser.builder().email(request.getEmail()).password(this.passwordEncoder.encode(request.getPassword())).role(Role.USER).build();
        this.repository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> authenticate(AuthenticationRequest request, HttpServletResponse response, HttpSession session) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        CustomUser user = (CustomUser)this.repository.findByEmail(request.getEmail()).orElseThrow();
        UserDetails userDetails = this.userDetailsService.createUserDetails(user);
        String jwtToken = this.jwtService.generateToken(userDetails);
        String csrfToken = this.csrfService.generateToken(session);

        // Set up CSRF Token
        Cookie csrfCookie = new Cookie("csrfToken", csrfToken);
        csrfCookie.setHttpOnly(false);
        csrfCookie.setSecure(true);
        csrfCookie.setPath("/");
        csrfCookie.setMaxAge(3600);
        response.addCookie(csrfCookie);

        // Set HTTP-only cookie for JWT
        Cookie jwtCookie = new Cookie("jwt", jwtToken);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(3600);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok("User authenticated successfully");
    }

    public AuthenticationService(final UserRepository repository, final PasswordEncoder passwordEncoder, final JwtService jwtService, final AuthenticationManager authenticationManager, final CustomUserDetailsService userDetailsService, final CsrfService csrfService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.csrfService = csrfService;
    }
}
