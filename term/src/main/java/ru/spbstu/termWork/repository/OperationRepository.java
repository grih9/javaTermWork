package ru.spbstu.termWork.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;

import java.util.List;

public interface OperationRepository extends CrudRepository<Operation, Long> {
    List<Operation> findOperationByBalance(Balance balance);
    List<Operation> findOperationByArticle(Article article);
    List<Operation> findAllByOrderByCreateDateAsc();
}
