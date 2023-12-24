const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const jwt = require('jsonwebtoken');
const secretKey = 'secretKeybutlikeSUPERSECRETlikeyoudontevenknow';
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
const path = require('path');



app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

(async () => {
    try {
        await mongoose.connect('mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB: ', err);
    }
 })();
 


app.post('/register', async (req, res) => {
    const {username, password, firstName, lastName, email} = req.body;
    try{
        const userDoc = await UserModel.create({username, password:bcrypt.hashSync(password, saltRounds), firstName, lastName, email});
        jwt.sign({username, id:userDoc._id, password, firstName, lastName, email}, secretKey, (err, token) => {
            if(err){
                res.status(500).json({message: 'Something went wrong'});
            } else {
                res.cookie('token', token).json({message: 'Success'});
            }
        });
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
                jwt.sign({username, id:userDoc._id, password, firstName:userDoc.firstName, lastName:userDoc.lastName, email:userDoc.email}, secretKey, (err, token) => {
                    if(err){
                        res.status(500).json({message: 'Something went wrong'});
                    } else {
                        res.cookie('token', token).json({message: 'Success'});
                    }
                });
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

app.post('/post', uploadMiddleware.single('file'),(req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    fs.renameSync(path, path + '.' + extension);
    res.json({extension});
});

//blogAdmin
//mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority