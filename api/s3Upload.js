const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require('dotenv').config();


const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

// AWS S3 Client
const s3 = new AWS.S3({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    },
    region: REGION
});

// Multer Upload
const uploadMiddleware = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function(req, file, cb) {
            cb(null,{fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, `${Date.now().toString()} - ${file.originalname}`)
        }
    })
});

module.exports = uploadMiddleware;

