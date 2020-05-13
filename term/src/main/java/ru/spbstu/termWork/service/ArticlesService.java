package ru.spbstu.termWork.service;

import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Articles;

import java.util.List;

public interface ArticlesService {
    Articles addArticles(Articles articles);
    void delete(Long id);
    Articles getByName(String name);
    Articles findArticles(Long id);
    Articles update(Articles articles);
    List<Articles> articlesList();
}
