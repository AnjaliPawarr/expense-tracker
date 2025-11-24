package com.anjalipawar._7.ExpenseTracker.Exception;

public class ExpenseTrackerException extends RuntimeException
{
    private String message;
    public ExpenseTrackerException(){
        super();

    }
    public ExpenseTrackerException(String message){
        super(message);
        this.message = message;

    }
    @Override
    public String getMessage(){
        return  message;
    }
}
