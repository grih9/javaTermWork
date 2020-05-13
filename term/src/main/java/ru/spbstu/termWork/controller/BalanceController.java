package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.exception.BalanceNotFoundException;
import ru.spbstu.termWork.service.BalanceService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/balance")
public class BalanceController {

    private BalanceService balanceService;

    @GetMapping("/all")
    public ResponseEntity<List<Balance>> getAllBalance() {
        List<Balance> list = balanceService.balanceList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public Balance addBalance(@RequestBody Balance newBalance) {
        return balanceService.addBalnce(newBalance);
    }


    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Balance> addBalance(@PathVariable Long id, @Valid @RequestBody Balance balance) {
        if (!id.equals(balance.getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(balanceService.update(balance), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Balance> delete(@PathVariable Long id) {
        try {
            balanceService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BalanceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Balance> getBalance(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(balanceService.findBalance(id), HttpStatus.OK);
        } catch (BalanceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Autowired
    public void setBalanceService(BalanceService balanceService) {
        this.balanceService = balanceService;
    }
}
