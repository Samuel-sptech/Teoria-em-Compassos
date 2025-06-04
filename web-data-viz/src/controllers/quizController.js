var quizModel = require("../models/quizModel");

// 🎯 Buscar perguntas e alternativas de um quiz específico
function buscarPerguntas(req, res) {
    var idQuiz = req.params.idQuiz;

    console.log(`🎯 Buscando perguntas do quiz com id ${idQuiz}`);

    quizModel.buscarPerguntasPorQuiz(idQuiz).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhuma pergunta encontrada para este quiz!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("❌ Erro ao buscar perguntas:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// 💾 Registrar o resultado do quiz
function registrarResultado(req, res) {
    var idUsuario = req.body.idUsuario;
    var idQuiz = req.body.idQuiz;
    var acertos = req.body.acertos;
    var erros = req.body.erros;

    console.log(`💾 Registrando resultado: Usuário ${idUsuario} | Quiz ${idQuiz} | Acertos ${acertos} | Erros ${erros}`);

    quizModel.registrarResultado(idUsuario, idQuiz, acertos, erros).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("❌ Erro ao registrar resultado:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// 📊 Buscar resultados anteriores de um usuário
function buscarResultados(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`📊 Buscando resultados do usuário ${idUsuario}`);

    quizModel.buscarResultadosPorUsuario(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado para este usuário!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("❌ Erro ao buscar resultados:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarPerguntas,
    registrarResultado,
    buscarResultados
};
