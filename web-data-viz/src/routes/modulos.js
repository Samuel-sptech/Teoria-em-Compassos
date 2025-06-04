const express = require("express");
const router = express.Router();

const moduloController = require("../controllers/moduloController");

// 🔗 Rotas
router.get("/", moduloController.listar);
router.get("/:id", moduloController.buscarPorId);

module.exports = router;
