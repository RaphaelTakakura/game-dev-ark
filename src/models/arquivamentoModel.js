var database = require("../database/config");

function arquivar(idUsuario, idArtigo) {
  var instrucaoSql = `
    INSERT INTO artigo_arquivado (fk_usuario, fk_artigo)
    VALUES (${idUsuario}, ${idArtigo});
  `;
  return database.executar(instrucaoSql);
}

function desarquivar(idUsuario, idArtigo) {
  var instrucaoSql = `
    DELETE FROM artigo_arquivado
    WHERE fk_usuario = ${idUsuario} AND fk_artigo = ${idArtigo};
  `;
  return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
  var instrucaoSql = `
    SELECT 
      aa.fk_artigo AS idArtigo,
      a.titulo,
      a.data_publicacao
    FROM artigo_arquivado aa
    INNER JOIN artigo a ON a.id = aa.fk_artigo
    WHERE aa.fk_usuario = ${idUsuario}
    ORDER BY aa.data_arquivamento DESC;
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  arquivar,
  desarquivar,
  listarPorUsuario
};