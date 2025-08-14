import express from 'express';
import user_controller from '../controllers/user_controller.js';

const route = express.Router();

route.post('/register', user_controller.register);
route.post('/login', user_controller.login);
<<<<<<< HEAD
route.put('/update', user_controller.updateUser);
route.delete('/delete/:email', user_controller.deleteUser);
=======
>>>>>>> 2d29c6c (second commit)

export default {
    route
}