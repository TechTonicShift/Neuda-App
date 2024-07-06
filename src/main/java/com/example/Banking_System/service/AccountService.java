package com.example.Banking_System.service;
import java.util.ArrayList;

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
    
//    public Account deposit(String accountNumber, double amount) {
//        Account account = accountRepository.findByAccountNumber(accountNumber);
//        if (account != null) {
//            account.setBalance(account.getBalance() + amount);
//
//            Transaction transaction = new Transaction();
//            transaction.setType("DEPOSIT");
//            transaction.setAmount(amount);
//            transaction.setTimestamp(LocalDateTime.now().toString());
//
//            // Ensure transactions list is initialized before adding
//            if (account.getTransactions() == null) {
//                account.setTransactions(new ArrayList<>());
//            }
//            account.getTransactions().add(transaction);
//
//            return accountRepository.save(account);
//        } else {
//            throw new RuntimeException("Account not found");
//        }
//    }

//    public Account withdraw(String accountNumber, double amount) {
//        Account account = getAccountByNumber(accountNumber);
//        if (account != null && account.getBalance() >= amount) {
//            account.setBalance(account.getBalance() - amount);
//
//            Transaction transaction = new Transaction();
//            transaction.setType("WITHDRAW");
//            transaction.setAmount(amount);
//            transaction.setTimestamp(LocalDateTime.now().toString());
//
//            // Ensure transactions list is initialized before adding
//            if (account.getTransactions() == null) {
//                account.setTransactions(new ArrayList<>());
//            }
//            account.getTransactions().add(transaction);
//
//            return accountRepository.save(account);
//        } else {
//            throw new RuntimeException("Insufficient funds or account not found");
//        }
//    }
    
    public Account deposit(String accountNumber, double amount) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        if (account != null) {
            account.setBalance(account.getBalance() + amount);

            Transaction transaction = new Transaction();
            transaction.setType("DEPOSIT");
            transaction.setAmount(amount);
            transaction.setTimestamp(LocalDateTime.now().toString());

            // Ensure transactions list is initialized before adding
            if (account.getTransactions() == null) {
                account.setTransactions(new ArrayList<>());
            }
            account.getTransactions().add(transaction);

            // Save the modified account
            return accountRepository.save(account);
        } else {
            throw new RuntimeException("Account not found");
        }
    }
    
    public Account withdraw(String accountNumber, double amount) {
        Account account = getAccountByNumber(accountNumber);
        if (account != null && account.getBalance() >= amount) {
            account.setBalance(account.getBalance() - amount);

            Transaction transaction = new Transaction();
            transaction.setType("WITHDRAW");
            transaction.setAmount(amount);
            transaction.setTimestamp(LocalDateTime.now().toString());

            // Ensure transactions list is initialized before adding
            if (account.getTransactions() == null) {
                account.setTransactions(new ArrayList<>());
            }
            account.getTransactions().add(transaction);

            // Save the modified account
            return accountRepository.save(account);
        } else {
            throw new RuntimeException("Insufficient funds or account not found");
        }
    }


    public List<Transaction> getTransactionHistory(String accountNumber) {
        Account account = getAccountByNumber(accountNumber);
        return account.getTransactions();
    }

//    public double checkBalance(String accountNumber) {
//        Account account = getAccountByNumber(accountNumber);
//        return account.getBalance();
//    }
    
    public double checkBalance(String accountNumber) {
        Account account = accountRepository.findByAccountNumber(accountNumber);
        if (account != null) {
            return account.getBalance();
        } else {
            throw new RuntimeException("Account not found"); // Handle case when account is not found
        }
    }

//    public void transferFunds(String fromAccount, String toAccount, double amount) {
//        withdraw(fromAccount, amount);
//        deposit(toAccount, amount);
//    }
    
    public void transferFunds(String fromAccountNumber, String toAccountNumber, double amount) {
        // Withdraw from the sender account
        Account senderAccount = withdraw(fromAccountNumber, amount);

        // Deposit into the receiver account
        deposit(toAccountNumber, amount);
    }

}
