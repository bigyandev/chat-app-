
//socket 
const chatForm = document.getElementById("chat-form")
const chatMessage = document.querySelector(".chat-message")
const sender = document.getElementById("sender")
const userList = document.getElementById("user-list")
const socket = io()

socket.on("connect", (socket) => {
    socket.emit("requestAllUsers")
})

socket.on('message', (message) => {
    outputMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight
})

socket.on('username', (username) => {
    sender.textContent = username.toUpperCase()
})

socket.on("allUsers", async (allUsers) => {
    const users = await allUsers
    console.log(users)
    outputUsers(users)
})


//message submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = e.target.elements.msg.value
    socket.emit("chatMsg", msg)
    e.target.elements.msg.value = " "
    e.target.elements.msg.focus()


})

//output message
function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message")
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`

    document.querySelector(".chat-message").appendChild(div)
}

function outputUsers(allusers) {
    userList.innerHTML = ""
    const userSet = new Set()
    allusers.map((user) => {
        if (user.username.toString().toUpperCase() === sender.textContent) {
            return
        }
        if (!userSet.has(user.username)) {
            userSet.add(user.username)
            const li = document.createElement("li")
            const activeStatus = user.activeStatus;
            const dot = document.createElement("div")
            dot.classList.add("circle")
            dot.style.backgroundColor = activeStatus ? "green" : "red"
            li.textContent = user.username
            li.appendChild(dot)
            userList.appendChild(li)
        }

    })






}

