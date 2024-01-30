const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const Todo = require('./models/Todo')
require('dotenv').config(); 

//Execute express 
const app = express(); 

//Middlewares
app.use(express.json()); 
app.use(cors()); 

const port = 4001; 
app.listen(port, () => console.log(`Server is running on port ${port}`)); 

//connection
const MONGO_URI = 'mongodb://0.0.0.0:27017/todo';
mongoose.connect(MONGO_URI)
    .then(() =>{
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    })

    


app.get('/todo', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', async (req,res) => {
    const newTask = await Todo.create(req.body);
    res.status(201).json({newTask})
})

app.delete('/todo/delete/:id', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.put('/todo/update/:id', async (req, res)=> {
    const result = await Todo.findByIdAndUpdate(req.params.id,{ name: req.body.name }, { new: true })
    res.json(result)
})

    



