package ru.spbstu.termWork.service;

import ru.spbstu.termWork.controller.AuthRequest;
import ru.spbstu.termWork.entity.User;

import java.util.Map;

public interface AuthService {
    Map<Object, Object> signIn(AuthRequest authRequest);
    User signUp(AuthRequest authRequest);
}
