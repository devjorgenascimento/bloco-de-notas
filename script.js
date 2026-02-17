const mural = document.getElementById("mural");
const modal = document.getElementById("modal");
const novaNotaBtn = document.getElementById("novaNota");
const voltarBtn = document.getElementById("voltarBtn");

const tituloInput = document.getElementById("tituloInput");
const conteudoInput = document.getElementById("conteudoInput");

let notas = JSON.parse(localStorage.getItem("notas")) || [];
let notaAtualId = null;

const cores = [
  "#FFD966",
  "#FF8FAB",
  "#A0E7E5",
  "#B4F8C8",
  "#FFAEBC",
  "#CDB4DB"
];

function pegarCorAleatoria() {
  return cores[Math.floor(Math.random() * cores.length)];
}

function salvarNoStorage() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function renderizarNotas() {
  mural.innerHTML = "";

  notas.forEach(nota => {
    const div = document.createElement("div");
    div.classList.add("postit");
    div.style.background = nota.cor;

    div.innerHTML = `
      <h3>${nota.titulo || "Sem título"}</h3>
      <p>${nota.conteudo.substring(0, 60)}...</p>
    `;

    div.addEventListener("click", () => abrirNota(nota.id));
    mural.appendChild(div);
  });
}

function abrirNota(id) {
  const nota = notas.find(n => n.id === id);
  notaAtualId = id;

  tituloInput.value = nota.titulo;
  conteudoInput.value = nota.conteudo;

  modal.style.background = nota.cor;
  modal.classList.remove("hidden");
}

function salvarNotaAtual() {
  if (notaAtualId === null) return;

  const nota = notas.find(n => n.id === notaAtualId);
  nota.titulo = tituloInput.value;
  nota.conteudo = conteudoInput.value;

  salvarNoStorage();
}

voltarBtn.addEventListener("click", () => {
  salvarNotaAtual();
  renderizarNotas();
  modal.classList.add("hidden");
  notaAtualId = null;
});

novaNotaBtn.addEventListener("click", () => {
  const novaNota = {
    id: Date.now(),
    titulo: "",
    conteudo: "",
    cor: pegarCorAleatoria()
  };

  notas.push(novaNota);
  salvarNoStorage();
  renderizarNotas();
  abrirNota(novaNota.id);
});

renderizarNotas();
