/** @format */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");

// import seed for making fake users
// const { seedUser } = require("./seed");

// express app
const app = express();
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(
    OpenApiValidator.middleware({
        apiSpec: "../swagger.yaml", // ./swagger.yaml
    })
);

app.get("/health", (_req, res) => {
    res.status(200).json({
        health: "OK",
    });
});

app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

let connetionURL = `${process.env.DB_CONNECTION_URL}/${process.env.DB_NAME}`;
let PORT = process.env.PORT;

mongoose
    .connect(connetionURL)
    .then(() => {
        console.log("Database connection established");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            // seedUser();  we used this for making fake users
        });
    })
    .catch((err) => {
        console.log("DAtabase connection failed");
        console.log("message: " + err.message);
    });
