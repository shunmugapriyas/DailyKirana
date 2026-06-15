package com.pennselavu.tracker.settings;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserSettingsRepository extends MongoRepository<UserSettings, String> {
  Optional<UserSettings> findByUserId(String userId);
}
