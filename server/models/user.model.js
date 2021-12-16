const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    
    username:String,
    password:{
        type:String,
        require:true
    },
    // image:[
    //     String
    // ],
    image:[
       { name:String,
        link:String}
    ]
    
})
userSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})
module.exports = mongoose.model('User',userSchema)