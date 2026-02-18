package com.anjalipawar._7.ExpenseTracker.service;

import com.anjalipawar._7.ExpenseTracker.Exception.ExpenseTrackerException;
import com.anjalipawar._7.ExpenseTracker.model.Expense;
import com.anjalipawar._7.ExpenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // ✅ userId ke saath date filter
    @Override
    public List<Expense> getExpensesByDateRange(String userId, LocalDate start, LocalDate end) {
        return expenseRepository.findByUserIdAndDateBetween(userId, start, end);
    }

    @Override
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    @Override
    public Expense updateExpense(Long id, Expense expenseDetails) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ExpenseTrackerException("Expense not found with id: " + id));

        expense.setName(expenseDetails.getName());
        expense.setAmount(expenseDetails.getAmount());
        expense.setCategory(expenseDetails.getCategory());
        expense.setDescription(expenseDetails.getDescription());
        expense.setDate(expenseDetails.getDate());
        expense.setUserId(expenseDetails.getUserId()); // IMPORTANT

        return expenseRepository.save(expense);
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    // ✅ get expenses by userId
    @Override
    public List<Expense> getExpensesByUserId(String userId) {
        return expenseRepository.findByUserId(userId);
    }
}

