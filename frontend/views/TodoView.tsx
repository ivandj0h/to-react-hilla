import {useEffect, useState} from "react";
import Todo from "Frontend/generated/com/example/application/entity/Todo.js";
import {TodoEndpoint} from "Frontend/generated/endpoints.js";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";

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

    return (
        <div className="p-m">
            <h3>Te React Hilla - TodoApp</h3>
            <div className="flex gap-m">
                <TextField value={task} onChange={ev => setTask(ev.target.value)} />
                <Button theme="primary" onClick={addTodo}>Add Todo</Button>
            </div>
        </div>
    )
}