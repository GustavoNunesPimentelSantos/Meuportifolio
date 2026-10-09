let tabuleiro = Array(9).fill("");
let jogador = "X";
let meuSimbolo = "X";
let modoJogo = "";
let terminou = false;
let pensando = false;
let timerIA = null;

const casas = document.querySelectorAll(".casa");
const mensagem = document.getElementById("mensagem");
const menu = document.getElementById("menu");
const escolha = document.getElementById("escolha");
const jogo = document.getElementById("jogo");
const modoTexto = document.getElementById("modo");

const vitorias = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Placar da sessão atual
let placar = {
  vitorias: 0,
  derrotas: 0,
  empates: 0
};

function escolherModo(modo) {
  modoJogo = modo;
  menu.hidden = true;
  escolha.hidden = false;
}

function iniciarJogo(simbolo) {
  meuSimbolo = simbolo;
  escolha.hidden = true;
  jogo.hidden = false;

  modoTexto.textContent =
    modoJogo === "ia" ? "🤖 Você contra a IA" : "👥 VS Amigo";

  atualizarPlacar();
  reiniciar();
}

function jogar(posicao) {
  if (
    terminou ||
    pensando ||
    tabuleiro[posicao] !== ""
  ) return;

  // No modo IA, só o jogador humano pode clicar.
  if (modoJogo === "ia" && jogador !== meuSimbolo) {
    return;
  }

  tabuleiro[posicao] = jogador;
  atualizar();

  if (verificarFim()) return;

  jogador = jogador === "X" ? "O" : "X";

  if (modoJogo === "ia") {
    turnoIA();
  } else {
    mensagem.textContent = "Vez do jogador " + jogador + "!";
    atualizar();
  }
}

function turnoIA() {
  pensando = true;
  mensagem.textContent = "🤖 A IA está pensando...";
  atualizar();

  timerIA = setTimeout(() => {
    timerIA = null;

    if (terminou || modoJogo !== "ia") {
      pensando = false;
      atualizar();
      return;
    }

    const vazias = tabuleiro
      .map((casa, i) => casa === "" ? i : -1)
      .filter(i => i !== -1);

    if (vazias.length > 0) {
      const sorteada = Math.floor(
        Math.random() * vazias.length
      );

      tabuleiro[vazias[sorteada]] = jogador;
    }

    pensando = false;

    if (verificarFim()) return;

    jogador = meuSimbolo;
    mensagem.textContent = "Sua vez! Você é " + meuSimbolo + ".";
    atualizar();
  }, 600);
}

function verificarFim() {
  for (const combinacao of vitorias) {
    const [a, b, c] = combinacao;

    if (
      tabuleiro[a] !== "" &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[b] === tabuleiro[c]
    ) {
      terminou = true;

      const vencedor = tabuleiro[a];

      if (modoJogo === "ia") {
        if (vencedor === meuSimbolo) {
          placar.vitorias++;
          mensagem.textContent = "🎉 Você venceu!";
        } else {
          placar.derrotas++;
          mensagem.textContent = "🤖 A IA venceu!";
        }
      } else {
        if (vencedor === "X") {
          placar.vitorias++;
          mensagem.textContent = "🏆 Jogador X venceu!";
        } else {
          placar.derrotas++;
          mensagem.textContent = "🏆 Jogador O venceu!";
        }
      }

      atualizarPlacar();
      atualizar();
      return true;
    }
  }

  if (tabuleiro.every(casa => casa !== "")) {
    terminou = true;
    placar.empates++;
    mensagem.textContent = "🤝 Empate!";
    atualizarPlacar();
    atualizar();
    return true;
  }

  return false;
}

function atualizar() {
  casas.forEach((casa, i) => {
    casa.textContent = tabuleiro[i];

    casa.style.color =
      tabuleiro[i] === "X" ? "#60a5fa" : "#f472b6";

    casa.disabled =
      terminou ||
      pensando ||
      tabuleiro[i] !== "" ||
      (modoJogo === "ia" && jogador !== meuSimbolo);
  });
}

function atualizarPlacar() {
  document.getElementById("vitorias").textContent =
    placar.vitorias;

  document.getElementById("derrotas").textContent =
    placar.derrotas;

  document.getElementById("empates").textContent =
    placar.empates;

  document.getElementById("labelVitorias").textContent =
    modoJogo === "ia" ? "Suas vitórias" : "Vitórias X";

  document.getElementById("labelDerrotas").textContent =
    modoJogo === "ia" ? "Vitórias IA" : "Vitórias O";
}

function reiniciar() {
  if (timerIA !== null) {
    clearTimeout(timerIA);
    timerIA = null;
  }

  tabuleiro = Array(9).fill("");
  jogador = "X";
  terminou = false;
  pensando = false;

  if (modoJogo === "ia" && meuSimbolo === "O") {
    mensagem.textContent = "🤖 A IA vai começar...";
    atualizar();

    turnoIA();
    return;
  }

  mensagem.textContent =
    modoJogo === "ia"
      ? "Sua vez! Você é X."
      : "Vez do jogador X!";

  atualizar();
}

function zerarPlacar() {
  placar = {
    vitorias: 0,
    derrotas: 0,
    empates: 0
  };

  atualizarPlacar();
}

function voltarMenu() {
  if (timerIA !== null) {
    clearTimeout(timerIA);
    timerIA = null;
  }

  pensando = false;
  terminou = true;
  jogo.hidden = true;
  escolha.hidden = true;
  menu.hidden = false;
}
