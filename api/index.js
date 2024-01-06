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

const PORT = process.env.PORT || 4000;

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'https://bloggyhendu.com'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

(async () => {
    try {
        await mongoose.connect('mongodb+srv://blogAdmin:LlF78kOJ0feZgMyE@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority');
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {

        });
    } catch (err) {
        console.error('Failed to connect to MongoDB: ', err);
    }
 })();

 app.get('/', (req, res) => {
    res.send('Hello World!');
});
 


app.post('/register', uploadMiddleware.single('file'), async (req, res) => {
    let image;

    if(req.file){
        const {originalname} = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        let path = req.file.path;
        path = path.replace(/\\/g, '/');
        image =  path + '.' + extension;
        fs.renameSync(path, image);
    }

    const {username, password, firstName, lastName, email} = req.body;
    try{
        let userDoc;
        if(image){
            userDoc = await UserModel.create({username, password:bcrypt.hashSync(password, saltRounds), firstName, lastName, email, profilePicture: image});
        } else {
            userDoc = await UserModel.create({username, password:bcrypt.hashSync(password, saltRounds), firstName, lastName, email});
        }
        jwt.sign({username, id:userDoc._id, password, firstName, lastName, email}, secretKey, (err, token) => {
            if(err){
                res.status(500).json({message: 'Something went wrong'});
            } else {
                res.json({token});
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
                        res.json({token});
                    }
                });
            } else {
                res.status(401).json({message: 'Invalid Password'});
            }
        } else {
            res.status(401).json({message: 'Invalid Username'});
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
    const {token} = req.body;

    jwt.verify(token, secretKey, async (err, decoded) => {
        if(err){
            res.status(401).json({message: 'Invalid token, error:' + err});
        } else {
            const {id} = decoded;
            try{
                const postDoc = await PostModel.create({title, description, content, image, author: id});
                const updatedUser = await UserModel.findByIdAndUpdate(id, {$push: {userPosts: postDoc._id}}, {new: true});
                if(!updatedUser){
                    throw new Error('Unable to add post to user');
                }
                res.json({post: postDoc});
            } catch(err) {
                res.status(500).json({message: 'Something went wrong'});
            }
        }
    });
});

app.get('/post', async (req, res) => { 
    res.json(await PostModel.find()
      .populate('author', ['username', 'firstName', 'lastName', 'email', 'profilePicture'])
      .sort({createdAt: 'desc'}));
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const postDoc = await PostModel.findById(id).populate('author', ['username', 'firstName', 'lastName', 'email', 'profilePicture']);
        res.json(postDoc);
    } catch(err) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

app.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const postDoc = await PostModel.findById(id).populate('author', ['username', 'firstName', 'lastName', 'email']);
        res.json(postDoc);
    } catch(err) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

app.post('/edit', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if(req.file){
        const {originalname} = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        let path = req.file.path;
        path = path.replace(/\\/g, '/');
        let newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
    }
    const {token} = req.body;  
    jwt.verify(token, secretKey, async (err, decoded) => {
        if(err){
            res.status(401).json({message: 'Invalid token'});
        } else {
            const {title, description, content, id} = req.body;
            const postDoc = await PostModel.findById(id);

            console.log(id);

            if(!postDoc){
                return res.status(404).json({message: 'Post not found'});
            }

            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);

            if(!isAuthor){
               return res.status(401).json({message: 'You are not the author'});
            }
            try{
                await postDoc.updateOne({title, description, content, image: newPath ? newPath : postDoc.image});
                res.json({post: postDoc});
            } catch(err) {
                res.status(500).json({message: 'Something went wrong'});
            }
        }
    });
});

app.delete('/delete/:id', async (req, res) => {
    const {token} = req.body;
    const {id} = req.params;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if(err){
            res.status(401).json({message: 'Invalid token'});
        } else {
            const postDoc = await PostModel.findById(id);
            if(!postDoc){
                return res.status(404).json({message: 'Post not found'});
            }
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);
            if(!isAuthor){
               return res.status(401).json({message: 'You are not the author'});
            }
            try{
                await postDoc.deleteOne();
                res.json({message: 'Success'});
            } catch(err) {
                res.status(500).json({message: 'Something went wrong'});
            }
        }
    });
});

app.get('/user/:username', async (req, res) => {
    const {username} = req.params;
    console.log(username);
    try{
        const userDoc = await UserModel.findOne({username}) .populate({
            path: 'userPosts',
            select: ['title', 'description', 'image', 'createdAt'],
            options: { sort: { 'createdAt': -1 } },
            populate: { path: 'author' }
          });
        if(!userDoc){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({user: userDoc});
    } catch(err) {
        res.status(500).json({message: 'Could not find user'});
    }
});
