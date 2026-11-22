const body = document.body;

const ID_ARTIGO = Number(document.body.dataset.artigoId);

window.onload = function () {
  listarComentarios();
};

function publicarComentario(event) {
    event.preventDefault(); 

    const idUsuario = sessionStorage.ID_USUARIO; 
    const titulo = document.getElementById("titulo").value.trim();
    const conteudo = document.getElementById("textarea_descricao").value.trim();

    const feedback = document.getElementById("feedback_comentario");
    feedback.innerHTML = "";

    
    if (!idUsuario) {
        feedback.innerHTML = "Faça login para comentar.";
        return false;
    }
    if (!titulo || !conteudo) {
        feedback.innerHTML = "Preencha título e conteúdo.";
        return false;
    }

    fetch(`/comentarios/publicar/${idUsuario}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        titulo: titulo,
        conteudo: conteudo,
        idArtigo: ID_ARTIGO
        })
    })
        .then(function (res) {
        if (!res.ok) return res.text().then(function (t) { throw new Error(t); });
        return res.json();
        })
        .then(function () {
        feedback.innerHTML = "Comentário publicado com sucesso!";
        limparFormulario();
        listarComentarios();
        })
        .catch(function (erro) {
        feedback.innerHTML = "Erro ao publicar: " + (erro.message || erro);
        });

    return false;
}

function listarComentarios() {
    const feed = document.getElementById("feed_comentarios");
    feed.innerHTML = "Carregando comentários...";

    fetch(`/comentarios/listar/${ID_ARTIGO}`)
        .then(function (res) {
        if (res.status === 204) return [];
        if (!res.ok) return res.text().then(function (t) { throw new Error(t); });
        return res.json();
        })
        .then(function (lista) {
        renderizarComentarios(lista);
        })
        .catch(function (erro) {
        feed.innerHTML = "Erro ao carregar comentários: " + (erro.message || erro);
        });
}

function renderizarComentarios(lista) {
    const feed = document.getElementById("feed_comentarios");
    const idUsuarioLogado = Number(sessionStorage.ID_USUARIO);

    if (!lista || lista.length === 0) {
        feed.innerHTML = "<p>Nenhum comentário ainda.</p>";
        return;
    }

    feed.innerHTML = "";

    lista.forEach(function (c) {
        const dono = Number(c.fk_usuario) === idUsuarioLogado || idUsuarioLogado == 1;

        const card = document.createElement("div");
        card.className = "comentario-card";
        card.innerHTML = `
        <h4>${escapeHtml(c.titulo)}</h4>
        <p>${escapeHtml(c.conteudo)}</p>
        <small>por ${escapeHtml(c.autor || "Usuário")} em ${formatarData(c.data_publicacao)}</small>
        ${dono ? `
            <div>
            <button onclick="deletarComentario(${c.id})">Deletar</button>
            </div>
        ` : ""}
        <hr>
        `;
        feed.appendChild(card);
    });
}

function deletarComentario(idComentario) {
    if (!confirm("Deseja realmente deletar este comentário?")) return;

    fetch(`/comentarios/deletar/${idComentario}`, {method: "DELETE"})
        .then(function (res) {
        if (!res.ok) return res.text().then(function (t) { throw new Error(t); });
        return res.json();
        })
        .then(function () {
        document.getElementById("feedback_comentario").innerHTML = "Comentário deletado.";
        listarComentarios();
        })
        .catch(function (erro) {
        document.getElementById("feedback_comentario").innerHTML = "Erro ao deletar: " + (erro.message || erro);
        }); 
}

function limparFormulario() {
  document.getElementById("form_comentario").reset();
}

function formatarData(dataStr) {
  if (!dataStr) return "-";
  const d = new Date(dataStr);
  return isNaN(d) ? dataStr : d.toLocaleString("pt-BR");
}

function escapeHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}