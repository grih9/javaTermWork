package ru.spbstu.termWork.repository;

import org.springframework.data.repository.CrudRepository;
import ru.spbstu.termWork.entity.Operations;

public interface OperationsRepository extends CrudRepository<Operations, Long> {
}