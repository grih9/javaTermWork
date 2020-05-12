package ru.spbstu.termWork.repository;

import ru.spbstu.termWork.entity.Articles;

import org.springframework.data.repository.CrudRepository;

public interface ArticlesRepository extends CrudRepository<Articles, Long> {
}
