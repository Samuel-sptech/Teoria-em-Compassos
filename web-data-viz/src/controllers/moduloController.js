const moduloModel = require("../models/moduloModel");

// 🔍 Buscar módulo específico
async function buscarPorId(req, res) {
    const idModulo = req.params.id;

    try {
        const modulo = await moduloModel.buscarModuloPorId(idModulo);

        if (!modulo) {
            return res.status(404).json({ mensagem: "Módulo não encontrado." });
        }

        res.status(200).json(modulo);
    } catch (erro) {
        console.error("Erro ao buscar módulo:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

// 🚀 Listar todos os módulos
async function listar(req, res) {
    try {
        const modulos = await moduloModel.listarModulosComConteudos();
        res.status(200).json(modulos);
    } catch (erro) {
        console.error("Erro ao listar módulos:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    buscarPorId,
    listar
};
