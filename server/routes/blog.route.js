const express = require('express')
const router  = express.Router()
const Blog = require('../models/blog.model')
const googleStorageBlog = require('../controllers/googleStorageBlog')
const Multer= require('multer')
const { findByIdAndDelete } = require('../models/blog.model')
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});
router.get('/getBlog',async(req,res)=>{
    try {
        let blog = await Blog.find()
        res.json({data:blog})
    } catch (error) {
        res.json({sign:'error'})
    }
})
// router.get('/getBlog1',async(req,res)=>{
//     try {
//         let blog = await Blog.find()
//         res.json(blog)
//     } catch (error) {
//         res.json({sign:'error'})
//     }
// })

router.get('/:slug',async (req,res)=>{
    try {
        let blog = await Blog.findOne({slug:req.params.slug})
        res.json({data:blog})
        
    } catch (error) {
        res.json({sign:'error'})
        
    }
})
router.post('/create', multer.single('file'), googleStorageBlog.sendImg)
router.delete('/del',async(req,res)=>{
    try {
        let delItem= await Blog.findByIdAndDelete(req.body.id)
        res.json(delItem)
    } catch (error) {
        res.json({sign:'error'})
        
    }
    
})
// router.post('/create',async(req,res)=>{
//     let blog = new Blog({title,description,markdown}=req.body)
//     try {
//         let usedBlog = await blog.save()
//         res.json({data:usedBlog})
//     } catch (error) {
//         res.json({sign:'error'})
        
//     }
// })

// router('/',(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })
// router('/',(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })

module.exports = router