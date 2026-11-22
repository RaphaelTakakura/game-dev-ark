document.getElementById("botao_arquivar").addEventListener("click", function () {
var idUsuario = sessionStorage.ID_USUARIO;
var idArtigo = Number(document.body.dataset.artigoId);

if (!idUsuario) {
alert("Faça login para arquivar.");
return;
}

fetch("/arquivamentos/arquivar", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ idUsuario: idUsuario, idArtigo: idArtigo })
})
.then(function (res) {
    if (!res.ok) return res.text().then(function (t) { throw new Error(t); });
    return res.json();
})
.then(function () {
    alert("Artigo arquivado com sucesso!");
})
.catch(function (erro) {
    alert("Erro ao arquivar: " + (erro.message || erro));
});
});