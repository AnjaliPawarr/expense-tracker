package com.anjalipawar._7.ExpenseTracker.repository;
import com.anjalipawar._7.ExpenseTracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
//public class ExpenseRepository {
    public interface ExpenseRepository extends JpaRepository <Expense,Long>{

    }

