"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(function () { return console.log("Connected to database successfully!"); }, function (error) { return console.log("Error connecting to database: ", error); });
};
exports.dbConnect = dbConnect;
