var express = require("express");
var router = express.Router();

var arquivamentoController = require("../controllers/arquivamentoController");

router.post("/arquivar", function (req, res) {
  arquivamentoController.arquivar(req, res);
});

router.delete("/desarquivar/:idUsuario/:idArtigo", function (req, res) {
  arquivamentoController.desarquivar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
  arquivamentoController.listarPorUsuario(req, res);
});

module.exports = router;