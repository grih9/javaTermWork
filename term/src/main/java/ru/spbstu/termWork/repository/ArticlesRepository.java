package ru.spbstu.termWork.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.spbstu.termWork.entity.Articles;
import org.springframework.data.repository.CrudRepository;

public interface ArticlesRepository extends CrudRepository<Articles, Long> {
//    @Query("select b from Articles b where b.name = :name")
//    Articles findByName(@Param("name") String name);
}
