package com.pennselavu.tracker.expense;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;

public class ExpenseDtos {
  public record ExpenseRequest(
      @Positive double amount,
      @NotBlank String category,
      @NotBlank String paymentMode,
      String note,
      @NotNull LocalDate date) {}

  public record ExpenseResponse(
      String id,
      double amount,
      String category,
      String paymentMode,
      String note,
      String date,
      String createdAt) {
    static ExpenseResponse from(Expense expense) {
      return new ExpenseResponse(
          expense.getId(),
          expense.getAmount(),
          expense.getCategory(),
          expense.getPaymentMode(),
          expense.getNote(),
          expense.getDate().toString(),
          expense.getCreatedAt().toString());
    }
  }
}
