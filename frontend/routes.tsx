import {createBrowserRouter} from 'react-router-dom';
import {TodoView} from "Frontend/views/TodoView";

const router = createBrowserRouter([
    {
        path: '/', element: <TodoView/>,
    }
]);
export default router;
