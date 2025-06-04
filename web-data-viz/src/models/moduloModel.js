const database = require("../database/config");

// 🔍 Buscar módulo específico com seus conteúdos
async function buscarModuloPorId(idModulo) {
    const sqlModulo = `
        SELECT idModulo, nome, descricao
        FROM modulo
        WHERE idModulo = ${idModulo};
    `;
    const resultadoModulo = await database.executar(sqlModulo, [idModulo]);

    if (resultadoModulo.length === 0) {
        return null;
    }

    const modulo = resultadoModulo[0];

    // 🔗 Buscar conteúdos relacionados
    const sqlConteudos = `
        SELECT idConteudo, titulo, descricao
        FROM conteudo
        WHERE fkModulo = ${idModulo};
    `;
    const conteudos = await database.executar(sqlConteudos, [idModulo]);

    return {
        id: modulo.idModulo,
        titulo: modulo.nome,
        descricao: modulo.descricao,
        conteudos: conteudos.map(c => ({
            id: c.idConteudo,
            titulo: c.titulo,
            descricao: c.descricao
        }))
    };
}

// 🚀 Listar todos os módulos
async function listarModulosComConteudos() {
    const sql = `
        SELECT idModulo, nome, descricao
        FROM modulo;
    `;
    const resultado = await database.executar(sql);

    return resultado.map(m => ({
        id: m.idModulo,
        titulo: m.nome,
        descricao: m.descricao
    }));
}

module.exports = {
    buscarModuloPorId,
    listarModulosComConteudos
};
