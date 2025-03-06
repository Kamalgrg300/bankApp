package com.kamal.repository;

import com.kamal.model.Account;
import com.kamal.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(Long userId);
    List<Account> findByEmail(String email);
    List<Account> findByAccountType(AccountType accountType);
}
