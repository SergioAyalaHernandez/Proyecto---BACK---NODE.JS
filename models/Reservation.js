const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GamaSchema = Schema({
    startDate: {type:Date,default: Date.now},
    devolutionDate: {type:Date,default: Date.now},
    status: String
});

module.exports = mongoose.model("Reservation",ReservationSchema);