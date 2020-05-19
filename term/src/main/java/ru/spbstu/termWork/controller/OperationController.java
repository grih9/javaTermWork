package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.entity.Operation;
import ru.spbstu.termWork.exception.OperationNotFoundException;
import ru.spbstu.termWork.service.ArticleService;
import ru.spbstu.termWork.service.BalanceService;
import ru.spbstu.termWork.service.OperationService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/operations")
public class OperationController {

    @Autowired
    private OperationService operationService;

    @Autowired
    private BalanceService balanceService;

    @Autowired
    private ArticleService articleService;

    @GetMapping("/all")
    public ResponseEntity<List<Operation>> getAllBalance() {
        List<Operation> list = operationService.operationsList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Operation> getOperation(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(operationService.findOperations(id), HttpStatus.OK);
        } catch (OperationNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/balance/{id}")
    public ResponseEntity<List<Operation>> getOperationByBalanceId(@PathVariable("id") Long id) {
        Balance balance = balanceService.findBalance(id);
        try {
            return new ResponseEntity<>(operationService.findOperationByBalance(balance), HttpStatus.OK);
        } catch (OperationNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/article/{id}")
    public ResponseEntity<List<Operation>> getOperationByArticleId(@PathVariable("id") Long id) {
        Article article = articleService.findArticles(id);
        try {
            return new ResponseEntity<>(operationService.findOperationByArticle(article), HttpStatus.OK);
        } catch (OperationNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public Operation addOperation(@RequestBody Operation newOperation) {
        return operationService.addOperations(newOperation);
    }

    @PutMapping(value = "/id/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Operation> updateOperaion(@PathVariable Long id, @Valid @RequestBody Operation operation) {
        if (!id.equals(operation.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(operationService.update(operation), HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            operationService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (OperationNotFoundException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

}
