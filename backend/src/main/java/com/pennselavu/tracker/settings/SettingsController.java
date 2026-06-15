package com.pennselavu.tracker.settings;

import com.pennselavu.tracker.auth.AuthService;
import com.pennselavu.tracker.settings.SettingsDtos.SettingsRequest;
import com.pennselavu.tracker.settings.SettingsDtos.SettingsResponse;
import com.pennselavu.tracker.user.User;
import java.time.Instant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
  private final AuthService authService;
  private final UserSettingsRepository settingsRepository;

  public SettingsController(AuthService authService, UserSettingsRepository settingsRepository) {
    this.authService = authService;
    this.settingsRepository = settingsRepository;
  }

  @GetMapping
  SettingsResponse getSettings(@RequestHeader(name = "Authorization", required = false) String authorization) {
    User user = authService.requireUser(authorization);
    return SettingsResponse.from(findOrCreate(user.getId()));
  }

  @PutMapping
  SettingsResponse updateSettings(
      @RequestHeader(name = "Authorization", required = false) String authorization,
      @RequestBody SettingsRequest request) {
    User user = authService.requireUser(authorization);
    UserSettings settings = findOrCreate(user.getId());
    settings.setLanguage(request.language() == null ? "ta" : request.language());
    settings.setMonthlyIncome(request.monthlyIncome());
    settings.setMonthlyBudget(request.monthlyBudget());
    settings.setMonthlySavingsGoal(request.monthlySavingsGoal());
    settings.setPinLockEnabled(request.pinLockEnabled());
    settings.setHasCompletedOnboarding(request.hasCompletedOnboarding());
    settings.setUpdatedAt(Instant.now());
    return SettingsResponse.from(settingsRepository.save(settings));
  }

  private UserSettings findOrCreate(String userId) {
    return settingsRepository
        .findByUserId(userId)
        .orElseGet(
            () -> {
              UserSettings settings = new UserSettings();
              settings.setUserId(userId);
              settings.setUpdatedAt(Instant.now());
              return settingsRepository.save(settings);
            });
  }
}
