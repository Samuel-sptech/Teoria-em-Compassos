const database = require("../database/config");

// Buscar perguntas e alternativas de um quiz específico
function buscarPerguntasPorQuiz(idQuiz) {
    const instrucaoSql = `
        SELECT 
            p.idPergunta,
            p.texto_pergunta,
            a.idAlternativa,
            a.texto_alternativa,
            a.correta
        FROM pergunta p
        JOIN alternativa a ON p.idPergunta = a.fkPergunta
        WHERE p.fkQuiz = ?;
    `;
    return database.executar(instrucaoSql, [idQuiz]);
}

// Registrar resposta individual do usuário
function registrarRespostaUsuario(idUsuario, idPergunta, idAlternativa, correta) {
    const instrucaoSql = `
        INSERT INTO resposta_usuario (fkUsuario, fkPergunta, fkAlternativa, correta, dt_resposta)
        VALUES (?, ?, ?, ?, NOW());
    `;
    return database.executar(instrucaoSql, [idUsuario, idPergunta, idAlternativa, correta]);
}

// Buscar resultados do usuário agrupando por quiz
function buscarResultadosPorUsuario(idUsuario) {
    const instrucaoSql = `
        SELECT 
            q.idQuiz,
            q.titulo AS nome_quiz,
            COUNT(r.idResposta) AS total_respostas,
            SUM(r.correta) AS total_acertos,
            (COUNT(r.idResposta) - SUM(r.correta)) AS total_erros,
            MAX(r.dt_resposta) AS ultima_resposta
        FROM resposta_usuario r
        JOIN pergunta p ON r.fkPergunta = p.idPergunta
        JOIN quiz q ON p.fkQuiz = q.idQuiz
        WHERE r.fkUsuario = ?
        GROUP BY q.idQuiz, q.titulo
        ORDER BY ultima_resposta DESC;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    buscarPerguntasPorQuiz,
    registrarRespostaUsuario,
    buscarResultadosPorUsuario,
};
