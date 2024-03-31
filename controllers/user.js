const path = require("path")
const { getUser } = require("../utlities/service")

async function handleHomePage(req,res) {
    const tokenUid = req.cookies?.uid
    if(!tokenUid) return res.redirect("/login")
    const token = getUser(tokenUid)
    if(!token) return res.redirect("/login")
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