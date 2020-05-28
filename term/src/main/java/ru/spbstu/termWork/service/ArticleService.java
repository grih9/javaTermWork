package ru.spbstu.termWork.service;

import ru.spbstu.termWork.entity.Article;

import java.util.List;

public interface ArticleService {
    Article addArticles(Article article);
    void delete(Long id);
    Article getByName(String name);
    Article findArticles(Long id);
    Article update(Article article);
    List<Article> articlesList();
    List<Article> findAllByOrderByNameAsc();
}
