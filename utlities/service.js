const jwt = require("jsonwebtoken")
const secret = "12345"

function setUser(user) {
   return jwt.sign({
    email: user.email
  },secret)
}

function getUser(tokenId) {
     return jwt.verify(tokenId,secret)
}

module.exports = {
    setUser,
    getUser
}