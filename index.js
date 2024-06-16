// Impor modul utama
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const config = require("./utils/util-config");
const db = require("./utils/util-db");

// Impor logger
const httpLog = require("./middlewares/http-logger");
const startupLog = require("./utils/startup-log");

// Setup
const app = express();
db.connect(process.env.MONGODB_URI);

// Middlewares
app.use(cors(config.cors));
app.use(helmet());
app.use(httpLog());

// Routes
app.get("/emprit_check", (req, res) => res.status(200).send("Hallo"));

// Akhirnya, saatnya listen.
app.listen(config.server.port, config.server.address, startupLog);
