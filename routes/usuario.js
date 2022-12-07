var express = require("express");
var userController = require("../controllers/usuario");

var router = express.Router();

router.get("/probando", userController.probando);
router.post("/testeando", userController.testeando);
router.post("/save",userController.save);
router.post("/login",userController.login);
router.delete("/delete/:id",userController.eliminar);
router.put("/update/:id",userController.update);
router.get("/listarU",userController.listarUsuarios);
router.get("/mostrarS/:id",userController.mostrarUsuario);

module.exports = router;