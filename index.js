// Impor modul utama
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Configs dan logger
const config = require("./utils/config");
const http_log = require("./middlewares/http-logger");
const server_log = require("./utils/server-log");

// Setup
const app = express();
const db = require("./utils/db-adapter");

// Middlewares
app.use(cors(config.cors));
app.use(helmet());
app.use(http_log());

// Routes
app.get("/emprit_check", (req, res) => res.status(200).send("Hallo"));

// Akhirnya, saatnya listen.
app.listen(config.server.port, config.server.address, server_log);