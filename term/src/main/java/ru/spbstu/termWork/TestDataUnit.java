package ru.spbstu.termWork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.entity.User;
import ru.spbstu.termWork.repository.ArticlesRepository;
import ru.spbstu.termWork.repository.UserRepository;

import java.util.Collections;

@Component
public class TestDataUnit implements CommandLineRunner {

    @Autowired
    ArticlesRepository articlesRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        articlesRepository.save(new Articles("Article1"));
        articlesRepository.save(new Articles("Article2"));

        userRepository.save(new User("user", passwordEncoder.encode("pwd"),
                Collections.singletonList("ROLE_USER")));
        userRepository.save(new User("admin", passwordEncoder.encode("apwd"),
                Collections.singletonList("ROLE_ADMIN")));
    }
}
