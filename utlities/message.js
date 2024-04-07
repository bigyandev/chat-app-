const moment = require("moment");
const getUser = require("./service")

function formatMessage(username,text) {
    
     return {
        username,
        text,
        time:moment().format('h:mm a'),
    }   
   
}


module.exports = formatMessage