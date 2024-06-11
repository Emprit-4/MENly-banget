const mongoose = require("mongoose");
const { DBLog } = require("./logger");
const models = require("./db-models");
const { isEmpty: _is_empty, isObject: _is_object } = require("lodash");

// Pembuatan adapter untuk database
// Untuk memudahkan maintaining dan proses CRUD
class DatabaseAdapter {
    static #db_uri = "";
    static #is_up = false;

    static connect(uri) {
        this.#db_uri = uri;
        const db = mongoose.connection;
        
        mongoose.connect(this.#db_uri);
        db.on("error", e => DBLog.error(e));
        db.once("open", () => {
            DBLog.info(`Berhasil terkoneksi ke ${this.#db_uri}`);
            this.#is_up = true;
        });

        return true;
    }

    static write(collection, doc) {
        // Cek2: collection nggak ada di model
        if (!(collection in models)) {
            throw new ReferenceError(`"${collection}" tidak ada dalam daftar model yang dibuat`);
        }
        
        // Ambil model, buat instancenya, lalu tulis ke db
        const cur_collection = models[collection];
        const instance = new cur_collection(doc);
        instance.save();
        
        return doc;
    }

    static setEventEmmiter(collection, callbacks) {
        // Cek apakah callbacks sebuah object ({})
        if (!_is_object(callbacks)) {
            throw new TypeError(`callbacks bukan sebuah object ({})`);
        }

        // Pasang observer ke collection yang diinginkan
        const collection_observer = models[collection].watch();
        const callback_keys = Object.keys(callbacks);
        
        for (let i = 0; i < callback_keys.length; i+=1) {
            collection_observer.on(
                callback_keys[i], 
                callbacks[callback_keys[i]]
            );
        }

        return true;
    }
}

// Untuk find, delete, dan update bisa pakai proxy
// Soalnya mongoose udah ngasih method buat semua itu


// Ekspor
module.exports = DatabaseAdapter;