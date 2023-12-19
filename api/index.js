const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; 



app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (req, res) => {
    const {username, password, firstName, lastName, email} = req.body;
    try{
        const userDoc = await UserModel.create({username, password:bcrypt.hashSync(password, saltRounds), firstName, lastName, email});
        res.json(userDoc);
    } catch(err) {
        if(err.code === 11000){
            res.status(400).json({message: 'Username or email already exists'});
        } else {
            res.status(500).json({message: 'Something went wrong'});
        }
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await UserModel.findOne({username});
        if(userDoc){
            const isValid = bcrypt.compareSync(password, userDoc.password);
            if(isValid){
                res.json({message: 'Login successful'});
            } else {
                res.status(401).json({message: 'Invalid credentials'});
            }
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch(err) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

app.listen(4000);

//blogAdmin
//mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority