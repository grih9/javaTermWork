package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.termWork.service.OperationsService;

@RestController
@RequestMapping("/operations")
public class OperationsController {

    private OperationsService operationsService;

    @Autowired
    public void setOperationsService(OperationsService operationsService) {
        this.operationsService = operationsService;
    }
}
