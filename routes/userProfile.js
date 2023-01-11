const express = require("express")
const getUser = require("../middleware/getUser")
const User = require("../model/userSchema")
const routes = express.Router()




module.exports = routes