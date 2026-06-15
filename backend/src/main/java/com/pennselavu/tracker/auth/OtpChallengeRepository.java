package com.pennselavu.tracker.auth;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OtpChallengeRepository extends MongoRepository<OtpChallenge, String> {
  Optional<OtpChallenge> findFirstByIdentifierAndUsedFalseOrderByCreatedAtDesc(String identifier);
}
