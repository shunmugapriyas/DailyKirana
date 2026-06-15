package com.pennselavu.tracker.auth;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("otp_challenges")
public class OtpChallenge {
  @Id private String id;

  @Indexed
  private String identifier;

  private String channel;
  private String otpHash;
  private Instant expiresAt;
  private Instant createdAt;
  private boolean used;

  public String getId() {
    return id;
  }

  public String getIdentifier() {
    return identifier;
  }

  public void setIdentifier(String identifier) {
    this.identifier = identifier;
  }

  public String getChannel() {
    return channel;
  }

  public void setChannel(String channel) {
    this.channel = channel;
  }

  public String getOtpHash() {
    return otpHash;
  }

  public void setOtpHash(String otpHash) {
    this.otpHash = otpHash;
  }

  public Instant getExpiresAt() {
    return expiresAt;
  }

  public void setExpiresAt(Instant expiresAt) {
    this.expiresAt = expiresAt;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public boolean isUsed() {
    return used;
  }

  public void setUsed(boolean used) {
    this.used = used;
  }
}
