var express = require("express");
var carController = require("../controllers/Car");

var router = express.Router();

router.post("/save",carController.save);
router.put("/update/:id",carController.update);
router.delete("/delete/:id",carController.eliminar);
router.get("/listar",carController.listarCarros);
router.get("/mostrar/:id",carController.mostrarCar)

module.exports = router;