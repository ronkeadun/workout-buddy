require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/users")

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/users", userRoutes)
app.use("/api/workouts", workoutRoutes)

const port = process.env.PORT
//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listening for request
        app.listen(port, ()=>{
            console.log("Server is connected to database and running on port", port)
        })
    })
    .catch((err)=> console.log(err))
