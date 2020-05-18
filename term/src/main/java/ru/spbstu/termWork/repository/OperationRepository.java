package ru.spbstu.termWork.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.termWork.entity.Operation;

public interface OperationRepository extends CrudRepository<Operation, Long> {
}
