package ru.spbstu.termWork.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.repository.ArticlesRepository;
import ru.spbstu.termWork.repository.BalanceRepository;
import ru.spbstu.termWork.service.BalanceService;

import java.util.List;

public class BalanceServiceImpl implements BalanceService {

    private final BalanceRepository balanceRepository;

    @Autowired
    public BalanceServiceImpl(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    @Override
    public Balance addBalnce(Balance balance) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Balance findBalance(Long id) {
        return null;
    }

    @Override
    public Balance update(Balance balance) {
        return null;
    }

    @Override
    public List<Balance> articlesList() {
        return null;
    }
}
