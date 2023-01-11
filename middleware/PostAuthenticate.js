const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')


const PostAuthenticate = async(req,res,next)=>{
    const JWT = req.body.headers.Authorization
    if(!JWT) res.json({message : "Access Denied"})

        jwt.verify(JWT , process.env.SECRET_KEY , (error,user)=>{
            if (error) return res.send({ error: error });
            res.user = user
            res.id = user._id
            next()
        })
    }


module.exports = PostAuthenticate