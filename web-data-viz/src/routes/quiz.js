var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController"); // corrigido aqui

// 🔍 Buscar perguntas de um quiz
router.get("/perguntas/:idQuiz", function (req, res) {
    quizController.buscarPerguntas(req, res);
});

// 💾 Registrar resultado do quiz
router.post("/resultado", function (req, res) {
    quizController.registrarResultado(req, res);
});

// 📊 Buscar resultados anteriores de um usuário
router.get("/resultados/:idUsuario", function (req, res) {
    quizController.buscarResultados(req, res);
});

module.exports = router;
