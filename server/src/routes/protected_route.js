import express from 'express';
import todo_controller from '../controllers/todo_controller.js';
import user_controller from '../controllers/user_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';

const route = express.Router();

route.use(auth_middleware.authenticateJWT);

route.put('/user/update', user_controller.updateUser);
route.get('/user/:id', user_controller.getUser)
route.delete('/user/delete/:email', user_controller.deleteUser);

route.get('/todo/search', todo_controller.searchTodos);
route.get('/todo', todo_controller.getTodos);
route.get('/todo/:id', todo_controller.getTodo);
route.post('/todo', todo_controller.postTodo);
route.patch('/todo/:id', todo_controller.updateTodo);
route.delete('/todo/:id', todo_controller.deleteTodo);

export default {
    route
}