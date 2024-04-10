const moment = require("moment");
const getUser = require("./service")

function formatMessage(username,text,activeStatus) {
     return {
        username,
        text,
        activeStatus,
        time:moment().format('h:mm a'),
    }   
   
}


module.exports = formatMessage