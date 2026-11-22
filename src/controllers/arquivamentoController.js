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

module.exports = {
  arquivar
};