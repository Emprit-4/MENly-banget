const morgan = require("morgan");
const { HTTPLog } = require("../utils/logger");


// Atur format
const format = process.env.NODE_ENV === "development" ?
    "dev" : "combined";    

const stream = {
    write(msg) {
        HTTPLog.info(msg.trim());
    }
}

// Ekspor dalam bentuk fungsi
module.exports = function HTTPLogger() {
    return morgan(format, { stream });
};
