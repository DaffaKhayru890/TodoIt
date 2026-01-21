import express from 'express';
import cookieParser from 'cookie-parser';
import public_route from './src/routes/public_route.js';
import dotenv from 'dotenv';
import protected_route from './src/routes/protected_route.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:8080"
}));

app.use("/profiles", express.static(path.join(process.cwd(), "profiles")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', public_route.route)
app.use('/api', protected_route.route);

app.listen(process.env.PORT, () => {
    console.log("Server running at http://localhost:3000");
});