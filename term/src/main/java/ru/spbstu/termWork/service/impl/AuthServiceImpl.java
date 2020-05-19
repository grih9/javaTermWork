package ru.spbstu.termWork.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.spbstu.termWork.controller.AuthRequest;
import ru.spbstu.termWork.entity.User;
import ru.spbstu.termWork.repository.UserRepository;
import ru.spbstu.termWork.security.jwt.JwtTokenProvider;
import ru.spbstu.termWork.service.AuthService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Override
    public Map<Object, Object> signIn(AuthRequest request) {
        String name = request.getUserName();
        String password = request.getPassword();
        String token = jwtTokenProvider.createToken(
                name, password,
                userRepository.findUserByUserName(name)
                        .orElseThrow(() -> new UsernameNotFoundException("User is not found")).getRoles());

        Map<Object, Object> model = new HashMap<>();
        model.put("userName", name);
        model.put("token", token);

        return model;
    }

    @Override
    public User signUp(AuthRequest request) {
        String name = request.getUserName();
        String password = request.getPassword();
        if (userRepository.findUserByUserName(name).isPresent()) {
            return null;
        }

        User user = new User(name, passwordEncoder.encode(password), Collections.singletonList("ROLE_USER"));
        userRepository.save(user);
        return user;
    }

}
