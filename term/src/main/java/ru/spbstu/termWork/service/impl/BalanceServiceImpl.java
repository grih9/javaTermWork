package ru.spbstu.termWork.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;
import ru.spbstu.termWork.exception.BalanceNotFoundException;
import ru.spbstu.termWork.repository.BalanceRepository;
import ru.spbstu.termWork.service.BalanceService;

import java.util.List;
import java.util.Optional;

@Service
public class BalanceServiceImpl implements BalanceService {

    private final BalanceRepository balanceRepository;

    @Autowired
    public BalanceServiceImpl(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    @Override
    public Balance addBalnce(Balance balance) {
        return balanceRepository.save(balance);
    }

    @Override
    public void delete(Long id) {
        try {
            balanceRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new BalanceNotFoundException("Can't delete. Balance with this id is not found");
        }
    }

    @Override
    public Balance findBalance(Long id) {
        Optional<Balance> optionalBalance = balanceRepository.findById(id);

        if (optionalBalance.isPresent()) {
            return optionalBalance.get();
        } else {
            throw new BalanceNotFoundException("Balance is not found by id");
        }
    }

    @Override
    public Balance update(Balance balance) {
        return balanceRepository.save(balance);
    }

    @Override
    public List<Balance> balanceList() {
        return (List<Balance>) balanceRepository.findAll();
    }
}
