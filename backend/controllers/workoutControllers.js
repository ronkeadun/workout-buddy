const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

//get all workouts
const getAllWorkouts = async(req, res)=>{
    const user_id = req.user._id
    try {
        const workouts = await Workout.find({user_id}).sort({createdAt : -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

//get a single workout
const getSingleWorkout = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }
    try {
        const workout = await Workout.findById(id)
        if(!workout){
            return res.status(400).json({error : "No such workout"})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

//create new workout
const createWorkout = async(req, res)=>{
    const {title, reps, load} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }
    //add document to database
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

//delete a workout
const deleteWorkout = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }
    try {
        const workout = await Workout.findOneAndDelete({_id: id})
        if(!workout){
            return res.status(400).json({error : "No such workout"})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

//update a workout
const updateWorkout = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "No such workout"})
    }
    try {
        const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
        if(!workout){
            return res.status(400).json({error : "No such workout"})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}