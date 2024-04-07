//socket 
const chatForm = document.getElementById("chat-form")
const chatMessage = document.querySelector(".chat-message")
const socket = io()

socket.on('message', (message) => {
    outputMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight

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

