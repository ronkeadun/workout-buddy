const express = require("express")
const router = express.Router()

//controller functios
const {loginUsers, signupUsers} = require("../controllers/userControllers")

//login route
router.post("/login", loginUsers)

//signup route
router.post("/signup", signupUsers)

module.exports = router