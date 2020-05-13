package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.exception.ArticleNotFoundException;
import ru.spbstu.termWork.service.ArticlesService;
import javax.validation.Valid;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticlesController {

    private ArticlesService articlesService;

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Articles> addArticle(@Valid @RequestBody Articles newArticle) {
        return new ResponseEntity<>(articlesService.addArticles(newArticle), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Articles> updateById(@PathVariable Long id, @Valid @RequestBody Articles article) {
        if (!id.equals(article.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(articlesService.update(article), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Articles> deletebyId(@PathVariable Long id) {
        try {
            articlesService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Articles>> getAllArticles() {
        List<Articles> list = articlesService.articlesList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Articles> getArticleById(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(articlesService.findArticles(id), HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Articles> getArticleByName(@PathVariable("name") String name) {
        try {
            return new ResponseEntity<>(articlesService.getByName(name), HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping(value = "name/{name}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Articles> updateByName(@PathVariable String name, @Valid @RequestBody Articles article) {
        if (!articlesService.findArticles(article.getId()).getName().equals(name)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(articlesService.update(article), HttpStatus.OK);
    }

    @DeleteMapping("name/{name}")
    public ResponseEntity<Articles> deletebyName(@PathVariable String name) {
        try {
            articlesService.delete(articlesService.getByName(name).getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Autowired
    public void setArticlesService(ArticlesService articlesService) {
        this.articlesService = articlesService;
    }

}
