var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/pegarDados/:idUsuario", function(req, res) {
    dashboardController.pegarDados(req,res)
})