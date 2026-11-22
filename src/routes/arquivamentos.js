var express = require("express");
var router = express.Router();

var arquivamentoController = require("../controllers/arquivamentoController");

router.post("/arquivar", function (req, res) {
  arquivamentoController.arquivar(req, res);
});

module.exports = router;