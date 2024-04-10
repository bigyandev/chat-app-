const User = require("../models/user")

const getAllUsers = async () => {
    const allUsers = await User.find({}, {_id:0, username: 1})
    const allUsersNames = allUsers.map((user) => user.username)
    return allUsersNames
}

module.exports = getAllUsers