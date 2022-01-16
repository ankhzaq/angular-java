package io.list.server.service.implementation;

import io.list.server.model.User;
import io.list.server.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.Collection;

import static java.lang.Boolean.TRUE;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class UserServiceImpl {

    private final UserRepo userRepo;

    public Collection<User> users(Integer limit) {
        log.info("Fetching all users");
        return userRepo.findAll(PageRequest.of(0, limit)).toList();
    }

    public User findUserByEmail(String email) {
        log.info("Fetching user with the email: " + email);
        return userRepo.findByEmail(email);
    }

    public User createUser(User user) {
        log.info("Register new user");
        return userRepo.save(user);
    }

    public Boolean deleteUser(Long id) {
        log.info("Delete user");
        userRepo.deleteById(id);
        return TRUE;
    }
}
