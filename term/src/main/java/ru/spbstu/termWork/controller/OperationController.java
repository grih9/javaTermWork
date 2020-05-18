package ru.spbstu.termWork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.termWork.service.OperationService;

@RestController
@RequestMapping("/operations")
public class OperationController {

    private OperationService operationService;

    @Autowired
    public void setOperationService(OperationService operationService) {
        this.operationService = operationService;
    }
}
