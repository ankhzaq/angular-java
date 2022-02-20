package io.list.server;

import io.list.server.model.User;
import io.list.server.repo.UserRepo;
import io.list.server.service.implementation.UserServiceImpl;
import org.junit.jupiter.api.Test;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserServiceTests {

	@Test
	public void should_return_list_usernames() {
		UserServiceImpl mockUserService = mock(UserServiceImpl.class);

		User usernameMock = new User(10L, "mock1@gmail.com", "mock1", "pass1");

		ArrayList<User> users = new ArrayList<User>();
		users.add(usernameMock);

		when(mockUserService.users(10)).thenReturn(Arrays.asList(usernameMock));

		Collection<User> expected = mockUserService.users(10);
		assertEquals(expected, users);
	}

	@Test
	public void repo_user_check_findBy_username_password() {
		UserRepo mockUserRepo = mock(UserRepo.class);

		User usernameMock = new User(10L, "mock1@gmail.com", "mock1", "pass1");

		when(mockUserRepo.findUserByEmailPass("mock1@gmail.com", "pass1")).thenReturn(usernameMock);

		assertEquals(usernameMock, mockUserRepo.findUserByEmailPass("mock1@gmail.com", "pass1"));
		assertEquals(null, mockUserRepo.findUserByEmailPass("mock2@gmail.com", "pass1"));

	}

	@Test
	public void check_limit() {
		UserServiceImpl mockUserService = mock(UserServiceImpl.class);

		User usernameMock1 = new User(10L, "mock1@gmail.com", "mock1", "pass1");
		User usernameMock2 = new User(10L, "mock2@gmail.com", "mock2", "pass2");

		ArrayList<User> usersMock1 = new ArrayList<User>();
		ArrayList<User> usersMock2 = new ArrayList<User>();

		usersMock1.add(usernameMock1);
		usersMock1.add(usernameMock2);

		usersMock2.add(usernameMock2);

		when(mockUserService.users(2)).thenReturn(usersMock1);
		when(mockUserService.users(1)).thenReturn(usersMock2);

		assertEquals(usersMock1, mockUserService.users(2));
		assertEquals(usersMock2, mockUserService.users(1));
	}

}
