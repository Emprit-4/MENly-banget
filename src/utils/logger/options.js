const { format } = require("winston");

const options = {};
const isDev = process.env.NODE_ENV === "development";

// Mengatur warna-warna yang akan digunakan dalam logging console
options.colors = format.colorize({
    colors: {
        error: "red",
        warn: "yellow",
        info: "blue",
        debug: "green",
    },
    message: false,
});

// Opsi untuk console stream
// Logger console dibuat sesederhana mungkin untuk meningkatkan keterbacaan
options.console = function consoleOptions(name) {
    return {
        format: format.combine(
            options.colors,
            format.label({ label: name, message: true }),
            format.simple(),
            format.errors({ stack: true })
        ),
        handleExceptions: false,
        level: isDev ? "debug" : "info",
    };
};

// Opsi untuk file stream
options.file = function fileOptions(filePath) {
    return {
        // atau ini
        format: format.combine(
            format.timestamp(),
            format.logstash(),
            format.errors({ stack: true })
        ),
        // options: {
        //     flags: "w", // log terdahulu dibersihkan
        // },
        filename: filePath,
        maxsize: 2_097_152, // 2 MB dalam bytes
        maxFiles: 5,
        handleExceptions: true,
        level: "info",
    };
};

module.exports = options;
