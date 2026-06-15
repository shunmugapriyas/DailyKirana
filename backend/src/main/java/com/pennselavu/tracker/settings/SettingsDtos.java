package com.pennselavu.tracker.settings;

public class SettingsDtos {
  public record SettingsRequest(
      String language,
      double monthlyIncome,
      double monthlyBudget,
      double monthlySavingsGoal,
      boolean pinLockEnabled,
      boolean hasCompletedOnboarding) {}

  public record SettingsResponse(
      String language,
      double monthlyIncome,
      double monthlyBudget,
      double monthlySavingsGoal,
      boolean pinLockEnabled,
      boolean hasCompletedOnboarding) {
    static SettingsResponse from(UserSettings settings) {
      return new SettingsResponse(
          settings.getLanguage(),
          settings.getMonthlyIncome(),
          settings.getMonthlyBudget(),
          settings.getMonthlySavingsGoal(),
          settings.isPinLockEnabled(),
          settings.isHasCompletedOnboarding());
    }
  }
}
