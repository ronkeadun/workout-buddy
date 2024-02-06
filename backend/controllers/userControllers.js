const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


const createToken = (id)=>{
    return jwt.sign({_id:id}, process.env.SECRET, {expiresIn: "3d"})
}
//login users
const loginUsers = async (req, res)=> {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

//signup users
const signupUsers = async (req, res)=> {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

module.exports = {loginUsers, signupUsers}