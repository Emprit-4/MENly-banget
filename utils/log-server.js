const { find: _find } = require("lodash");
const { ProcessLog } = require("./logger");
const config = require("./config");


module.exports = function server_log() {
    ProcessLog.debug("Server berjalan");
    
    // Cetak alamat website sesuai ip lokal
    if (process.env.NODE_ENV === "development") {
        const nets = require('os').networkInterfaces();
        const nets_key = Object.keys(nets);
        let address = "";
        
        for(let i = 0; i < nets_key.length; i+=1) {
            const net = nets[nets_key[i]];
            
            if (!address) {
                address = _find(net, $ => {
                    const familyV4Value = typeof $.family === 'string' ? 'IPv4' : 4;
                    return $.family === familyV4Value && !$.internal;
                }).address;
            }
        }
        
        if (!address) return;
        address = `http://${address}:${config.server.port}`; // update

        ProcessLog.debug(`Alamat lokal: ${address}`);
        ProcessLog.warn("Alamat lokal tidak menggunakan https");
    }
};