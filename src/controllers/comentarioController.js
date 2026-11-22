var comentarioModel = require("../models/comentarioModel");

function publicar(req, res) {
    var titulo = req.body.titulo;
    var conteudo = req.body.conteudo;
    var idArtigo = req.body.idArtigo;
    var idUsuario = req.params.idUsuario;

    if (!titulo) return res.status(400).send("Título undefined!");
    if (!conteudo) return res.status(400).send("Conteúdo undefined!");
    if (!idArtigo) return res.status(400).send("idArtigo undefined!");
    if (!idUsuario) return res.status(400).send("idUsuario undefined!");

    comentarioModel.publicar(titulo, conteudo, idArtigo, idUsuario)
        .then(function (resultado) {
            return res.status(201).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            return res.status(500).json(erro.sqlMessage || erro);
        });
}

function listarPorArtigo(req, res) {
    var idArtigo = req.params.idArtigo;

    if (!idArtigo) return res.status(400).send("idArtigo undefined!");

    comentarioModel.listarPorArtigo(idArtigo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                return res.status(200).json(resultado);
            } else {
                return res.status(204).send("Nenhum comentário encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            return res.status(500).json(erro.sqlMessage || erro);
        });
}

function editar(req, res) {
    var idComentario = req.params.idComentario;
    var conteudo = req.body.conteudo;
    var titulo = req.body.titulo;

    if (!idComentario) return res.status(400).send("idComentario undefined!");
    if (!conteudo) return res.status(400).send("Conteúdo undefined!");
    if (!titulo) return res.status(400).send("Título undefined!");

    comentarioModel.editar(idComentario, titulo, conteudo)
        .then(function (resultado) {
            return res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            return res.status(500).json(erro.sqlMessage || erro);
        });
}

function deletar(req, res) {
    var idComentario = req.params.idComentario;

    if (!idComentario) return res.status(400).send("idComentario undefined!");

    comentarioModel.deletar(idComentario)
        .then(function (resultado) {
            return res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            return res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    publicar,
    listarPorArtigo,
    editar,
    deletar
};