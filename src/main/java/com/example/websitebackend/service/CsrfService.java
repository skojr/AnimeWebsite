package com.example.websitebackend.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CsrfService {

    public String getToken(HttpSession session) {
        return (String) session.getAttribute("CSRF-TOKEN-SET-ATTRIBUTE");
    }
    public String generateToken(HttpSession session) {
        String csrfToken = UUID.randomUUID().toString();
        session.setAttribute("CSRF-TOKEN-SET-ATTRIBUTE", csrfToken);
        return csrfToken;
    }

    public void validateCsrfToken(HttpSession session, String csrfToken) {
        if (session.getAttribute("CSRF-TOKEN-SET-ATTRIBUTE") != null) {
            session.getAttribute("csrfToken");
        }
    }


}

