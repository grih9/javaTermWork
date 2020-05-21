package ru.spbstu.termWork.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;
import ru.spbstu.termWork.exception.OperationNotFoundException;
import ru.spbstu.termWork.repository.ArticleRepository;
import ru.spbstu.termWork.repository.BalanceRepository;
import ru.spbstu.termWork.repository.OperationRepository;
import ru.spbstu.termWork.service.OperationService;

import java.util.List;
import java.util.Optional;

@Service
public class OperationServiceImpl implements OperationService {

    private final OperationRepository operationRepository;

    @Autowired
    private BalanceRepository balanceRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    public OperationServiceImpl(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    @Override
    public Operation addOperations(Operation operation) {
        return operationRepository.save(operation);
    }

    @Override
    public void delete(Long id) {
        try {
            operationRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new OperationNotFoundException("Can't delete. Operation with this id is not found");
        }
    }

    @Override
    public Operation findOperations(Long id) {
        Optional<Operation> optionalArticles = operationRepository.findById(id);

        if (optionalArticles.isPresent()) {
            return optionalArticles.get();
        } else {
            throw new OperationNotFoundException("Operation is not found by id");
        }
    }

    @Override
    public Operation update(Operation operation) {
        return operationRepository.save(operation);
    }

    @Override
    public List<Operation> operationsList() {
        return (List<Operation>) operationRepository.findAll();
    }

    @Override
    public List<Operation> findOperationByBalance(Balance balance) {
        List<Operation> operations = operationRepository.findOperationByBalance(balance);
        if (operations.size() != 0) {
            return operations;
        } else {
            throw new OperationNotFoundException("Operation is not found by balance_id");
        }
    }

    @Override
    public List<Operation> findOperationByArticle(Article article) {
        List<Operation> operations = operationRepository.findOperationByArticle(article);
        if (operations.size() != 0) {
            return operations;
        } else {
            throw new OperationNotFoundException("Operation is not found by article_id");
        }
    }
}
