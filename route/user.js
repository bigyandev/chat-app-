const express = require("express")
const router = express.Router()
const {handleHomePage, handleLogIn, handleSignUp} = require("../controllers/user")

router.get("/", handleHomePage)
router.get("/login",handleLogIn)
router.get("/signup", handleSignUp)

module.exports = router
