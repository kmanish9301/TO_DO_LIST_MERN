const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const ToDoTaskRoutes = require("./src/routes/to_do_routes");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/v1/", ToDoTaskRoutes);

connectDB(app);
