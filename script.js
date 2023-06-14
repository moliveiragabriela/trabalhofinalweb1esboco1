// Armazenando o nome do jogador
let playerName = '';

// Armazenando as perguntas e respostas carregadas do arquivo json
let questions = [];

// Índice da pergunta atual
let currentQuestionIndex = 0;

// Pontuação do jogador
let score = 0;

// Obtém referências aos elementos do DOM
const nameInput = document.getElementById('name');
const nameForm = document.getElementById('name-form');
const categoryButtons = document.getElementById('category-buttons');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultElement = document.getElementById('result');


// Função chamada quando o jogo começa
function startGame() {
  playerName = nameInput.value;
  if (playerName.trim() !== '') {
    nameForm.style.display = 'none';
    categoryButtons.style.display = 'block';
  }
}

// Função chamada ao carregar as perguntas de uma determinada categoria
function loadQuestions(category) {
  // Realize uma solicitação AJAX ou carregue as perguntas de algum outro modo
  // Neste exemplo, as perguntas são carregadas do arquivo JSON
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data[category];
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
      categoryButtons.style.display = 'none';
      questionContainer.style.display = 'block';
    });
}

// Função para exibir a próxima pergunta
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.onclick = () => checkAnswer(option.correct);
    optionsContainer.appendChild(button);
  });
}

// Função chamada quando o jogador seleciona uma resposta
function checkAnswer(isCorrect) {
  if (isCorrect) {
    score++;
    resultElement.textContent = 'Resposta correta!';
  } else {
    resultElement.textContent = 'Resposta incorreta!';
  }

  // Verifica se há mais perguntas
  if (currentQuestionIndex === questions.length - 1) {
    showResult();
  } else {
    currentQuestionIndex++;
    showQuestion();
  }
}

// Função para exibir o resultado final
function showResult() {
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  resultElement.textContent = `Parabéns, ${playerName}! Sua pontuação é ${score}/${questions.length}`;
}

// Função para salvar o estado do jogo no localStorage
function salvarEstadoJogo() {
    // Aqui você deve definir as informações que deseja salvar
    var estadoJogo = {
      perguntaAtual: perguntaAtual,
      pontuacao: pontuacao
      // Adicione outras informações relevantes do jogo que você deseja salvar
    };
  
    // Converta o objeto em uma string JSON
    var estadoJogoString = JSON.stringify(estadoJogo);
  
    // Salve o estado do jogo no localStorage
    localStorage.setItem('estadoJogo', estadoJogoString);
  }
  
  // Função para carregar o estado do jogo do localStorage
  function carregarEstadoJogo() {
    // Verifique se o estado do jogo foi salvo anteriormente
    if (localStorage.getItem('estadoJogo')) {
      // Recupere o estado do jogo em formato de string JSON
      var estadoJogoString = localStorage.getItem('estadoJogo');
  
      // Converta a string JSON de volta para um objeto
      var estadoJogo = JSON.parse(estadoJogoString);
  
      // Restaure as informações do jogo a partir do estado recuperado
      perguntaAtual = estadoJogo.perguntaAtual;
      pontuacao = estadoJogo.pontuacao;
      // Restaure outras informações relevantes do jogo
  
      // Continue o jogo a partir do estado restaurado
      exibirPergunta(perguntaAtual);
      exibirPontuacao(pontuacao);
      // Continue com outras ações necessárias para restaurar o jogo
    }
  }
  
  // Chame a função carregarEstadoJogo quando a página for carregada
  window.addEventListener('load', carregarEstadoJogo);
  
  // Chame a função salvarEstadoJogo sempre que ocorrer uma alteração no estado do jogo
  function respostaSelecionada() {
    // Lógica para processar a resposta selecionada
  
    // Salve o estado atual do jogo
    salvarEstadoJogo();
  }
  