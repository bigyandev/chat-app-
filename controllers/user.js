const path = require("path")
const { getUser } = require("../utlities/service")

async function handleHomePage(req,res) {
    const tokenId = req.cookies.uid;    
    if(!tokenId) return res.redirect("/login")
    const user = await getUser(tokenId)
    if(!user) return res.redirect("/login")
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