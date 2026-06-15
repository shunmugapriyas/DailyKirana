package com.pennselavu.tracker.expense;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
  List<Expense> findByUserIdOrderByDateDescCreatedAtDesc(String userId);

  void deleteByIdAndUserId(String id, String userId);
}
