const express = require("express")
const {
    createWorkout, 
    getAllWorkouts, 
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutControllers")

const router = express.Router()

//Get all workouts
router.get("/", getAllWorkouts)

//Get a single workout
router.get("/:id", getSingleWorkout)

//Ceate a new workout
router.post("/", createWorkout)

//Delete a single workout
router.delete("/:id", deleteWorkout)

//Update a single workout
router.patch("/:id", updateWorkout)
module.exports = router