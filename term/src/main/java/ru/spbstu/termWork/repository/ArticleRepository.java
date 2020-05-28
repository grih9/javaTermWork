package ru.spbstu.termWork.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ru.spbstu.termWork.entity.Article;

import java.util.List;

public interface ArticleRepository extends CrudRepository<Article, Long> {
    List<Article> findAllByOrderByNameAsc();

    @Query("select b from Article b where b.name = :name")
    Article findByName(@Param("name") String name);
}
