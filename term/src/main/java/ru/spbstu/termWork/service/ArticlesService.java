package ru.spbstu.termWork.service;

import ru.spbstu.termWork.entity.Articles;

import java.util.List;

public interface ArticlesService {
    List<Articles> articlesList();
    Articles findArticles(long id);
}
