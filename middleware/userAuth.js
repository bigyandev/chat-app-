const { getUser } = require("../utlities/service");

async function checkForAuthentication(req,res,next) {
    const tokenId = req.cookies?.uid;
    req.user = null
    if(!tokenId) return res.redirect("/login")
    try {s
      const user = await getUser(tokenId)
      if(!user) return res.redirect("/login")
      req.user = user
      return res.redirect("/")
      
    }
    catch(err) {
        return next(err)
    }
}

module.exports = {
    checkForAuthentication
}