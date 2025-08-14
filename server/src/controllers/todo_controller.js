import database from "../config/database.js";
import todo_validation from "../validations/todo_validation.js";

const getTodos = async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const body = req.body;

        if (page < 1 || limit < 1) return res.status(400).json({error: "Page and limit must be positive integers"})

        const skip = (page - 1) * limit;

        const todos = await database.db.todo.findMany({
            skip: skip,
            take: limit,
            where: {
                userId: body.userId
            },
            orderBy: {
                id: 'asc',
            }
        });

        const total = await database.db.todo.count();

        res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total/limit),
            todos,
        });
    }catch(err) {
        res.json({error: err});
    }
}

const getTodo = async (req,res) => {
    try{
        const {id} = req.params;
        const body = req.body;

        const todo = await database.db.todo.findFirst({
            where: {
                userId: body.id,
                id: parseInt(id),
            }
        });

        res.json(todo);
    }catch(err) {
        res.json({error: err});
    }
}

const postTodo = async (req,res) => {
    try{
        const {value,error} = todo_validation.postSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        await database.db.todo.create({
            data: {
                userId: value.userId,
                title: value.title,
<<<<<<< HEAD
                status: value.status.toUpperCase(),       
=======
                status: value.status.toUpperCase(), 
                description: value.description,      
>>>>>>> 2d29c6c (second commit)
                completed: value.completed,
            }
        });

        res.json({message: "Create todo successfully"});
    }catch(err) {
        res.json({error: err});
    }
}

const searchTodos = async (req, res) => {
    try {
        const {title} = req.query; 

        if (!title) return res.status(400).json({ error: 'Search query parameter is required' });

        const todos = await database.db.todo.findMany({
            where: {
                title: {
                    contains: title,
                }
            },
            orderBy: {
                createdAt: 'asc',
            }
        });

        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const updateTodo = async (req,res) => {
    try{
        const {id} = req.params;

        const {value,error} = todo_validation.updateSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        await database.db.todo.update({
            where: {
                userId: value.userId,
                id: parseInt(id),
            },
            data: {
                title: value.title,
<<<<<<< HEAD
                status: value.status.toUpperCase(),       
=======
                status: value.status.toUpperCase(), 
                description: value.description,      
>>>>>>> 2d29c6c (second commit)
                completed: value.completed,
            }
        })

        res.json({message: "Update todo successfully"});
    }catch(err) {
        res.json({error: err});
    }
}

const deleteTodo = async (req,res) => {
    try{
        const {id} = req.params;
        const body = req.body;

        await database.db.todo.delete({
            where: {
                userId: body.userId,
                id: parseInt(id),
            }
        }); 

        res.json({message: "Delete Todo successfully"});
    }catch(err) {
        res.json({error: err});
    }
}

export default {
    getTodos,
    getTodo,
    postTodo,
    searchTodos,
    updateTodo,
    deleteTodo,
}