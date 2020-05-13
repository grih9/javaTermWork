package ru.spbstu.termWork.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.exception.ArticleNotFoundException;
import ru.spbstu.termWork.repository.ArticlesRepository;
import ru.spbstu.termWork.service.ArticlesService;

import java.util.List;
import java.util.Optional;

@Service
public class ArticlesServiceImpl implements ArticlesService {
    private final ArticlesRepository articlesRepository;

    @Autowired
    public ArticlesServiceImpl(ArticlesRepository articlesRepository) {
        this.articlesRepository = articlesRepository;
    }

    @Override
    public Articles addArticles(Articles articles) {
        return articlesRepository.save(articles);
    }

    @Override
    public void delete(Long id) {
        try {
            articlesRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ArticleNotFoundException("Can't delete. Article with this id is not found");
        }
    }

    @Override
    public Articles getByName(String name) {
        Articles optionalArticles = articlesRepository.findByName(name);
        if (optionalArticles != null) {
            return optionalArticles;
        } else {
            throw new ArticleNotFoundException("Article is not found by name");
        }
    }

    @Override
    public Articles findArticles(Long id) {
        Optional<Articles> optionalArticles = articlesRepository.findById(id);

        if (optionalArticles.isPresent()) {
            return optionalArticles.get();
        } else {
            throw new ArticleNotFoundException("Article is not found by id");
        }
    }

    @Override
    public Articles update(Articles articles) {
        return articlesRepository.save(articles);
    }

    @Override
    public List<Articles> articlesList() {
        return (List<Articles>) articlesRepository.findAll();
    }


}
