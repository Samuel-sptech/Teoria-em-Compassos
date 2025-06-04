var database = require("../database/config");

// 🔍 Buscar todas as perguntas de um determinado quiz
function buscarPerguntasPorQuiz(idQuiz) {
    const instrucaoSql = `
        SELECT 
            q.id AS id_pergunta,
            q.pergunta,
            a.id AS id_alternativa,
            a.texto,
            a.correta
        FROM pergunta q
        JOIN alternativa a ON q.id = a.pergunta_id
        WHERE q.quiz_id = ${idQuiz};
    `;
    return database.executar(instrucaoSql);
}

// 🔥 Registrar um acerto ou erro de um usuário
function registrarResultado(idUsuario, idQuiz, acertos, erros) {
    const instrucaoSql = `
        INSERT INTO resultado (usuario_id, quiz_id, acertos, erros, data)
        VALUES (${idUsuario}, ${idQuiz}, ${acertos}, ${erros}, NOW());
    `;
    return database.executar(instrucaoSql);
}

// 📊 Buscar histórico de resultados do usuário
function buscarResultadosPorUsuario(idUsuario) {
    const instrucaoSql = `
        SELECT 
            r.id,
            r.acertos,
            r.erros,
            r.data,
            q.nome AS nome_quiz
        FROM resultado r
        JOIN quiz q ON r.quiz_id = q.id
        WHERE r.usuario_id = ${idUsuario}
        ORDER BY r.data DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPerguntasPorQuiz,
    registrarResultado,
    buscarResultadosPorUsuario
};
