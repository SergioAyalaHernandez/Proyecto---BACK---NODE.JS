var express = require("express");
var reservationController = require("../controllers/Reservation");

var router = express.Router();

router.post("/save",reservationController.save);
router.put("/update/:id",reservationController.update);
router.delete("/delete/:id",reservationController.eliminar);
router.get("/listar",reservationController.listarreservations);

module.exports = router;