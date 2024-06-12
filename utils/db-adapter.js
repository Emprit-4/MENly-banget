const mongoose = require("mongoose");
const { isEmpty: _is_empty, isObject: _is_object } = require("lodash");
const { DBLog } = require("./logger");
const { models, len: models_count } = require("./db-models");

// Pembuatan adapter untuk database
// Untuk memudahkan maintaining dan proses CRUD
class DatabaseAdapter {
    static opt = {
        models_count
    };

    static connect(uri) {
        this.opt.uri = uri;
        const db = mongoose.connection;
        
        mongoose.connect(this.opt.uri);
        db.on("error", e => DBLog.error(e));
        db.once("open", () => DBLog.info(`Berhasil terkoneksi ke ${this.opt.uri}`));

        return true;
    };

    static choose(collection) {
        // Cek2: collection nggak ada di model
        if (!(collection in models)) {
            throw new ReferenceError(`"${collection}" tidak ada dalam daftar model yang dibuat`);
        }
        
        const cur_collection = models[collection];
        
        return {
            cur_collection,
            write(doc) { return DatabaseAdapter.write(cur_collection, doc); },
            find(query) { return DatabaseAdapter.find(cur_collection, query); },
            update(query, doc) { return DatabaseAdapter.update(cur_collection, query, doc); },
            delete(doc) { return DatabaseAdapter.delete(cur_collection, doc); },
            watch(doc, ...args) { return DatabaseAdapter.watch(cur_collection, ...args); },
        };
    };
    
    static write(collection, doc) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const cur_collection = collection;
        const instance = new cur_collection(doc);
        instance.save();
        
        return doc;
    };

    static async find(collection, query) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const cur_collection = collection;
        
        const res = await cur_collection.find(query)
        return res;
    };

    static async update(collection, query, doc) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const cur_collection = collection;
        
        const res = await cur_collection.updateMany(query, doc);
        return res;
    };

    static async delete(collection, query) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const cur_collection = collection;
        
        await cur_collection.deleteMany(query);
        return true;
    };

    static watch(collection, callback, arg_pipelines = [], arg_options = {}) {
        // Cek apakah pipeline atau opt diberikan
        const pipelines = _is_empty(arg_pipelines) ? undefined : arg_pipelines;
        const options = _is_empty(arg_options) ? undefined : arg_options;

        // Pasang observer ke collection yang diinginkan
        const collection_observer = collection.watch(pipelines, options);
        collection_observer.on("change", callback);
        
        return true;
    };
};

// Ekspor
module.exports = DatabaseAdapter;