const express = require("express");
const app = express();
const itemRoutes = require("./routes/items");
const ExpressError = require("./expressError");


app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use("/items", itemRoutes);

/** 404 error handler for if a route isn't found. */
app.use(function(req, res, next) {
    return new ExpressError("Route Not Found", 404);
});

/** General error handler. */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});

module.exports = app;