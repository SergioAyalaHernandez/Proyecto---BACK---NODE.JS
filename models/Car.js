const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarSchema = Schema({
    name: String,
    brand: String,
    year: String,
    description: String,
    payDay:String,
    link:String
});

module.exports = mongoose.model("Car",CarSchema);