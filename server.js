const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const reportRoute = require("./routes/reportRoute");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect to db
connectDB();

// routes
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/user", userRoute);

// Listener
app.listen(PORT, console.log(`Server running on port ${PORT}`));
