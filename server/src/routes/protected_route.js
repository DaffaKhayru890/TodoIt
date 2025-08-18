import express from 'express';
import todo_controller from '../controllers/todo_controller.js';
import user_controller from '../controllers/user_controller.js';
import auth_middleware from '../middlewares/auth_middleware.js';
import multer from 'multer';
import storage from '../config/file_upload.js';

const route = express.Router();

route.use(auth_middleware.authenticateJWT);

const upload = multer({storage})

route.patch('/user/update', user_controller.updateUser);
route.get('/user/', user_controller.getUser)
route.patch('/user/upload', upload.single("file"),user_controller.uploadProfileUser);
route.get('/user/profile-picture', user_controller.getProfilePicture);
route.patch('/user/profile-picture/delete', user_controller.deleteProfilePicture);
route.delete('/user/delete', user_controller.deleteUser);

route.get('/todo/search', todo_controller.searchTodos);
route.get('/todo', todo_controller.getTodos);
route.get('/todo/:id', todo_controller.getTodo);
route.post('/todo', todo_controller.postTodo);
route.patch('/todo/:id', todo_controller.updateTodo);
route.delete('/todo/:id', todo_controller.deleteTodo);
route.delete('/todo', todo_controller.deleteAllTodo);

export default {
    route
}