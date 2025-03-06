package com.kamal.service;

import com.kamal.model.CreditCard;
import com.kamal.model.Transaction;
import com.kamal.model.Transaction.TransactionType;
import com.kamal.repository.CreditCardRepository;
import com.kamal.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PaymentService {
    private final CreditCardRepository creditCardRepository;
    private final TransactionRepository transactionRepository;

    public PaymentService(CreditCardRepository creditCardRepository, TransactionRepository transactionRepository) {
        this.creditCardRepository = creditCardRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public String processPayment(String cardNumber, double amount, String description) {
        Optional<CreditCard> optionalCreditCard = creditCardRepository.findByCardNumber(cardNumber);
        if (optionalCreditCard.isEmpty()) {
            return "Credit card not found";
        }
        
        CreditCard creditCard = optionalCreditCard.get();
        if (creditCard.getBalance() < amount) {
            return "Insufficient balance";
        }
        
        creditCard.setBalance(creditCard.getBalance() - amount);
        creditCardRepository.save(creditCard);
        
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setType(TransactionType.PAYMENT);
        transaction.setCreditCard(creditCard);
        transactionRepository.save(transaction);
        
        return "Payment of " + amount + " processed successfully";
    }
}
