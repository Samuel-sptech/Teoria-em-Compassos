const database = require("../database/config");

// Buscar perguntas e alternativas de um quiz específico (por id do quiz)
function buscarPerguntasPorQuiz(idQuiz) {
    const instrucaoSql = `
    SELECT 
      p.id AS id_pergunta,
      p.pergunta,
      a.id AS id_alternativa,
      a.texto,
      a.correta
    FROM pergunta p
    JOIN alternativa a ON p.id = a.pergunta_id
    WHERE p.quiz_id = ?;
  `;
    return database.executar(instrucaoSql, [idQuiz]);
}

// Registrar resultado do usuário
function registrarResultado(idUsuario, idQuiz, acertos, erros) {
    const instrucaoSql = `
    INSERT INTO resultado (usuario_id, quiz_id, acertos, erros, data)
    VALUES (?, ?, ?, ?, NOW());
  `;
    return database.executar(instrucaoSql, [idUsuario, idQuiz, acertos, erros]);
}

// Buscar resultados de um usuário
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
    WHERE r.usuario_id = ?
    ORDER BY r.data DESC;
  `;
    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    buscarPerguntasPorQuiz,
    registrarResultado,
    buscarResultadosPorUsuario,
};
