var database = require("../database/config")

function pegarDados(idUsuario) {
    var instrucaoSql = `
                        SELECT
                        IFNULL(COUNT(DISTINCT aa.fk_artigo),0) AS 'artigos_arquivados',
                        DATEDIFF(CURRENT_TIMESTAMP, dt_cadastro) AS 'data_conta',
                        IFNULL(COUNT(DISTINCT c.id),0) AS 'comentarios'
                        FROM usuario u LEFT JOIN artigo_arquivado aa ON aa.fk_usuario = u.id 
                        LEFT JOIN comentario c ON c.fk_usuario = u.id
                        WHERE u.id = ${idUsuario}
                        GROUP BY u.id;
                        `
    return database.executar(instrucaoSql)
}

module.exports = {
    pegarDados
};