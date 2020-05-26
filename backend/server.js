const express = require("express");
const cors = require("cors"); // cross origin resources sharing, provide express middleware 
const mongoose = require("mongoose") // it's going to help us to connect to our MongoDB


require("dotenv").config(); // store the Environment Variables and our dotenv file


const app = express(); // Express Server
const PORT = process.env.PORT || 5000; // Port Number


app.use(cors()); // cors middleware
app.use(express.json()); // parse json, sending and receiving json


const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
)
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongo DB database connections is successfully established")
})


const exercisesRouter = require("./routes/exercises")
const usersRouter = require("./routes/users")

app.use("/exercises", exercisesRouter)
app.use("/users", usersRouter)


// Connect to our database on Mongo DB Atlas


app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`)
}) // The point where we start the server