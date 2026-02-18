package com.anjalipawar._7.ExpenseTracker;

import com.anjalipawar._7.ExpenseTracker.model.Expense;
import com.anjalipawar._7.ExpenseTracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // CREATE
    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }

    // GET ALL BY USER
    @GetMapping("/user/{userId}")
    public List<Expense> getByUserId(@PathVariable String userId) {
        return expenseService.getExpensesByUserId(userId);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Optional<Expense> getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    // FILTER
    @GetMapping("/user/{userId}/filter")
    public List<Expense> getByDateRange(
            @PathVariable String userId,
            @RequestParam String start,
            @RequestParam String end) {

        return expenseService.getExpensesByDateRange(
                userId,
                LocalDate.parse(start),
                LocalDate.parse(end)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
}