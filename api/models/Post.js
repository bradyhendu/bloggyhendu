const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [2, 'Title must be at least 2 characters long']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [2, 'Content must be at least 2 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [2, 'Description must be at least 2 characters long']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
}, {timestamps: true});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;