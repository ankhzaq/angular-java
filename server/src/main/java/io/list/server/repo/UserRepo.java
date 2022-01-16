package io.list.server.repo;

import io.list.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User, Long> {

    public User findByEmail(@Param(value = "email") String email);

}



