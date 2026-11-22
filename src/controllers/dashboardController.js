var dashboardModel = require("../models/dashboardModel");

function pegarDados(req, res) {

    var idUsuario = req.params.idUsuario

    if (!idUsuario) return res.status(400).send("idUsuario undefined!");

    dashboardModel.pegarDados(idUsuario)
    .then (function (resultado) {
      if (resultado.length > 0) return res.status(200).json(resultado[0]);
      return res.status(204).send("Sem dados para este usuário.");
    })
    .catch(function (erro) {
      console.log(erro);
      return res.status(500).json(erro.sqlMessage || erro);
    });
}

module.exports = {
    pegarDados
}