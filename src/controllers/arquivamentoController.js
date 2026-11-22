var arquivamentoModel = require("../models/arquivamentoModel");

function arquivar(req, res) {
  var idUsuario = req.body.idUsuario;
  var idArtigo = req.body.idArtigo;

  if (!idUsuario) return res.status(400).send("idUsuario undefined!");
  if (!idArtigo) return res.status(400).send("idArtigo undefined!");

  arquivamentoModel.arquivar(idUsuario, idArtigo)
    .then(function (resultado) {
      return res.status(201).json(resultado);
    })
    .catch(function (erro) {
      if (erro && erro.code === "ER_DUP_ENTRY") {
        return res.status(409).send("Artigo já arquivado por este usuário.");
      }
      console.log(erro);
      return res.status(500).json(erro.sqlMessage || erro);
    });
}

function desarquivar(req, res) {
  var idUsuario = req.params.idUsuario;
  var idArtigo = req.params.idArtigo;

  if (!idUsuario) return res.status(400).send("idUsuario undefined!");
  if (!idArtigo) return res.status(400).send("idArtigo undefined!");

  arquivamentoModel.desarquivar(idUsuario, idArtigo)
    .then(function (resultado) {
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      return res.status(500).json(erro.sqlMessage || erro);
    });
}

function listarPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  if (!idUsuario) return res.status(400).send("idUsuario undefined!");

  arquivamentoModel.listarPorUsuario(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) return res.status(200).json(resultado);
      return res.status(204).send("Nenhum artigo arquivado.");
    })
    .catch(function (erro) {
      console.log(erro);
      return res.status(500).json(erro.sqlMessage || erro);
    });
}

module.exports = {
  arquivar,
  desarquivar,
  listarPorUsuario
};