//Classe responsável por controlar o sistema de registro de ponto
class SistemaPonto {

  //Inicializa as configurações e elementos da página
  constructor() {
    //Define a chave usada para armazenar os dados no localStorage
    this.chave = "pontos";

    //Obtém a lista onde o histórico será exibido
    this.lista = document.getElementById("lista");

    //Obtém o elemento que mostra a última batida registrada
    this.ultimaBatidaEl = document.getElementById("ultimaBatida");

    //Inicia o relógio da aplicação
    this.iniciarRelogio();

    //Atualiza a tela com os dados já salvos
    this.atualizarTela();
  }

  //Recupera os registros armazenados no navegador
  pegarDados() {
    return JSON.parse(localStorage.getItem(this.chave)) || [];
  }

  //Salva os registros no localStorage
  salvarDados(dados) {
    localStorage.setItem(this.chave, JSON.stringify(dados));
  }

  //Registra uma nova entrada ou saída
  registrar(tipo) {
    //Obtém a data e o horário atuais
    const agora = new Date();

    //Cria um objeto com as informações do registro
    const registro = {
      data: agora.toLocaleDateString(),
      hora: agora.toLocaleTimeString(),
      tipo: tipo
    };

    //Recupera os registros existentes
    const dados = this.pegarDados();

    //Adiciona o novo registro à lista
    dados.push(registro);

    //Salva a lista atualizada
    this.salvarDados(dados);

    //Atualiza as informações exibidas na tela
    this.atualizarTela();

    //Informa ao usuário que o registro foi realizado
    alert(`${tipo} registrada com sucesso!`);
  }

  //Atualiza o histórico de registros na tela
  atualizarTela() {
    const dados = this.pegarDados();

    //Limpa a lista antes de inserir os registros novamente
    this.lista.innerHTML = "";

    //Percorre todos os registros salvos
    dados.forEach(item => {
      const li = document.createElement("li");

      //Define o texto que será exibido no histórico
      li.textContent = `${item.data} - ${item.hora} - ${item.tipo}`;

      //Adiciona o registro à lista do histórico
      this.lista.appendChild(li);
    });

    //Atualiza a informação da última batida
    this.atualizarUltimaBatida(dados);
  }

  //Mostra na tela o último registro realizado
  atualizarUltimaBatida(dados) {

    //Caso não existam registros, mostra "N/A"
    if (dados.length === 0) {
      this.ultimaBatidaEl.textContent = "N/A";
      return;
    }

    //Obtém o último registro da lista
    const ultima = dados[dados.length - 1];

    //Exibe a data, hora e tipo da última batida
    this.ultimaBatidaEl.textContent =
      `${ultima.data} às ${ultima.hora} (${ultima.tipo})`;
  }

  //Inicia e atualiza o relógio da aplicação
  iniciarRelogio() {
    //Obtém os elementos responsáveis pela hora e data
    const horaEl = document.getElementById("hora");
    const dataEl = document.getElementById("data");

    //Função responsável por atualizar a data e o horário
    const atualizar = () => {
      const agora = new Date();

      //Exibe o horário atual
      horaEl.textContent = agora.toLocaleTimeString();

      //Exibe a data atual por extenso
      dataEl.textContent = agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    };

    //Faz a primeira atualização imediatamente
    atualizar();

    //Atualiza o relógio a cada segundo
    setInterval(atualizar, 1000);
  }
}

//Cria uma instância do sistema de ponto
const app = new SistemaPonto();

//Função chamada pelos botões de entrada e saída
function registrarPonto(tipo) {
  app.registrar(tipo);
}
