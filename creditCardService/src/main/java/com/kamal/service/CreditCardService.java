package com.kamal.service;

import com.kamal.model.CreditCard;
import com.kamal.repository.CreditCardRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CreditCardService {
    private final CreditCardRepository creditCardRepository;

    public CreditCardService(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    public Optional<CreditCard> getCreditCardByNumber(String cardNumber) {
        return creditCardRepository.findByCardNumber(cardNumber);
    }

    public CreditCard saveCreditCard(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }
}
