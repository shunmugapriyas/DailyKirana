package com.pennselavu.tracker.config;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(Cors cors, Otp otp, Session session) {
  public record Cors(List<String> allowedOrigins) {}

  public record Otp(long ttlMinutes, boolean devMode) {}

  public record Session(long ttlDays) {}
}
