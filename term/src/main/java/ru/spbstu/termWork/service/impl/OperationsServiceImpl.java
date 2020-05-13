package ru.spbstu.termWork.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Operations;
import ru.spbstu.termWork.exception.OperationNotFoundException;
import ru.spbstu.termWork.repository.OperationsRepository;
import ru.spbstu.termWork.service.OperationsService;

import java.util.List;
import java.util.Optional;

@Service
public class OperationsServiceImpl implements OperationsService {

    private final OperationsRepository operationsRepository;

    @Autowired
    public OperationsServiceImpl(OperationsRepository operationsRepository) {
        this.operationsRepository = operationsRepository;
    }

    @Override
    public Operations addOperations(Operations operations) {
        return operationsRepository.save(operations);
    }

    @Override
    public void delete(Long id) {
        try {
            operationsRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new OperationNotFoundException("Can't delete. Operation with this id is not found");
        }
    }

    @Override
    public Operations findOperations(Long id) {
        Optional<Operations> optionalArticles = operationsRepository.findById(id);

        if (optionalArticles.isPresent()) {
            return optionalArticles.get();
        } else {
            throw new OperationNotFoundException("Operation is not found by id");
        }
    }

    @Override
    public Operations update(Operations operations) {
        return operationsRepository.save(operations);
    }

    @Override
    public List<Operations> operationsList() {
        return (List<Operations>) operationsRepository.findAll();
    }
}
