import database from "../config/database.js";
import user_validation from "../validations/user_validation.js"
import jwt from 'jsonwebtoken';
import bcyrpt from 'bcrypt';

const register = async (req,res) => {
    try{
        const {value,error} = user_validation.registerSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const countUser = await database.db.user.count({
            where: {
                email: value.email
            }
        });

        if (countUser != 0) return res.status(400).json({ error: "User already exist"});

        const hashedPassword = await bcyrpt.hash(value.password, 10);

        await database.db.user.create({
            data: {
                username: value.username,
                email: value.email,
                password: hashedPassword,
            }
        });

        res.json({message: "Register user successfully"});
    }catch(err) {
        res.json({error: err});
    }
}

const login = async (req,res) => {
    try{
        const {value,error} = user_validation.loginSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const findUser = await database.db.user.findUnique({
            where: {
                email: value.email,
            }
        });

        console.log(value.password);
        console.log(findUser);

        if (!findUser) return res.status(400).json({error: "User not found"});

        const comparePassword = await bcyrpt.compare(value.password, findUser.password);

        if (!comparePassword) return res.status(400).json({error: "Password not match"});

        const signJWT = await jwt.sign(findUser, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.cookie('token', signJWT, {
            httpOnly: true,
            secure: false,    
            maxAge: 1000 * 60 * 60 * 24, 
            sameSite: 'lax',
        });

        res.json({
            message: "Login successfully",
            id: findUser.id,
            email: findUser.email,
            jwt: signJWT,
        });
    }catch(err) {
        res.json({error: err});
    }
}

const getUser = async (req,res) => {
    try{
        const {id} = req.params;

        const getUserProfile = await database.db.user.findFirst({
            where: {
                id: parseInt(id),
            }
        });

        res.status(200).json(getUserProfile)
    }catch(err) {
        res.status(400).json({error: err});
    }
}

const updateUser = async (req,res) => {
    try{
        const {value,error} = user_validation.updateSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const hashedPassword = await bcyrpt.hash(value.password, 10);

        await database.db.user.update({
            data: {
                username: value.username,
                email: value.email,
                password: hashedPassword,
            },
            where: {
                email: value.email,
            }
        })

        res.json({message: "Update profile succesfully"});
    }catch(err) {
        res.json({error: err});
    }
}

const deleteUser = async (req,res) => {
    try{
        const {email} = req.params;

        await database.db.user.delete({
            where: {
                email: email,
            }
        })

        res.json({message: "Delete user succesfully"});
    }catch(err) {
        res.json({error: err});
    }
}

export default {
    register,
    login,
    getUser,
    updateUser,
    deleteUser
}