package com.pennselavu.tracker.settings;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user_settings")
public class UserSettings {
  @Id private String id;

  @Indexed(unique = true)
  private String userId;

  private String language = "ta";
  private double monthlyIncome;
  private double monthlyBudget;
  private double monthlySavingsGoal;
  private boolean pinLockEnabled;
  private boolean hasCompletedOnboarding;
  private Instant updatedAt;

  public String getId() {
    return id;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getLanguage() {
    return language;
  }

  public void setLanguage(String language) {
    this.language = language;
  }

  public double getMonthlyIncome() {
    return monthlyIncome;
  }

  public void setMonthlyIncome(double monthlyIncome) {
    this.monthlyIncome = monthlyIncome;
  }

  public double getMonthlyBudget() {
    return monthlyBudget;
  }

  public void setMonthlyBudget(double monthlyBudget) {
    this.monthlyBudget = monthlyBudget;
  }

  public double getMonthlySavingsGoal() {
    return monthlySavingsGoal;
  }

  public void setMonthlySavingsGoal(double monthlySavingsGoal) {
    this.monthlySavingsGoal = monthlySavingsGoal;
  }

  public boolean isPinLockEnabled() {
    return pinLockEnabled;
  }

  public void setPinLockEnabled(boolean pinLockEnabled) {
    this.pinLockEnabled = pinLockEnabled;
  }

  public boolean isHasCompletedOnboarding() {
    return hasCompletedOnboarding;
  }

  public void setHasCompletedOnboarding(boolean hasCompletedOnboarding) {
    this.hasCompletedOnboarding = hasCompletedOnboarding;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Instant updatedAt) {
    this.updatedAt = updatedAt;
  }
}
