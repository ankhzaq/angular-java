package io.list.server.resource;

import javax.validation.Valid;

import static java.time.LocalDateTime.now;

import static java.util.Map.of;

import io.list.server.model.AGGrid;
import io.list.server.model.Student;
import io.list.server.model.User;
import io.list.server.service.implementation.AGGridServiceImpl;
import io.list.server.service.implementation.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import io.list.server.model.Response;
import io.list.server.service.implementation.ServerServiceImpl;

import java.util.Optional;

@RestController
@RequestMapping("/server")
public class ServerResource {
    private final ServerServiceImpl serverService;
    private final AGGridServiceImpl agGridService;
    private final UserServiceImpl userService;

    public ServerResource(ServerServiceImpl serverService, AGGridServiceImpl agGridService, UserServiceImpl userService) {
        this.serverService = serverService;
        this.agGridService = agGridService;
        this.userService = userService;
    }

    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<Response> deleteStudent(@PathVariable("id") Long id) {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("students", serverService.deleteStudent(id)))
                .message("Server deleted")
                .status(OK)
                .statusCode(OK.value())
                .build());
    }

    @PostMapping("/saveStudent")
    public ResponseEntity<Response> saveStudentServer(@RequestBody
                                               @Valid Student student) {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("student", serverService.createStudent(student)))
                .message("Server created")
                .status(CREATED)
                .statusCode(CREATED.value())
                .build());
    }

    @PatchMapping("/updateStudent")
    public ResponseEntity<Response> updateStudentServer(@RequestBody
                                                      @Valid Student student) {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("students", serverService.updateStudent(student)))
                .message("Student updated")
                .status(CREATED)
                .statusCode(CREATED.value())
                .build());
    }

    @GetMapping("/listStudents")
    public ResponseEntity<Response> getStudents() throws InterruptedException {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("students", serverService.students(50)))
                .message("Servers retrieved")
                .status(OK)
                .statusCode(OK.value())
                .build());
    }

    @GetMapping("/agGridInfo")
    public ResponseEntity<Response> getAGGridInfo() throws InterruptedException {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("agGrid", agGridService.getInfo()))
                .message("agGrid info retrieved")
                .status(OK)
                .statusCode(OK.value())
                .build());
    }

    // Endpoint to update columns and other information about AGGrid (frontend component)
    @PatchMapping("/updateAGGridInfo")
    public ResponseEntity<Response> updateAGGridInfo(@RequestBody
                                                         @Valid AGGrid aggrid) throws InterruptedException {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("agGrid", agGridService.updateAGGrid(aggrid)))
                .message("agGrid info retrieved")
                .status(CREATED)
                .statusCode(CREATED.value())
                .build());
    }

    @GetMapping("/users")
    public ResponseEntity<Response> getUsers() throws InterruptedException {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("users", userService.users(50)))
                .message("Users retrieved")
                .status(OK)
                .statusCode(OK.value())
                .build());
    }

    @GetMapping("/user")
    public ResponseEntity<Response> findUserByEmailPass(@RequestParam("email") String email, @RequestParam("password") String password) throws InterruptedException {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("user", userService.findUserByEmailPass(email, password)))
                .message("user retrieved")
                .status(OK)
                .statusCode(OK.value())
                .build());
    }

    @PostMapping("/user")
    public ResponseEntity<Response> saveStudentServer(@RequestBody
                                                      @Valid User user) {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("user", userService.createUser(user)))
                .message("User created")
                .status(CREATED)
                .statusCode(CREATED.value())
                .build());
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Response> deleteUser(@PathVariable("id") Long id) {
        return ResponseEntity.ok(Response.builder()
                .timeStamp(now())
                .data(of("users", userService.deleteUser(id)))
                .message("User deleted")
                .status(OK)
                .statusCode(OK.value())
                .build());
    }
}