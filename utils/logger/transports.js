const { transports } = require("winston");
const { join, resolve } = require("path");
const { logger: config } = require("../util-config");
const options = require("./options");

const transportsList = {};

// Membuat fungsi createTransport
function createTransport(name, filePath) {
    transportsList[name] = [];

    // transport untuk console stream
    const consoleOptions = options.console(name);
    const consoleTransport = new transports.Console(consoleOptions);
    transportsList[name].push(consoleTransport);

    // transport untuk file stream
    if (filePath && process.env.NODE_ENV === "production") {
        const fileOptions = options.file(filePath);
        const fileTransport = new transports.File(fileOptions);
        transportsList[name].push(fileTransport);
    }
}

// Insialisasi transport dari yang ada di config.js
const filename = Object.keys(config.filename);

for (let i = 0, len = filename.length; i < len; i += 1) {
    const filePath = resolve(join(config.folder, config.filename[filename[i]]));
    createTransport(filename[i], filePath);
}

// Ekspor
module.exports = transportsList;
