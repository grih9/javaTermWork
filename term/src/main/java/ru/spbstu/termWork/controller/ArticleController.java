package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.exception.ArticleNotFoundException;
import ru.spbstu.termWork.service.ArticleService;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private ArticleService articleService;

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Article> addArticle(@Valid @RequestBody Article newArticle) {
        return new ResponseEntity<>(articleService.addArticles(newArticle), HttpStatus.CREATED);
    }

    @PutMapping(value = "/id/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Article> updateById(@PathVariable Long id, @Valid @RequestBody Article article) {
        if (!id.equals(article.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(articleService.update(article), HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity deletebyId(@PathVariable Long id) {
        try {
            articleService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> list = articleService.articlesList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(articleService.findArticles(id), HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Article> getArticleByName(@PathVariable("name") String name) {
        try {
            return new ResponseEntity<>(articleService.getByName(name), HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping(value = "/name/{name}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Article> updateByName(@PathVariable String name, @Valid @RequestBody Article article) {
        if (!articleService.findArticles(article.getId()).getName().equals(name)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(articleService.update(article), HttpStatus.OK);
    }

    @DeleteMapping("/name/{name}")
    public ResponseEntity<Article> deletebyName(@PathVariable String name) {
        try {
            articleService.delete(articleService.getByName(name).getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ArticleNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Autowired
    public void setArticleService(ArticleService articleService) {
        this.articleService = articleService;
    }
}
