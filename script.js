const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeaXaMaIJYTtqtaoFwXIt-IHmmzlItEvHArzGdunkVAtSzDIA/formResponse";

const ENTRY_PATRIMONIO = "entry.751175476";
const ENTRY_DEM = "entry.1676378611";

const SENHA = "145";

let etapa = 0;
let votos = {};

iniciar();

function iniciar() {
  etapa = 0;
  votos = {};
  mostrarTelaSenha();
}

function mostrarTelaSenha() {
  document.getElementById("titulo").innerText = "Validação do Mesário";
  document.getElementById("tela").innerText =
    "Clique na tela para liberar a votação";
}

function validarSenha() {
  const senha = prompt("Senha do mesário:");

  if (senha !== SENHA) {
    alert("Senha incorreta!");
    return;
  }

  etapa = 1;
  mostrarVotacao();
}

function mostrarVotacao() {
  const titulo = document.getElementById("titulo");
  const tela = document.getElementById("tela");

  if (etapa === 1) {
    titulo.innerText = "Patrimônio 2026–2027";
    tela.innerText = "Votação Para o Patrimônio";
  }

  if (etapa === 2) {
    titulo.innerText = "DEM 2026";
    tela.innerText = "Votação para o DEM";
  }
}

function votar(opcao) {
  if (etapa === 0) return;

  votos[etapa] = opcao;

  if (etapa === 1) {
    etapa = 2;
    mostrarVotacao();
  } else {
    enviarVotos();
  }
}

function enviarVotos() {
  const tela = document.getElementById("tela");
  tela.innerText = "Registrando votos...";

  const formData = new FormData();
  formData.append(ENTRY_PATRIMONIO, votos[1]);
  formData.append(ENTRY_DEM, votos[2]);

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    tela.innerText =
      "VOTOS REGISTRADOS COM SUCESSO!\n\nAguardando próximo eleitor...";
    setTimeout(iniciar, 100);
  });
}

// Clique do mesário para iniciar
document.getElementById("tela").addEventListener("click", () => {
  if (etapa === 0) validarSenha();
});


