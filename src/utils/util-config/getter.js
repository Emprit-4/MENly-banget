/// Berkas pertama yang dimuat. Tidak boleh bergantung pada berkas lain ///
/// Menghindari dynamic import; tidak bisa dibundle webpack ///

// Persiapan awal
// const { readdirSync: read } = require("fs");
// const { join, resolve, parse } = require("path");

// const folder = "configs";
// const config = {};

// Impor konfigurasi
require("dotenv").config();
const config = require("../../configs");

// Just to be sure: variabel env ditrim.
if (!("NODE_ENV" in process.env)) {
    throw new Error("Tidak ada NODE_ENV");
}

// dibaca dari root
// read(folder).forEach(file => {
//     const fileName = parse(file).name;
//     // const filePath = resolve(join(folder, file));

//     config[fileName] = require(resolve(join(folder, file)));
// });

// Finalisasi, agar objek tidak bisa diubah-ubah
Object.freeze(config);

module.exports = config;
