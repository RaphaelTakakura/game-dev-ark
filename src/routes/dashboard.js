var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/pegarDados/:idUsuario", function(req, res) {
    dashboardController.pegarDados(req,res)
})

router.get("/pegarDados2/:idUsuario", function(req, res) {
    dashboardController.pegarDados2(req,res)
})

router.get("/pegarDados3/:idUsuario", function(req, res) {
    dashboardController.pegarDados3(req,res)
})

module.exports = router;