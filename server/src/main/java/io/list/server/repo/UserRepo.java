package io.list.server.repo;

import io.list.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :email and u.password= :password")
    public User findUserByEmailPass(@Param("email") String email,@Param("password") String password);
}



