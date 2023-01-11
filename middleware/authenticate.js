const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')


const authenticate = async(req,res,next)=>{
    const JWT = req.headers.authorization
    if(!JWT) res.json({message : "Access Denied"})

        jwt.verify(JWT , process.env.SECRET_KEY , (error,user)=>{
            if (error) return res.send({ error: error });
            res.user = user
            next()
        })
    }


module.exports = authenticate