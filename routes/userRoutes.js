const express = require('express')
const routes = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../model/userSchema')
const getUser = require('../middleware/getUser')
const authenticate = require('../middleware/authenticate')
const PostAuthenticate = require('../middleware/postAuthenticate')
const sgMail = require('@sendgrid/mail')

routes.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})
routes.get('/get', authenticate, async (req, res) => {
    const user = await User.findById(res.user._id)
    res.json(user)
})

routes.get('/home', authenticate, async (req, res) => {
    const person = await User.findById(res.user._id)
    if (!person) res.json({ message: "User not found" })
    res.json(person)
})

routes.patch('/update', async (req, res) => {
    const { image, name, phone, Id } = (req.body)
    const user = await User.findById(Id)
    if (!user) {
        res.json({ message: "User not found" })
    }
    const update = await user.update({
        image: image,
        name: name,
        phone: phone
    })
    if (update) {
        res.json({ message: "User updated" })
    } else {
        res.json({ message: "Can't update user" })
    }
})

routes.post('/message', PostAuthenticate, async (req, res) => {
    const { name, email, phone, message } = req.body.data
    const id = res.id
    const user = await User.findById(id)
    if (!user) {
        res.json({ message: "No User Found" })
    } else {
        const userMessage = await user.addMessage(name, email, phone, message)
        await user.save()
        res.json({ message: "Message Has Been Sent" })
    }
})

routes.post('/register', async (req, res) => {

    const { name, email, phone, password } = req.body
    if (!name || !email || !phone || !password) {
        res.json({ message: "All fields are required" })
    }

    const checkUser = await User.findOne({ email: email, phone: phone })
    if (checkUser) {
        res.json({ message: "User with email or password already exists!!" })
    } else {
        try {
            const newUser = new User({
                name: name,
                email: email,
                phone: phone,
                password: password
            })
            if (!newUser) {
                res.json({ message: "there was an error in registration" })
            } else {
                const user = await newUser.save()
                res.json({ user: user, success: "Registration Successfull" })
            }
        } catch (error) {
            res.json({ message: error.message })
        }
    }

})

routes.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.json({ message: "All fields are required" })
    }

    try {
        const findUser = await User.findOne({ email: email })
        if (findUser) {
            const compare = await bcrypt.compare(password, findUser.password)
            if (compare) {
                const token = await findUser.generateAuthToken()
                res.json({ token: token, success: "Login successfully" })
            } else {
                res.json({ message: "invalid password" })
            }
        } else {
            res.json({ message: "invalid email" })
        }
    } catch (err) {
        console.log(err);
    }

})

routes.delete('/delete/:id', async (req, res) => {

    try {
        const ID = req.params.id
        const user = await User.findById(ID)
        if (!user) res.json({ message: "User not found!" })
        const delUser = await user.remove()
        if (!delUser) res.json({ message: "Can't Delete User" })
        res.json({ success: "User Deleted" })
    } catch (error) {
        res.json(error)
    }
})




module.exports = routes











































































































