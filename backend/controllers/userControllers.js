const User = require("../models/userModel")

//login users
const loginUsers = async (req, res)=> {
    res.json({mssg : "login users"})
}

//signup users
const signupUsers = async (req, res)=> {
    res.json({mssg : "signup users"})
}

module.exports = {loginUsers, signupUsers}