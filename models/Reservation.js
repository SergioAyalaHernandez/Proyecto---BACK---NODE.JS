const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservationSchema = Schema({
    startDate: {type:Date,default: Date.now},
    devolutionDate: {type:Date,default: Date.now},
    status: String
});

module.exports = mongoose.model("Reservation",ReservationSchema);