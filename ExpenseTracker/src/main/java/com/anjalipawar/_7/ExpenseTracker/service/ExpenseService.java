package com.anjalipawar._7.ExpenseTracker.service;

import com.anjalipawar._7.ExpenseTracker.model.Expense;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

public interface ExpenseService {

    Expense saveExpense(Expense expense);

    Optional<Expense> getExpenseById(Long id);

    Expense updateExpense(Long id, Expense expenseDetails);

    void deleteExpense(Long id);

    // ✅ get by userId
    List<Expense> getExpensesByUserId(String userId);

    // ✅ filter by userId + date range
    List<Expense> getExpensesByDateRange(String userId, LocalDate start, LocalDate end);
}
