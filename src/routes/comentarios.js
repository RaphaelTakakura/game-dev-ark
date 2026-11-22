var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.post("/publicar/:idUsuario", function (req, res) {
    comentarioController.publicar(req, res);
});

router.get("/listar/:idArtigo", function (req, res) {
    comentarioController.listarPorArtigo(req, res);
});

router.delete("/deletar/:idComentario", function (req, res) {
    comentarioController.deletar(req, res);
});

module.exports = router;