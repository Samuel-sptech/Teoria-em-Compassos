const quizModel = require("../models/quizModel");

// Buscar perguntas e alternativas aninhadas
function buscarPerguntas(req, res) {
    const idQuiz = req.params.idQuiz;

    quizModel.buscarPerguntasPorQuiz(idQuiz)
        .then(resultado => {
            if (resultado.length > 0) {
                const perguntas = [];
                resultado.forEach(item => {
                    let pergunta = perguntas.find(p => p.id === item.idPergunta);
                    if (!pergunta) {
                        pergunta = {
                            id: item.idPergunta,
                            texto: item.texto_pergunta,
                            alternativas: []
                        };
                        perguntas.push(pergunta);
                    }
                    pergunta.alternativas.push({
                        id: item.idAlternativa,
                        texto: item.texto_alternativa,
                        correta: item.correta === 1 // retorna como booleano
                    });
                });

                res.status(200).json(perguntas);
            } else {
                res.status(204).send("Nenhuma pergunta encontrada para este quiz.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar perguntas:", erro);
            res.status(500).json({ erro: erro.message });
        });
}

// Registrar respostas (uma ou várias)
async function registrarResultado(req, res) {
    const { idUsuario, respostas } = req.body;

    if (!idUsuario || !respostas || !Array.isArray(respostas)) {
        return res.status(400).json({ erro: "Dados inválidos no corpo da requisição." });
    }

    try {
        const promises = respostas.map(resp => {
            return quizModel.registrarRespostaUsuario(
                idUsuario,
                resp.idPergunta,
                resp.idAlternativa,
                resp.correta ? 1 : 0
            );
        });

        await Promise.all(promises);

        res.status(200).json({ mensagem: "Respostas registradas com sucesso!" });
    } catch (erro) {
        console.error("Erro ao registrar respostas:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

// Buscar resultados agrupados por quiz
function buscarResultados(req, res) {
    const idUsuario = req.params.idUsuario;

    quizModel.buscarResultadosPorUsuario(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado para este usuário.");
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
