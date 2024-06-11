const { transports, format } = require("winston");
const { join, resolve } = require("path");
const { isEmpty: _is_empty } = require("lodash");
const { logger: config } = require("./config");

const transports_list = {};

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
function createTransport(name, file_path, custom_config = {}) {
    transports_list[name] = [];

    // Logger console dibuat sesederhana mungkin untuk meningkatkan keterbacaan
    transports_list[name].push(
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
    if (file_path && process.env.NODE_ENV === "production") {
        let file_transport_config = custom_config;

        // Cek apakah config custom ada; jika tidak ada, pakai templat yang ada
        if (_is_empty(file_transport_config)) {
            file_transport_config = { // atau ini
                format: format.combine(
                    format.logstash(),
                    format.timestamp(),
                    format.errors({ stack: true })
                ),
                filename: file_path,
                maxsize: 1_048_576, // 1 MB dalam bytes
                maxFiles: 5,
                handleExceptions: true,
                level: "info",
            };
        }

        const info_transport = new transports.File(file_transport_config);
        transports_list[name].push(info_transport);
    }
};

// Insialisasi transport dari yang ada di config.js
const filename = Object.keys(config.filename);
let file_path;

for(let i = 0, len = filename.length; i < len; i+=1) {
    file_path = resolve(join(config.folder, config.filename[filename[i]]));
    
    createTransport(filename[i], file_path);
}

module.exports = transports_list;