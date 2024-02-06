const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var app = new express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
// parse application/json
app.use(bodyParser.json())
app.use(express.json());

dotenv.config({path: './.env'});

const userrouting = require('./user/user.route');
const authcode = require('./auth/authcode.route');
const teacher = require('./teacher/details.route');
const student = require('./student/details.route');
require("dotenv").config();

app.use(userrouting);
app.use(authcode);
app.use(teacher);
app.use(student);
const PORT = 3000;

app.listen(PORT, function(req, res){
    console.log(`Data Api Server running on http://localhost:${PORT}`);
});

