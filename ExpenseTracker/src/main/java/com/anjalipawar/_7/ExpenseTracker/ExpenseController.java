package com.anjalipawar._7.ExpenseTracker;

import com.anjalipawar._7.ExpenseTracker.model.Expense;
import com.anjalipawar._7.ExpenseTracker.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173") // <--- YEH LINE ADD KAREIN
@RestController
@RequestMapping("/api")
public class ExpenseController {

    private final ExpenseService expenseService;

    // Constructor Injection
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }
    @PostMapping("/expenses")
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        Expense savedExpense = expenseService.saveExpense(expense);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }
    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // --- 3. READ BY ID (GET/{id}) ---
    // Request: GET /api/expenses/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Optional<Expense> expense = expenseService.getExpenseById(id);

        if (expense.isPresent()) {
            return new ResponseEntity<>(expense.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // --- 4. UPDATE (PUT) ---
    // Request: PUT /api/expenses/{id}
    @PutMapping("/expenses/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expenseDetails
    ) {
        // Service mein orElseThrow ka use hua hai, isliye hum try-catch block use karenge
        try {
            Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
            return ResponseEntity.ok(updatedExpense);
        } catch (Exception e) {
            // Agar ExpenseTrackerException throw hota hai, toh 404 Not Found return karein
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // --- 5. DELETE (DELETE) ---
    // Request: DELETE /api/expenses/{id}
    @DeleteMapping("/expenses/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);

        // Success: 204 No Content return kiya jaata hai
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // ExpenseController.java
//    @PutMapping("/api/expenses/{id}")
//    public ResponseEntity<Expense>updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails){
//        try{
//            Expense updatedExpense(id, expenseDetails);
//            return ResponseEntity.ok(updatedExpense );
//        }
//        catch (Exception e){
//            return new ResponseEntity<>(<?(HttpStatus.NOT_FOUND);
//        }
    }

