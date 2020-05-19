package ru.spbstu.termWork.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;

import java.util.List;

public interface OperationRepository extends CrudRepository<Operation, Long> {
    List<Operation> findOperationByBalance(Balance balance);
    List<Operation> findOperationByArticle(Article article);
}
