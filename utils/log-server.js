const { find } = require("lodash");
const { ProcessLog } = require("./logger");
const config = require("./config");


module.exports = function serverLog() {
    ProcessLog.debug("Server berjalan");
    
    // Cetak alamat website sesuai ip lokal
    if (process.env.NODE_ENV === "development") {
        const nets = require('os').networkInterfaces();
        const netsKey = Object.keys(nets);
        let address = "";
        
        for(let i = 0; i < netsKey.length; i+=1) {
            const net = nets[netsKey[i]];
            
            if (!address) {
                address = find(net, $ => {
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