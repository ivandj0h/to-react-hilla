package com.example.application.endpoints;

import com.example.application.entity.Todo;
import com.example.application.repository.TodoRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class TodoEndpoint {

    private final TodoRepository repository;

    TodoEndpoint(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    public Todo createTodo(String task) {
        return repository.save(new Todo(task));
    }

    public Todo updateTodoDone(Long id, boolean done) {
        Todo todo = repository.findById(id).orElseThrow();
        todo.setDone(done);
        return repository.save(todo);
    }
}
