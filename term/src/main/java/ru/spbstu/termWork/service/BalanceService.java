package ru.spbstu.termWork.service;

import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Balance;

import java.util.List;

public interface BalanceService {
    Balance addBalnce(Balance balance);
    void delete(Long id);
    Balance findBalance(Long id);
    Balance update(Balance balance);
    List<Balance> balanceList();
}
