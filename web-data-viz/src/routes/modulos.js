var express = require("express");
var router = express.Router();

var moduloController = require("../controllers/moduloController");

router.get("/:empresaId", function (req, res) {
  moduloController.listarModulosComConteudos(req, res);
});

router.post("/cadastrar", function (req, res) {
  moduloController.cadastrar(req, res);
})

module.exports = router;