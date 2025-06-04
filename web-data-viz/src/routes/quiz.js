const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

// Buscar perguntas do quiz
router.get("/perguntas/:idQuiz", quizController.buscarPerguntas);

// Registrar resultado do quiz
router.post("/resultado", quizController.registrarResultado);

// Buscar resultados do usuário
router.get("/resultados/:idUsuario", quizController.buscarResultados);

module.exports = router;
