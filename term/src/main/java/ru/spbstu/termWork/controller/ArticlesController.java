package ru.spbstu.termWork.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.termWork.service.ArticlesService;
import ru.spbstu.termWork.service.BalanceService;

@RestController
@RequestMapping("/ac")
public class ArticlesController {
    private BalanceService balanceService;
    private ArticlesService articlesService;

}
