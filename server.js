const express = require("express");
const app = express()
const path = require("path")
const http = require("http")
const cookieParser = require("cookie-parser")
const cookie = require("cookie")
const {Server} = require("socket.io")
const connectDB = require("./connection");
const server = http.createServer(app)

const staticRoute = require("./route/user");
const userRoute = require("./route/userRoute");
const formatMessage = require("./utlities/message");
const {checkForAuthentication} = require("./middleware/userAuth");
const getAllUsers = require("./utlities/allUsers");

const io = new Server(server) 
const botName= "ALPHA"

//middleware
app.use(express.static(path.join(__dirname, "static")))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthentication)

//route
app.use("/", staticRoute)
app.use("/user", userRoute)

//connection 
connectDB("mongodb://127.0.0.1:27017/testingjwt")


//socket.io 
io.on("connection",  async (socket) => {
    const userStatus = false
    const username = (socket.handshake.headers.referer.split("=")[1]) || "ANONYMOOUS"
    try {
        const allUsers =  await getAllUsers()
        console.log(allUsers)
        socket.emit("allUsers", allUsers)
    }
    catch(err) {
        console.log(err)
    }
    //broadcast when user is connected    socket.emit("message", formatMessage("welcome to the chat"))
    socket.broadcast.emit("message", formatMessage(botName, `${username.toUpperCase()} has joined the chat`, true)) 
    //runs when client disconnects 
    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName,`${username.toUpperCase()} has left the chat`, false))
    })
    socket.emit("username", username)
    //listen for msg
    socket.on("chatMsg", (msg) => {
        io.emit("message", formatMessage(username.toUpperCase(), msg)) 
    })


})
server.listen(3000)