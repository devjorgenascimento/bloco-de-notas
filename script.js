const mural = document.getElementById("mural");
const modal = document.getElementById("modal");
const novaNotaBtn = document.getElementById("novaNota");
const salvarNotaBtn = document.getElementById("salvarNota");
const fecharModalBtn = document.getElementById("fecharModal");

const tituloInput = document.getElementById("tituloInput");
const conteudoInput = document.getElementById("conteudoInput");

let notas = JSON.parse(localStorage.getItem("notas")) || [];

function salvarNoStorage() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function renderizarNotas() {
  mural.innerHTML = "";

  notas.forEach(nota => {
    const div = document.createElement("div");
    div.classList.add("postit");

    div.innerHTML = `
      <h3>${nota.titulo}</h3>
      <p>${nota.conteudo.substring(0, 60)}...</p>
    `;

    div.addEventListener("click", () => abrirNota(nota.id));

    mural.appendChild(div);
  });
}

function abrirNota(id) {
  const nota = notas.find(n => n.id === id);
  tituloInput.value = nota.titulo;
  conteudoInput.value = nota.conteudo;

  modal.classList.remove("hidden");

  salvarNotaBtn.onclick = () => {
    nota.titulo = tituloInput.value;
    nota.conteudo = conteudoInput.value;
    salvarNoStorage();
    renderizarNotas();
    modal.classList.add("hidden");
  };
}

novaNotaBtn.addEventListener("click", () => {
  tituloInput.value = "";
  conteudoInput.value = "";
  modal.classList.remove("hidden");

  salvarNotaBtn.onclick = () => {
    const novaNota = {
      id: Date.now(),
      titulo: tituloInput.value,
      conteudo: conteudoInput.value
    };

    notas.push(novaNota);
    salvarNoStorage();
    renderizarNotas();
    modal.classList.add("hidden");
  };
});

fecharModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

renderizarNotas();
