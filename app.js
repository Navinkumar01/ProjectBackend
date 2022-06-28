const express = require("express");
const res = require("express/lib/response");
const expressValidator = require('express-validator');
const cors = require("cors");
const app = express();

const PORT = 5000;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express());

const bodyParser = require('body-parser');
app.use(bodyParser.json());



const userRoutes = require('./routes/user.js');
app.use('/user', userRoutes);

const collegeRoutes = require('./routes/college.js');
app.use('/college', collegeRoutes);

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";

mongoose.connect(url, { useNewUrlParser:true }, () =>{
    console.log("Connected to DB!")
})

app.get('/', (req, res) => {
    res.send("welcome to express and nodejs");
});

app.listen(PORT, () =>{
    console.log("serveris listening at port")
})