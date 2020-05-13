package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.termWork.entity.Balance;
import ru.spbstu.termWork.service.BalanceService;

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

    @Autowired
    public void setBalanceService(BalanceService balanceService) {
        this.balanceService = balanceService;
    }



}
