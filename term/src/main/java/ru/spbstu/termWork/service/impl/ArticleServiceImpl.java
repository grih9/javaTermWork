package ru.spbstu.termWork.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;
import ru.spbstu.termWork.exception.ArticleNotFoundException;
import ru.spbstu.termWork.repository.ArticleRepository;
import ru.spbstu.termWork.service.ArticleService;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public Article addArticles(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public void delete(Long id) {
        try {
            articleRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ArticleNotFoundException("Can't delete. Article with this id is not found");
        }
    }

    @Override
    public Article getByName(String name) {
        Article optionalArticle = articleRepository.findByName(name);
        if (optionalArticle != null) {
            return optionalArticle;
        } else {
            throw new ArticleNotFoundException("Article is not found by name");
        }
    }

    @Override
    public Article findArticles(Long id) {
        Optional<Article> optionalArticles = articleRepository.findById(id);

        if (optionalArticles.isPresent()) {
            return optionalArticles.get();
        } else {
            throw new ArticleNotFoundException("Article is not found by id");
        }
    }


    @Override
    public Article update(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public List<Article> articlesList() {
        return (List<Article>) articleRepository.findAll();
    }


}
