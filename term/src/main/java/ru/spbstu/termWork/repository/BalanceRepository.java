package ru.spbstu.termWork.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.termWork.entity.Balance;

public interface BalanceRepository extends CrudRepository<Balance, Long> {
}
