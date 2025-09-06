import express from 'express';
import user_controller from '../controllers/user_controller.js';

const route = express.Router();

route.post('/register', user_controller.register);
route.post('/login', user_controller.login);

export default {
    route
}