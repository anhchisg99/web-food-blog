const jwt = require('jsonwebtoken')
module.exports.authen =function(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
        if(err) return res.status(403).send('something broken')
        req.user = user
        next()
    })
}