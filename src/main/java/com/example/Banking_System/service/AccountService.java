package com.example.Banking_System.service;

import com.example.Banking_System.model.Account;
import com.example.Banking_System.model.Transaction;
import com.example.Banking_System.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    public Account deposit(String accountNumber, double amount) {
        Account account = getAccountByNumber(accountNumber);
        account.setBalance(account.getBalance() + amount);

        Transaction transaction = new Transaction();
        transaction.setType("DEPOSIT");
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now().toString());

        account.getTransactions().add(transaction);
        return accountRepository.save(account);
    }

    public Account withdraw(String accountNumber, double amount) {
        Account account = getAccountByNumber(accountNumber);
        if (account.getBalance() >= amount) {
            account.setBalance(account.getBalance() - amount);

            Transaction transaction = new Transaction();
            transaction.setType("WITHDRAW");
            transaction.setAmount(amount);
            transaction.setTimestamp(LocalDateTime.now().toString());

            account.getTransactions().add(transaction);
            return accountRepository.save(account);
        } else {
            throw new RuntimeException("Insufficient funds");
        }
    }

    public List<Transaction> getTransactionHistory(String accountNumber) {
        Account account = getAccountByNumber(accountNumber);
        return account.getTransactions();
    }

    public double checkBalance(String accountNumber) {
        Account account = getAccountByNumber(accountNumber);
        return account.getBalance();
    }

    public void transferFunds(String fromAccount, String toAccount, double amount) {
        withdraw(fromAccount, amount);
        deposit(toAccount, amount);
    }
}
