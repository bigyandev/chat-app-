const User = require("../models/user")
const { setUser } = require("../utlities/service")
 
async function handleCreateNewUser(req,res) {
    const {username,email,password} = req.body
    await User.create({
        username,
        email,
        password
    })
    if(!username || !email || !password) return res.redirect("/signup")
    return res.redirect("/login")
}

async function handleLogInUser(req,res) {
    const {email,password} = req.body
    const user = await User.findOne({email,password})
    if(!user) return res.redirect("/login")
    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect("/")
}

module.exports = {
    handleCreateNewUser,
    handleLogInUser
}

