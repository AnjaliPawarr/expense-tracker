package com.anjalipawar._7.ExpenseTracker.service;

import com.anjalipawar._7.ExpenseTracker.model.Expense;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
//@Service
public interface ExpenseService{
    Expense saveExpense(Expense expense);
    //public interface ExpenseService {
        List<Expense> getAllExpenses();
        Optional<Expense> getExpenseById(Long id); // Optional का उपयोग करें



    Expense updateExpense(Long id, Expense expenseDetails);
    void deleteExpense(Long id);
}
