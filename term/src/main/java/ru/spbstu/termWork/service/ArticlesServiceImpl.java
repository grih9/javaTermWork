package ru.spbstu.termWork.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.repository.ArticlesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ArticlesServiceImpl implements ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;

    @Override
    public List<Articles> articlesList() {
        return (List<Articles>) articlesRepository.findAll();
    }

    @Override
    public Articles findArticles(long id) {
        Optional<Articles> optionalArticles = articlesRepository.findById(id);

        if (optionalArticles.isPresent()) {
            return optionalArticles.get();
        } else {
            throw new IllegalArgumentException();
        }
    }
}
