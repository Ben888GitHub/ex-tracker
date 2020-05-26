const router = require("express").Router()

let Exercise = require("../models/exercise.model")

// Getting data from Exercises
router.route("/").get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(error => res.status(400).json("Error: " + error))
})

// Adding / Creating Exercises data
router.route("/add").post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
    username,
    description,
    duration,
    date
})

    newExercise.save()
    .then(res.json("New exercise has been added"))
    .catch(error => res.status(400).json("Error: " + error))
})

// Get data from Exercises by ID
router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercises => res.json(exercises))
    .catch(error => res.status(400).json("Error: " + error))
})

// Delete data from Exercises by ID
router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => {res.json("Exercise deleted")})
    .catch(error => res.status(400).json("Error: " + error))
})

// Update the data from Exercise by id
router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
        exercise.date = Date.parse(req.body.date)

        exercise.save()
        .then(() => res.json("Exercise updated!"))
        .catch(error => res.status(400))
    })
    .catch(error => res.status(400).json())
})


module.exports = router;