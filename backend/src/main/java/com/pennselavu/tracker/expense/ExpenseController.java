package com.pennselavu.tracker.expense;

import com.pennselavu.tracker.auth.AuthService;
import com.pennselavu.tracker.expense.ExpenseDtos.ExpenseRequest;
import com.pennselavu.tracker.expense.ExpenseDtos.ExpenseResponse;
import com.pennselavu.tracker.user.User;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
  private final AuthService authService;
  private final ExpenseRepository expenses;

  public ExpenseController(AuthService authService, ExpenseRepository expenses) {
    this.authService = authService;
    this.expenses = expenses;
  }

  @GetMapping
  List<ExpenseResponse> list(@RequestHeader(name = "Authorization", required = false) String authorization) {
    User user = authService.requireUser(authorization);
    return expenses.findByUserIdOrderByDateDescCreatedAtDesc(user.getId()).stream().map(ExpenseResponse::from).toList();
  }

  @PostMapping
  ExpenseResponse create(
      @RequestHeader(name = "Authorization", required = false) String authorization,
      @Valid @RequestBody ExpenseRequest request) {
    User user = authService.requireUser(authorization);
    Expense expense = new Expense();
    expense.setUserId(user.getId());
    expense.setAmount(request.amount());
    expense.setCategory(request.category());
    expense.setPaymentMode(request.paymentMode());
    expense.setNote(request.note() == null ? "" : request.note());
    expense.setDate(request.date());
    expense.setCreatedAt(Instant.now());
    return ExpenseResponse.from(expenses.save(expense));
  }

  @DeleteMapping("/{id}")
  void delete(
      @RequestHeader(name = "Authorization", required = false) String authorization, @PathVariable String id) {
    User user = authService.requireUser(authorization);
    expenses.deleteByIdAndUserId(id, user.getId());
  }
}
