package io.list.server.service.implementation;

import io.list.server.model.User;
import io.list.server.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;

import static java.lang.Boolean.TRUE;



@Service
@Slf4j
public class UserServiceImpl {

    @Autowired
    UserRepo userRepo;

    public Collection<User> users(Integer limit) {
        log.info("Fetching all users");
        return userRepo.findAll(PageRequest.of(0, limit)).toList();
    }

    public User findUserByEmailPass(String email, String password) {
        return userRepo.findUserByEmailPass(email, password);
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
