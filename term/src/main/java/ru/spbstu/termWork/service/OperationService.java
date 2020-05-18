package ru.spbstu.termWork.service;

import ru.spbstu.termWork.entity.Operation;

import java.util.List;

public interface OperationService {
    Operation addOperations(Operation operation);
    void delete(Long id);
    Operation findOperations(Long id);
    Operation update(Operation operation);
    List<Operation> operationsList();
}
