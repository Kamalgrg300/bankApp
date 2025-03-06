package com.kamal.controller;

import com.kamal.model.User;
import com.kamal.security.JwtUtil;
import com.kamal.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private static final Set<String> blacklistedTokens = ConcurrentHashMap.newKeySet(); // ✅ Store invalid tokens

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    /** ✅ Register new user */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = authService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", registeredUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** ✅ Login user */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            String token = authService.loginUser(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(Map.of("token", token, "role", user.getRole()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of(
                "error", e.getMessage(),
                "correct_email", user.getEmail(),
                "correct_password", "Use the correct password you registered with"
            ));
        }
    }

    /** ✅ Logout user (invalidate JWT token) */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // ✅ Remove 'Bearer ' prefix
        }

        blacklistedTokens.add(token); // ✅ Add token to blacklist
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    /** ✅ Check if token is blacklisted */
    public static boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
