const { debug: log, warn } = require("./logger").ProcessLog;
const config = require("./config");

module.exports = function server_log() {
    log("Server berjalan");
    
    // Cetak alamat website sesuai ip lokal
    if (process.env.NODE_ENV === "development") {
        const nets = require('os').networkInterfaces();
        const nets_key = Object.keys(nets);
        let address = "";
        
        for(let i = 0; i < nets_key.length; i+=1) {
            const net = nets[nets_key[i]];
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                address = net.address;
            }
        }

        if (!address) return;
        address = `http://${address}:${config.server.port}` // update

        log(`Alamat lokal: ${address}`);
        warn("Alamat lokal tidak menggunakan https");
    }
};