import express from 'express';
import todo_controller from '../controllers/todo_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';

const route = express.Router();

route.use(auth_middleware.authenticateJWT);

route.get('/todo/search', todo_controller.searchTodos);
route.get('/todo', todo_controller.getTodos);
route.get('/todo/:id', todo_controller.getTodo);
route.post('/todo', todo_controller.postTodo);
route.put('/todo/:id', todo_controller.updateTodo);
route.delete('/todo/:id', todo_controller.deleteTodo);

export default {
    route
}