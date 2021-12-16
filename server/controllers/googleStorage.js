const express = require('express')
const app = express()
const Multer = require('multer');
var bodyParser = require('body-parser')
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
// const modelItem = require('../models/Item.model')
const User = require('../models/user.model')
const path = require('path');



const storage = new Storage({
    keyFilename: path.join(__dirname, "../project3-332808-782dfec84630.json"),
    projectId: "project3-332808"
});
// app.use(express.json());

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

module.exports.sendImg = (req, res, next) => {
    let user_id = req.user.user_id
    let name = req.body.name
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    // const { name, price } = req.body
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        const user = await User.findOneAndUpdate({_id:user_id},{ $push: { image: {name,"link":publicUrl}} } )
            
        try {
            
            res.status(200).send(user);

        } catch (error) {
            res.json(error)
        }
    });

    blobStream.end(req.file.buffer);
}