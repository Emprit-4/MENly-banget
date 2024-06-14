const winston = require("winston");
const transports = require("./transports");

const loggerInstances = {};

// Membuat instances dari transpor2 yang telah dibuat
const keys = Object.keys(transports);

for(let i = 0, len = keys.length; i < len; i+=1) {
    loggerInstances[keys[i]] = winston.createLogger({
        transports: transports[keys[i]],
        exitOnError: true,
    });
}

// Ekspor
module.exports = loggerInstances;