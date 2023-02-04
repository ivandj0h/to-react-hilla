import {useEffect, useState} from "react";
import Todo from "Frontend/generated/com/example/application/entity/Todo.js";
import {TodoEndpoint} from "Frontend/generated/endpoints.js";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {Checkbox} from "@hilla/react-components/Checkbox.js";

export function TodoView() {

    const [todos, setTodos] = useState<Todo[]>([])
    const [task, setTask] = useState('')


    useEffect(() => {
        TodoEndpoint.getAllTodos().then(setTodos)
    }, []);


    async function addTodo() {
        const saved = await TodoEndpoint.createTodo(task)
        if (saved) {
            setTodos([...todos, saved])
            setTask('')
        }
    }

    async function updateTodo(todo:Todo , done: boolean) {
       const saved = await TodoEndpoint.updateTodoDone({
           ...todo, done
       });
        if (saved) {
            setTodos(todos.map(t => t.id === todo.id ? saved : t))
        }

    }

    return (
        <div className="p-m">
            <h3>Te React Hilla - TodoApp</h3>
            <div className="flex gap-m">
                <TextField value={task} onChange={e => setTask(e.target.value)}/>
                <Button theme="primary" onClick={addTodo}>Add Todo</Button>
            </div>

            {todos.map(todo => (
                <div key={todo.id}>
                    <Checkbox checked={todo.done} onCheckedChanged={e => updateTodo(todo, e.target.value)} />
                    <span>{todo.task}</span>
                </div>
            ))}

        </div>
    )
}