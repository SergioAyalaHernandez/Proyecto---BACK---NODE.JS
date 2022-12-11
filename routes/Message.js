var express = require("express");
var messageController = require("../controllers/Message");

var router = express.Router();

router.post("/save",messageController.save);
router.put("/update/:id",messageController.update);
router.delete("/delete/:id",messageController.eliminar);
router.get("/listar",messageController.listarMensajes);

module.exports = router;