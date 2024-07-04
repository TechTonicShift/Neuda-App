package com.example.Banking_System.controller;

import com.example.Banking_System.model.Account;
import com.example.Banking_System.model.Transaction;
import com.example.Banking_System.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping("/balance/{accountNumber}")
    public double checkBalance(@PathVariable String accountNumber) {
        return accountService.checkBalance(accountNumber);
    }

    @PostMapping("/deposit")
    public Account deposit(@RequestParam String accountNumber, @RequestParam double amount) {
        return accountService.deposit(accountNumber, amount);
    }

    @PostMapping("/withdraw")
    public Account withdraw(@RequestParam String accountNumber, @RequestParam double amount) {
        return accountService.withdraw(accountNumber, amount);
    }

    @PostMapping("/transfer")
    public void transferFunds(@RequestParam String fromAccount, @RequestParam String toAccount, @RequestParam double amount) {
        accountService.transferFunds(fromAccount, toAccount, amount);
    }

    @GetMapping("/transactions/{accountNumber}")
    public List<Transaction> getTransactionHistory(@PathVariable String accountNumber) {
        return accountService.getTransactionHistory(accountNumber);
    }
}