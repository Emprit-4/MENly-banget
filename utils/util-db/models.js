/// Menghindari dynamic import; tidak bisa dibundle webpack ///
// const { readdirSync: read } = require("fs");
// const { join, resolve, parse } = require("path");
const { DBLog } = require("../logger");

// const folder = "models";
// const models = {};
const models = require("../../models");

// baca semua models (bukan schema) yang ada di folder models
// read(folder).forEach(file => {
//     const fileName = parse(file).name;
//     // const filePath = resolve(join(folder, file));

//     models[fileName] = require(resolve(join(folder, file)));
// });

const modelsCount = Object.keys(models).length;
DBLog.debug(`Terbaca ${modelsCount} model`);

module.exports = { models, modelsCount };
