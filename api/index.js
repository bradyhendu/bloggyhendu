const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
    const {username, password, firstName, lastName, email} = req.body;
    res.json({username, password, firstName, lastName, email});
});

app.listen(4000);

//blogAdmin
//mongodb+srv://blogAdmin:<WXjMkQtmX8PBHlIL>@blogcluster.48qnofa.mongodb.net/?retryWrites=true&w=majority