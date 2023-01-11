const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    // emailtoken : {
    //     type : String,
    //     required : true
    // },
    // verified : {
    //     type : Boolean,
    //     required : true
    // },
    token : {
        type : String
    },
    image :{
        type : String
    },
    date : {
type : Date,
default : Date.now()
    },
    messages : [
        {
            name : {
                type : String,
                required : true
            },
            email : {
                type : String,
                required : true
            },
            phone : {
                type : Number,
                required : true
            },
            message : {
                type : String,
                required : true
            }    
        }
    ]

})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password ,12)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id : this._id},process.env.SECRET_KEY)
    this.token = token
    await this.save()
    return token
}

userSchema.methods.addMessage = async function(name,email,phone,message){
  try {
    this.messages = await this.messages.concat({name,email,phone,message})
    await this.save()
    return this.messages
  } catch (error) {
    console.log(error);
  }
}

const User = mongoose.model('User',userSchema)
module.exports = User








































































































// const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const dotenv = require('dotenv')
// dotenv.config()
// const userSchema = new mongoose.Schema({
// name : {
//     type : String,
//     required : true
// },
// email : {
//     type : String,
//     required : true
// },
// phone : {
//     type : Number,
//     required : true
// },
// password : {
//     type : String,
//     required : true
// },
// token : {
//     type : String
// }

// })

// userSchema.pre("save" , async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password , 12)
//     }
//     next()
// })

// userSchema.methods.generateAuthToken = async function(){
//     try{
//         let token = jwt.sign({_id : this._id},process.env.SECRET_KEY)
//         this.token = token
//         await this.save()
//         return token
//     }catch(err){
//         console.log(err);
//     }
// }


// const User = mongoose.model('User',userSchema)
// module.exports = User