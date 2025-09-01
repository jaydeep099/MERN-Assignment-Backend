const express = require("express");
const bodyParser = require("body-parser");

const { loggingRequest } = require("./middleware/logger");;
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(loggingRequest);

module.exports = app;