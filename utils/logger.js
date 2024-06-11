const winston = require("winston");
const transports = require("./log-transports");

const logger_instances = {};

// Membuat instances dari transpor2 yang telah dibuat
const keys = Object.keys(transports);
const keys_len = keys.length;

for(let i = 0; i < keys_len; i+=1) {
    logger_instances[keys[i]] = winston.createLogger({
        transports: transports[keys[i]],
        exitOnError: true,
    });
}

module.exports = logger_instances;