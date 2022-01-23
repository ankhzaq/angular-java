package io.list.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = AUTO)
  private Long id;

  @Column(name="email")
  private String email;
  @Column(name="username")
  private String username;
  @Column(name="password")
  private String password;

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }
}