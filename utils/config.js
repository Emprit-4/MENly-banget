/// Berkas pertama yang dimuat. Tidak boleh bergantung pada berkas lain ///

// Persiapan awal
const { readdirSync: read } = require("fs");
const { join, resolve, parse } = require("path");

const folder = "configs";
const config = {};

// Impor konfigurasi
require("dotenv").config();

// Just to be sure: variabel env ditrim. 
if (!("NODE_ENV" in process.env)) {
    throw new Error("Tidak ada NODE_ENV");
}

process.env.NODE_ENV = process.env.NODE_ENV.trim();

read(folder).forEach(file => {
    const fileName = parse(file).name;
    const filePath = resolve(join(folder, file));
    
    config[fileName] = require(filePath);
});

// Finalisasi, agar objek tidak bisa diubah-ubah
Object.freeze(config);

module.exports = config;