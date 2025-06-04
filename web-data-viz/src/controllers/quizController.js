const quizModel = require("../models/quizModel");

function buscarPerguntas(req, res) {
  const idQuiz = req.params.idQuiz;

  quizModel.buscarPerguntasPorQuiz(idQuiz)
    .then(resultado => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhuma pergunta encontrada para este quiz!");
      }
    })
    .catch(erro => {
      console.error("Erro ao buscar perguntas:", erro);
      res.status(500).json({ erro: erro.message });
    });
}

function registrarResultado(req, res) {
  const { idUsuario, idQuiz, acertos, erros } = req.body;

  quizModel.registrarResultado(idUsuario, idQuiz, acertos, erros)
    .then(resultado => {
      res.status(200).json(resultado);
    })
    .catch(erro => {
      console.error("Erro ao registrar resultado:", erro);
      res.status(500).json({ erro: erro.message });
    });
}

function buscarResultados(req, res) {
  const idUsuario = req.params.idUsuario;

  quizModel.buscarResultadosPorUsuario(idUsuario)
    .then(resultado => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado para este usuário!");
      }
    })
    .catch(erro => {
      console.error("Erro ao buscar resultados:", erro);
      res.status(500).json({ erro: erro.message });
    });
}

module.exports = {
  buscarPerguntas,
  registrarResultado,
  buscarResultados,
};
