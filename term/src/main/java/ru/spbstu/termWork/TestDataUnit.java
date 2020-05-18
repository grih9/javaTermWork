package ru.spbstu.termWork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.spbstu.termWork.entity.Article;
import ru.spbstu.termWork.entity.User;
import ru.spbstu.termWork.repository.ArticleRepository;
import ru.spbstu.termWork.repository.UserRepository;

import java.util.Collections;

@Component
public class TestDataUnit implements CommandLineRunner {

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        articleRepository.save(new Article("Article1"));
        articleRepository.save(new Article("Article2"));

        userRepository.save(new User("admin", passwordEncoder.encode("apwd"),
                Collections.singletonList("ROLE_ADMIN")));
    }
}
