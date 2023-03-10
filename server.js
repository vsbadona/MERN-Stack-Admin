const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const routes = require('./routes/userRoutes')
const { mongoose } = require('mongoose')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', true);
app.use(cors())
app.use('/', routes)

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () =>
            console.log(`server running on http://localhost:${PORT}`)
        )
    }
    )
    .catch((err) => console.log(err + " can't connect to db"));


