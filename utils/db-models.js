const { readdirSync: read } = require("fs");
const { join, resolve, parse } = require("path");
const { DBLog } = require("./logger");

const folder = "models";
const models = {};

// baca semua models (bukan schema) yang ada di folder models
read(folder).forEach(file => {
    const filename = parse(file).name;
    const filepath = resolve(join(folder, file));
    
    models[filename] = require(filepath);
});

const len = Object.keys(models).length;
DBLog.debug(`Terbaca ${len} model`);

module.exports = { models, len };