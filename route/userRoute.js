const express = require("express")
const { handleCreateNewUser, handleLogInUser } = require("../controllers/userRoute")
const router = express.Router()

router.post("/create", handleCreateNewUser)
router.post("/auth", handleLogInUser)

module.exports = router