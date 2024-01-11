const mongoose = require("mongoose")

const newSchema = mongoose.Schema

const userSchema = new newSchema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports =mongoose.model("User", userSchema)