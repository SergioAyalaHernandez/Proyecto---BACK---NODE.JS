var express = require("express");
var userController = require("../controllers/usuario");

var router = express.Router();

router.post("/save",userController.save);
router.post("/login",userController.login);
router.delete("/delete/:id",userController.eliminar);
router.put("/update/:id",userController.update);
router.get("/listar",userController.listarUsuarios);
router.get("/mostrar/:id",userController.mostrarUsuario);

module.exports = router;