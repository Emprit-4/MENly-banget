const mongoose = require("mongoose");
const { isEmpty } = require("lodash");
const { DBLog } = require("../logger");
const { models, modelsCount } = require("./models");

// Pembuatan adapter untuk database
// Untuk memudahkan maintaining dan proses CRUD
class DatabaseAdapter {
    static opt = {
        modelsCount
    };

    static connect(uri) {
        if(!uri) {
            DBLog.warn("uri tidak diberikan, sehingga tidak akan tersambung ke database");
            return false;
        }

        this.opt.uri = uri;
        const db = mongoose.connection;
        
        mongoose.connect(this.opt.uri);
        db.on("error", e => DBLog.error(e));
        db.once("open", () => DBLog.info(`Berhasil terkoneksi ke ${this.opt.uri}`));

        return true;
    }

    static choose(collection) {
        // Cek2: collection nggak ada di model
        if (!(collection in models)) {
            throw new ReferenceError(`"${collection}" tidak ada dalam daftar model yang dibuat`);
        }
        
        const curCollection = models[collection];
        
        return {
            curCollection,
            write(doc) { return DatabaseAdapter.write(curCollection, doc); },
            find(query) { return DatabaseAdapter.find(curCollection, query); },
            update(query, doc) { return DatabaseAdapter.update(curCollection, query, doc); },
            delete(doc) { return DatabaseAdapter.delete(curCollection, doc); },
            watch(...args) { return DatabaseAdapter.watch(curCollection, ...args); },
        };
    }
    
    static write(collection, doc) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const curCollection = collection;
        const instance = new curCollection(doc);
        instance.save();
        
        return doc;
    }

    static async find(collection, query) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const curCollection = collection;
        
        const res = await curCollection.find(query);
        return res;
    }

    static async update(collection, query, doc) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const curCollection = collection;
        
        const res = await curCollection.updateMany(query, doc);
        return res;
    }

    static async delete(collection, query) {
        // Ambil model, buat instancenya, lalu tulis ke db
        const curCollection = collection;
        
        await curCollection.deleteMany(query);
        return true;
    }

    static watch(collection, callback, argPipelines = [], argOptions = {}) {
        // Cek apakah pipeline atau opt diberikan
        const pipelines = isEmpty(argPipelines) ? undefined : argPipelines;
        const options = isEmpty(argOptions) ? undefined : argOptions;

        // Pasang observer ke collection yang diinginkan
        const collectionObserver = collection.watch(pipelines, options);
        collectionObserver.on("change", callback);
        
        return true;
    }
};

// Ekspor
module.exports = DatabaseAdapter;