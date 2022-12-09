var express = require("express");
var gamaController = require("../controllers/Gama");

var router = express.Router();


router.post("/save",gamaController.save);


module.exports = router;