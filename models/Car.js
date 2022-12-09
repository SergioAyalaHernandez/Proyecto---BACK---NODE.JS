const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarSchema = Schema({
    name: String,
    description: String
});

module.exports = mongoose.model("Car",CarSchema);