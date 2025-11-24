package com.anjalipawar._7.ExpenseTracker.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Field name ko Java convention ke mutabik 'id' rakhein.

    private String  name;        // Kharch ka naam (e.g., "Groceries")
    private Double amount;      // Kitna kharch hua
    private String category;    // Category (e.g., "Food", "Travel")
    private String description;
    private LocalDate date;     // Kis din kharch hua

    // --- 1. Default Constructor (Zaroori for JPA) ---
    public Expense() {}

    // --- 2. Getters and Setters (Public honi chahiye) ---

    // ID
    public Long getId() {
        return id;
    }

    // Setter should be void and accept the parameter.
    public void setId(Long id) {
        this.id = id;
    }

    // Name
    public String getName() {
        return name;
    }

    // Setter should be void and accept the parameter.
    public void setName(String name) {
        this.name = name;
    }

    // Description
    public String getDescription() {
        return description;
    }

    // Setter should be void and accept the parameter.
    public void setDescription(String description) {
        this.description = description;
    }

    // Amount
    public Double getAmount() {
        return amount;
    }

    // Setters should use Double (wrapper) if the field is Double, or simply use double (primitive).
    // Yahaan field Double hai, toh Double use karna behtar hai for null safety.
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    // Category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    // Date
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}