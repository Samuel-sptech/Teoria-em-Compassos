var database = require("../database/config");

function listarModulosComConteudos() {
    const instrucaoSql = `
        SELECT 
            m.idModulo, 
            m.nome AS nomeModulo, 
            m.descricao AS descricaoModulo,
            c.idConteudo, 
            c.titulo AS tituloConteudo, 
            c.descricao AS descricaoConteudo
        FROM modulo m
        LEFT JOIN conteudo c ON m.idModulo = c.fkModulo
        ORDER BY m.idModulo, c.idConteudo;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarModulosComConteudos
};
