package com.kamal.controller;

import com.kamal.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestBody Map<String, Object> requestData) {
        String cardNumber = requestData.get("cardNumber").toString();
        double amount = Double.parseDouble(requestData.get("amount").toString());
        String description = requestData.get("description").toString();
        
        String response = paymentService.processPayment(cardNumber, amount, description);
        return ResponseEntity.ok(response);
    }
}
