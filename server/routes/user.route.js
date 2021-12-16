const express = require('express')
const router = express.Router()
const googleStorage = require('../controllers/googleStorage')
const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const authenToken = require('../controllers/authenticateToken')
const jwt = require('jsonwebtoken')

//multer
const Multer= require('multer')
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});
router.get('/getUsers',async(req,res)=>{
    try {
        let user = await User.find()
        res.json(user)
    } catch (error) {
        res.json(error)
        
    }
})
router.post('/create',async (req,res)=>{
    try {
        const user = await User.create({username,password} = req.body)
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})
router.post('/login',async (req,res)=>{
    try{
        const savedAdmin = await User.findOne({username:req.body.username});
        const match = await bcrypt.compare(req.body.password,savedAdmin.password);
        if(match){
            const accessToken =  await jwt.sign({user:savedAdmin.username,user_id:savedAdmin._id},process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken:accessToken})
        }    
    }catch(err){
        res.json(err)
    }
})
router.post('/img',authenToken.authen,multer.single('file'),googleStorage.sendImg)
module.exports = router