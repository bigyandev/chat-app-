const path = require("path")

async function handleHomePage(req,res) {
     res.sendFile(path.join(__dirname, "../public", "index.html"))
}

async function handleLogIn(req,res) {
    res.sendFile(path.join(__dirname, "../public", "login.html"))
}

async function handleSignUp(req,res) {
    res.sendFile(path.join(__dirname, "../public", "signup.html"))
}

module.exports = {
    handleHomePage,
    handleLogIn,
    handleSignUp
}