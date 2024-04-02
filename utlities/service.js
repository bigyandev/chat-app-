const jwt = require("jsonwebtoken")
const secret = "12345"

function setUser(user) {
   return jwt.sign({
    email: user.email,
    username: user.username
  },secret)
}

function getUser(tokenId) {
     return jwt.verify(tokenId,secret)
}

module.exports = {
    setUser,
    getUser
}