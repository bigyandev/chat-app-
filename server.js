const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const connectDB = require("./connection");
const staticRoute = require("./route/user");
const userRoute = require("./route/userRoute")

//middleware
app.use(express.static( __dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//route
app.use("/", staticRoute)
app.use("/user", userRoute)

//connection 
connectDB("mongodb://127.0.0.1:27017/testingjwt")



app.listen(3000)