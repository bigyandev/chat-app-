const express = require("express");
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
const connectDB = require("./connection");
const staticRoute = require("./route/user");
const userRoute = require("./route/userRoute");
const { checkForAuthentication } = require("./middleware/userAuth");

//middleware
app.use(express.static(path.join(__dirname, "static")))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
//app.use(checkForAuthentication)

//route
app.use("/", staticRoute)
app.use("/user", userRoute)

//connection 
connectDB("mongodb://127.0.0.1:27017/testingjwt")



app.listen(3000)