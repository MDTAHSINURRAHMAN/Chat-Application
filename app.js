// External Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter")
const usersRouter = require("./router/usersRouter")
const inboxRouter = require("./router/inboxRouter")

// Internal Imports
const {notFoundHandler, errorHandler} = require("./middlewares/common/errorHandler");


const app = express();
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => console.log("Database Connection Successful"))
.catch(err => console.log(err));

// Request Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Set View Engine
app.set("view engine", "ejs");

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing Setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

// 404 Not Found Handler
app.use(notFoundHandler);

// Common Error Handler
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`App Listening To Port ${process.env.PORT}`);
})