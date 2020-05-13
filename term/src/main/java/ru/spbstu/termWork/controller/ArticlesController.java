package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.exception.ArticleNotFoundException;
import ru.spbstu.termWork.service.ArticlesService;


import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticlesController {

    private ArticlesService articlesService;

    @PostMapping(value = "/addArticle", consumes = "types/json", produces = "types/json")
    public Articles addArticle(@RequestBody Articles newArticle) {
        return articlesService.addArticles(newArticle);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Articles>> getAllArticles() {
        List<Articles> list = articlesService.articlesList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Articles> getArticle(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(articlesService.findArticles(id), HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Autowired
    public void setArticlesService(ArticlesService articlesService) {
        this.articlesService = articlesService;
    }

}
