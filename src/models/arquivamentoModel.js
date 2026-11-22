var database = require("../database/config");

function arquivar(idUsuario, idArtigo) {
  var instrucaoSql = `
    INSERT INTO artigo_arquivado (fk_usuario, fk_artigo)
    VALUES (${idUsuario}, ${idArtigo});
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  arquivar
};