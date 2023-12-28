const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/User');
const PostModel = require('./models/Post');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const jwt = require('jsonwebtoken');
const secretKey = 'secretKeybutlikeSUPERSECRETlikeyoudontevenknow';
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
const cookieParser = require('cookie-parser');



app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

(async () => {
    try {
        await mongoose.connect('mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority');
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

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    let path = req.file.path;
    path = path.replace(/\\/g, '/');
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);

    const {title, description, content} = req.body;
    const image =  newPath;
    
    const {token} = req.cookies;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if(err){
            res.status(401).json({message: 'Invalid token'});
        } else {
            const {id} = decoded;
            try{
                const postDoc = await PostModel.create({title, description, content, image, author: id});
                res.json({post: postDoc});
            } catch(err) {
                res.status(500).json({message: 'Something went wrong'});
            }
        }
    });
});

app.get('/post', async (req, res) => { 
    res.json(await PostModel.find()
      .populate('author', ['username', 'firstName', 'lastName', 'email'])
      .sort({createdAt: 'desc'}));
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const postDoc = await PostModel.findById(id).populate('author', ['username', 'firstName', 'lastName', 'email']);
        res.json(postDoc);
    } catch(err) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

//blogAdmin
//mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority