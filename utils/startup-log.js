const { networkInterfaces }= require("os");
const { ProcessLog } = require("./logger");
const config = require("./util-config");

function getIPAddress() {
    const nets = networkInterfaces();
    const netsKey = Object.keys(nets);
    const addresses = [];
        
    for(let i = 0, len = netsKey.length; i < len; i+=1) {
        const net = nets[netsKey[i]];
        const localAddress = net.find($ => {
            const familyV4Value = typeof $.family === 'string' ? 'IPv4' : 4;
            return $.family === familyV4Value && !$.internal;
        });

        if(localAddress) {
            addresses.push(localAddress.address);
        }
    }

    return addresses;
}

function serverLog() {
    if (process.env.NODE_ENV !== "development") {
        ProcessLog.debug("Server berjalan");
        return;
    }
    
    // Cetak alamat website sesuai ip lokal pertama
    const address = getIPAddress()[0];
    
    if(address) {
        const text = `http://${address}:${config.server.port}`;

        ProcessLog.debug(`Alamat lokal pertama: ${text}`);
        ProcessLog.warn("Alamat lokal tidak menggunakan https");
    }
    
}

module.exports = serverLog;