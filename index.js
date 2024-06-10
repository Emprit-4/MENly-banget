// Setup
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Configs dan logger
const config = require("./utils/config");
const http_log = require("./middlewares/http-logger");
const server_log = require("./utils/server-log");

// Middlewares
app.use(cors());
app.use(helmet());
app.use(http_log());

// Routes
app.get("/", (req, res) => res.send("Hallo"));

// Akhirnya, saatnya listen.
app.listen(config.server.port, config.server.address, server_log);