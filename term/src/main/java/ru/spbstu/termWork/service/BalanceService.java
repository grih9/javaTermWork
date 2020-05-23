package ru.spbstu.termWork.service;

import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;

import java.util.List;

public interface BalanceService {
    Balance addBalnce(Balance balance);
    void delete(Long id);
    Balance findBalance(Long id);
    Balance update(Balance balance);
    List<Balance> balanceList();
    List<Balance> findAllByOrderByCreateDateAsc();
}
