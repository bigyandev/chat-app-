const { getUser } = require("../utlities/service");

async function checkForAuthentication(req,res,next) {
    const tokenId = req.cookies?.uid;
    req.user = null
    if(!tokenId) return next()
    try {
      const user = await getUser(tokenId)
      if(!user) return next()
      req.user = user
      console.log(req.user)
      return next()
      
    }
    catch(err) {
        return next(err)
    }
}

module.exports = {
    checkForAuthentication
}