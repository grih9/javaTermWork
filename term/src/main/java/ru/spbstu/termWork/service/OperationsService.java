package ru.spbstu.termWork.service;

import ru.spbstu.termWork.entity.Operations;

import java.util.List;

public interface OperationsService {
    Operations addOperations(Operations operations);
    void delete(Long id);
    Operations findOperations(Long id);
    Operations update(Operations operations);
    List<Operations> operationsList();
}
