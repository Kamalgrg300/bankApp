package com.kamal.controller;

import com.kamal.model.CreditCard;
import com.kamal.service.CreditCardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/creditcard")
public class CreditCardController {
    private final CreditCardService creditCardService;

    public CreditCardController(CreditCardService creditCardService) {
        this.creditCardService = creditCardService;
    }

    @GetMapping("/{cardNumber}")
    public ResponseEntity<?> getCreditCardByNumber(@PathVariable String cardNumber) {
        System.out.println("Authenticated User: " + SecurityContextHolder.getContext().getAuthentication());

        Optional<CreditCard> creditCard = creditCardService.getCreditCardByNumber(cardNumber);
        return creditCard.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
