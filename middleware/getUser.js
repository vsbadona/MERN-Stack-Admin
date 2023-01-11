const User = require('../model/userSchema')

const getUser = async(req,res,next) => {
    let user
    const detail = req.body.Id
    res.json(detail)
    try {
        user = await User.findOne({_id :detail})
        if(!user){
            res.json({message : "User not found"})
        }
    } catch (err) {
       console.log(err);
    }
    res.user = user
    next()
}

module.exports = getUser