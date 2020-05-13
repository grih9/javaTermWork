package ru.spbstu.termWork.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbstu.termWork.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserName(String username);
}
