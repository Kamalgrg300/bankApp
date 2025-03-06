package com.kamal.controller;

import com.kamal.model.Transaction;
import com.kamal.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/{creditCardId}")
    public ResponseEntity<List<Transaction>> getTransactionsByCreditCardId(@PathVariable Long creditCardId) {
        List<Transaction> transactions = transactionService.getTransactionsByCreditCardId(creditCardId);
        return ResponseEntity.ok(transactions);
    }
}
