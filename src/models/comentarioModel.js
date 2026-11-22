var database = require("../database/config");

function publicar(titulo, conteudo, idArtigo, idUsuario) {
    var instrucaoSql = `
        INSERT INTO comentario (titulo, conteudo, fk_artigo, fk_usuario)
        VALUES ('${titulo}', '${conteudo}', ${idArtigo}, ${idUsuario});
    `;
    return database.executar(instrucaoSql);
}

function listarPorArtigo(idArtigo) {
    var instrucaoSql = `
        SELECT
            c.id,
            c.titulo,
            c.conteudo,
            c.data_publicacao,
            c.fk_artigo,
            c.fk_usuario,
            u.usuario AS autor
        FROM comentario c
        INNER JOIN usuario u ON u.id = c.fk_usuario
        WHERE c.fk_artigo = ${idArtigo}
        ORDER BY c.data_publicacao DESC;
    `;
    return database.executar(instrucaoSql);
}

function deletar(idComentario) {
    var instrucaoSql = `
        DELETE FROM comentario
        WHERE id = ${idComentario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    publicar,
    listarPorArtigo,
    deletar
};