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

const onlineUsers  = new Map()


//socket.io 
io.on("connection",  async (socket) => {
    sendAllUsers(socket)
    const userId = socket.id;
    const username = (socket.handshake.headers.referer.split("=")[1]) || "ANONYMOOUS"
    
    onlineUsers.set(userId, {username, activeStatus: true})
    
    emitAllUsers()

    

    socket.on("requestAllUsers", () => {
        sendAllUsers(socket)
    })
    //broadcast when user is connected    socket.emit("message", formatMessage("welcome to the chat"))
    socket.broadcast.emit("message", formatMessage(botName, `${username.toUpperCase()} has joined the chat`, true)) 
    //runs when client disconnects 
    socket.on("disconnect", () => {
        const user = onlineUsers.get(userId)
        if(user) {
            onlineUsers.set(userId, {...user, activeStatus: false})
        }
        emitAllUsers()
        io.emit("message", formatMessage(botName,`${username.toUpperCase()} has left the chat`, false))
        onlineUsers.delete(userId)
    })
    socket.emit("username", username)
    //listen for msg
    socket.on("chatMsg", (msg) => {
        io.emit("message", formatMessage(username.toUpperCase(), msg)) 
    })
//
  function emitAllUsers() {
    const allUsers = Array.from(onlineUsers.values())
    console.log("allUsers",allUsers)
    io.emit("allUsers", allUsers)
  }
  function sendAllUsers(socket) {
    const allUsers = getAllUsers()
    socket.emit("allUsers", allUsers)
  }

})
server.listen(3000)