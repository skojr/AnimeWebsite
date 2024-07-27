package com.example.websitebackend.service;

import com.example.websitebackend.model.CustomUser;
import com.example.websitebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    private CustomUser user;

    public CustomUserDetailsService() {
    }

    public String getPassword() {
        return this.user.getPassword();
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomUser user = (CustomUser)this.userRepository.findByEmail(email).orElseThrow(() -> {
            return new UsernameNotFoundException("User not found");
        });
        return this.createUserDetails(user);
    }

    public UserDetails createUserDetails(CustomUser user) {
        return User.withUsername(user.getEmail()).password(user.getPassword()).authorities(user.getAuthorities()).build();
    }
}