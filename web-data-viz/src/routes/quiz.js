const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

// Obter perguntas e alternativas aninhadas
router.get("/perguntas/:idQuiz", quizController.buscarPerguntas);

// Registrar respostas do usuário (em lote)
router.post("/resultado", quizController.registrarResultado);

// Buscar resultados do usuário
router.get("/resultados/:idUsuario", quizController.buscarResultados);

module.exports = router;
