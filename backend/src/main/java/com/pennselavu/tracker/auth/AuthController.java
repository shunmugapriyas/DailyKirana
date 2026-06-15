package com.pennselavu.tracker.auth;

import com.pennselavu.tracker.auth.AuthDtos.AuthResponse;
import com.pennselavu.tracker.auth.AuthDtos.OtpRequest;
import com.pennselavu.tracker.auth.AuthDtos.OtpResponse;
import com.pennselavu.tracker.auth.AuthDtos.VerifyOtpRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/request-otp")
  OtpResponse requestOtp(@Valid @RequestBody OtpRequest request) {
    return authService.requestOtp(request.identifier());
  }

  @PostMapping("/verify-otp")
  AuthResponse verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
    return authService.verifyOtp(request.identifier(), request.otp());
  }
}
