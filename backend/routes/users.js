const router = require("express").Router()

let User = require("../models/user.model")

// To get all the users to display on the browser
router.route("/").get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(error => res.status(400).json("Error: " + error))
})

// To add/create new users on the database
router.route("/add").post((req, res) => {
    const username = req.body.username
    const newUser = new User({username})

    newUser.save()
    .then(res.json("New User has been added"))
    .catch(error => res.status(400).json("Error: " + error))
})

module.exports = router