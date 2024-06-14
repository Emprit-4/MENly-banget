const { transports, format } = require("winston");
const { join, resolve } = require("path");
const { isEmpty } = require("lodash");
const { logger: config } = require("./config");

const transportsList = {};

// Mengatur warna-warna yang akan digunakan dalam logging console
const colors = format.colorize({
    colors: {
        error: "red",
        warn: "yellow",
        info: "blue",
        debug: "green",
    },
    message: false,
});

// Membuat fungsi createTransport
function createTransport(name, filePath, customConfig = {}) {
    transportsList[name] = [];

    // Logger console dibuat sesederhana mungkin untuk meningkatkan keterbacaan
    transportsList[name].push(
        new transports.Console({
            format: format.combine(
                colors,
                format.label({ label: name, message: true }),
                format.simple(),
                format.errors({ stack: true })
            ),
            handleExceptions: false,
            level: "debug",
        })
    );
    
    // Logger berkas untuk production
    if (filePath && process.env.NODE_ENV === "production") {
        let transportConfig = customConfig;

        // Cek apakah config custom ada; jika tidak ada, pakai templat yang ada
        if (isEmpty(transportConfig)) {
            transportConfig = { // atau ini
                format: format.combine(
                    format.logstash(),
                    format.timestamp(),
                    format.errors({ stack: true })
                ),
                filename: filePath,
                maxsize: 1_048_576, // 1 MB dalam bytes
                maxFiles: 5,
                handleExceptions: true,
                level: "info",
            };
        }

        const transportInfo = new transports.File(transportConfig);
        transportsList[name].push(transportInfo);
    }
};

// Insialisasi transport dari yang ada di config.js
const filename = Object.keys(config.filename);
let filePath;

for(let i = 0, len = filename.length; i < len; i+=1) {
    filePath = resolve(join(config.folder, config.filename[filename[i]]));
    
    createTransport(filename[i], filePath);
}

module.exports = transportsList;