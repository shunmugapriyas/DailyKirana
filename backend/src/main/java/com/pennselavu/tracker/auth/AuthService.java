package com.pennselavu.tracker.auth;

import com.pennselavu.tracker.auth.AuthDtos.AuthResponse;
import com.pennselavu.tracker.auth.AuthDtos.AuthUser;
import com.pennselavu.tracker.auth.AuthDtos.OtpResponse;
import com.pennselavu.tracker.common.ApiException;
import com.pennselavu.tracker.config.AppProperties;
import com.pennselavu.tracker.user.User;
import com.pennselavu.tracker.user.UserRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.Locale;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final AppProperties properties;
  private final OtpChallengeRepository otpChallenges;
  private final UserRepository users;
  private final UserSessionRepository sessions;
  private final SecureRandom secureRandom = new SecureRandom();

  public AuthService(
      AppProperties properties,
      OtpChallengeRepository otpChallenges,
      UserRepository users,
      UserSessionRepository sessions) {
    this.properties = properties;
    this.otpChallenges = otpChallenges;
    this.users = users;
    this.sessions = sessions;
  }

  public OtpResponse requestOtp(String rawIdentifier) {
    String identifier = normalizeIdentifier(rawIdentifier);
    String channel = identifier.contains("@") ? "email" : "phone";
    String otp = String.valueOf(100000 + secureRandom.nextInt(900000));
    Instant now = Instant.now();

    OtpChallenge challenge = new OtpChallenge();
    challenge.setIdentifier(identifier);
    challenge.setChannel(channel);
    challenge.setOtpHash(hash(otp));
    challenge.setCreatedAt(now);
    challenge.setExpiresAt(now.plus(properties.otp().ttlMinutes(), ChronoUnit.MINUTES));
    challenge.setUsed(false);
    challenge = otpChallenges.save(challenge);

    if (properties.otp().devMode()) {
      System.out.printf("Penn Selavu OTP for %s is %s%n", identifier, otp);
    }

    String message = channel.equals("email") ? "OTP sent to email" : "OTP sent to phone";
    return new OtpResponse(challenge.getId(), channel, message, properties.otp().devMode() ? otp : null);
  }

  public AuthResponse verifyOtp(String rawIdentifier, String otp) {
    String identifier = normalizeIdentifier(rawIdentifier);
    OtpChallenge challenge =
        otpChallenges
            .findFirstByIdentifierAndUsedFalseOrderByCreatedAtDesc(identifier)
            .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "OTP not found"));

    if (challenge.getExpiresAt().isBefore(Instant.now())) {
      throw new ApiException(HttpStatus.BAD_REQUEST, "OTP expired");
    }

    if (!challenge.getOtpHash().equals(hash(otp))) {
      throw new ApiException(HttpStatus.BAD_REQUEST, "Invalid OTP");
    }

    challenge.setUsed(true);
    otpChallenges.save(challenge);

    Instant now = Instant.now();
    User user =
        users
            .findByIdentifier(identifier)
            .orElseGet(
                () -> {
                  User next = new User();
                  next.setIdentifier(identifier);
                  next.setChannel(challenge.getChannel());
                  next.setCreatedAt(now);
                  return next;
                });
    user.setLastLoginAt(now);
    user = users.save(user);

    UserSession session = new UserSession();
    session.setToken(UUID.randomUUID().toString() + UUID.randomUUID());
    session.setUserId(user.getId());
    session.setCreatedAt(now);
    session.setExpiresAt(now.plus(properties.session().ttlDays(), ChronoUnit.DAYS));
    session = sessions.save(session);

    return new AuthResponse(session.getToken(), new AuthUser(user.getId(), user.getIdentifier(), user.getChannel()));
  }

  public User requireUser(String authorizationHeader) {
    String token = extractBearerToken(authorizationHeader);
    UserSession session =
        sessions.findByToken(token).orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Unauthorized"));

    if (session.getExpiresAt().isBefore(Instant.now())) {
      sessions.delete(session);
      throw new ApiException(HttpStatus.UNAUTHORIZED, "Session expired");
    }

    return users.findById(session.getUserId()).orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "User not found"));
  }

  private String extractBearerToken(String authorizationHeader) {
    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, "Missing token");
    }
    return authorizationHeader.substring("Bearer ".length()).trim();
  }

  private String normalizeIdentifier(String identifier) {
    String normalized = identifier.trim().toLowerCase(Locale.ROOT);
    if (normalized.contains("@")) {
      return normalized;
    }
    return normalized.replaceAll("[^0-9+]", "");
  }

  private String hash(String value) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
    } catch (NoSuchAlgorithmException exception) {
      throw new IllegalStateException(exception);
    }
  }
}
