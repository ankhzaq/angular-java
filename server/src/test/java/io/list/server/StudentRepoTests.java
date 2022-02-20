package io.list.server;

import io.list.server.enumeration.Levels;
import io.list.server.model.Student;
import io.list.server.model.User;
import io.list.server.repo.StudentRepo;
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
class StudentRepoTests {

	@Test
	public void save_student() {
		StudentRepo mockStudentRepo = mock(StudentRepo.class);
		Student student = new Student(1L,"mock1",true, Levels.A1,"mock4","mock5","mock6","mock7",1);

		when(mockStudentRepo.save(student)).thenReturn(student);
		assertEquals(mockStudentRepo.save(student), student);
	}
}
