package com.anjalipawar._7.ExpenseTracker.service;
import com.anjalipawar._7.ExpenseTracker.Exception.ExpenseTrackerException;
import com.anjalipawar._7.ExpenseTracker.model.Expense;
import com.anjalipawar._7.ExpenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
    @Override
    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }
    @Override
    public Expense updateExpense(Long id, Expense expenseDetails) {

        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ExpenseTrackerException("Expense not found with id: " + id));
        expense.setAmount(expenseDetails.getAmount());
        return expenseRepository.save(expense);
    }
    @Override
    public void deleteExpense(Long id) {
        // Repository को सीधे deletion के लिए कहें
        expenseRepository.deleteById(id);
    }
}