package ru.spbstu.termWork.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;

import java.util.List;

public interface BalanceRepository extends CrudRepository<Balance, Long> {
    List<Balance> findAllByOrderByCreateDateAsc();
}
