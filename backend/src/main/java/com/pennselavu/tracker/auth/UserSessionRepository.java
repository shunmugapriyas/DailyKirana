package com.pennselavu.tracker.auth;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserSessionRepository extends MongoRepository<UserSession, String> {
  Optional<UserSession> findByToken(String token);
}
