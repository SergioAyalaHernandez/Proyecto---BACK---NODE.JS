const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: String,
    surname: String,
    email: String,
    pass: String,
    image: String,
    role: String
});

module.exports = mongoose.model("Usuario",UsuarioSchema);
