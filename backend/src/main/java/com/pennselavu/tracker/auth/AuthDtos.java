package com.pennselavu.tracker.auth;

import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
  public record OtpRequest(@NotBlank String identifier) {}

  public record OtpResponse(String challengeId, String channel, String message, String devOtp) {}

  public record VerifyOtpRequest(@NotBlank String identifier, @NotBlank String otp) {}

  public record AuthUser(String id, String identifier, String channel) {}

  public record AuthResponse(String token, AuthUser user) {}
}
