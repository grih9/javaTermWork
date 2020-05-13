package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.service.ArticlesService;


import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticlesController {

    @Autowired
    private ArticlesService articlesService;

    @GetMapping("/all")
    public List<Articles> getAllArticles() {
        return articlesService.articlesList();
    }

}
