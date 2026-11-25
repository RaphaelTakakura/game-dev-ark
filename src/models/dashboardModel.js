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
                        GROUP BY u.id;`

    return database.executar(instrucaoSql)
}

function pegarDados2(idUsuario) {
    var instrucaoSql = `SELECT
                        i.id AS id_interesse,
                        i.nome AS interesse,
                        COUNT(DISTINCT a.id) AS total_artigos,
                        COUNT(DISTINCT aa.fk_artigo) AS artigos_arquivados
                        FROM interesse i
                        LEFT JOIN artigo a
                        ON a.fk_interesse = i.id
                        LEFT JOIN artigo_arquivado aa
                        ON aa.fk_artigo = a.id
                        AND aa.fk_usuario = ${idUsuario}
                        GROUP BY i.id, i.nome
                        ORDER BY i.id;`
    
    return database.executar(instrucaoSql)
}

function pegarDados3(idUsuario) {
    
    var instrucaoSql = `
                        SELECT
                        i.id AS id_interesse,
                        i.nome AS interesse,
                        COUNT(c.id) AS qtd_comentarios
                        FROM interesse i
                        LEFT JOIN artigo a
                        ON a.fk_interesse = i.id
                        LEFT JOIN comentario c
                        ON c.fk_artigo = a.id
                        AND c.fk_usuario = ${idUsuario}
                        GROUP BY i.id, i.nome
                        ORDER BY i.id;
                    `;

  return database.executar(instrucaoSql);
}

module.exports = {
    pegarDados,
    pegarDados2,
    pegarDados3
};