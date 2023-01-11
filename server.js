const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const routes = require('./routes/userRoutes')
const userProfile = require('./routes/userProfile')
const {  mongoose } = require('mongoose')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', true);
app.use(cors())
app.listen(PORT,()=>console.log("connected to server"))
app.use('/',routes)
app.use('/user',userProfile)

const DB = process.env.DATABASE_URL
mongoose.connect(DB).then(()=>{console.log("Connected With Db")}).catch(()=>console.log("Can't Connect With Db"))


