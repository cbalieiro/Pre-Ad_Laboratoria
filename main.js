const questionnaireData = {
  firstQuestion: {
    questionText: "Quem era o vocalista da banda Queen?",
    selectionOptions: { 1: "Maddona", 2: "Freddie Mercury", 3: "Simone" },
    correctAnswer: 2,
  },
  secondQuestion: {
    questionText: "Quem descobriu o Brasil?",
    selectionOptions: {
      1: "Cristóvão Colombo",
      2: "Maria Madalena",
      3: "Pedro Alvares Cabral",
    },
    correctAnswer: 3,
  },
  thirdQuestion: {
    questionText: "Quem é Gal Costa?",
    selectionOptions: { 1: "Cantora", 2: "Modelo", 3: "Atriz" },
    correctAnswer: 1,
  },
};

const CONFIRMATION_YES = "SIM";
const CONFIRMATION_NO = "NÃO";

const confirmationOptions = {
  1: CONFIRMATION_YES,
  2: CONFIRMATION_NO,
};

const goBack = () => {
  window.location.reload();
};

const handleError = (error) => {
  console.error("A página enfrentou problemas:", error);
  goBack();
}

const clearPage = () => {
  let hiddenElement = window.document.getElementById("container");
  if (hiddenElement) {
    hiddenElement.remove();
  }
  const result = window.document.getElementById("resultado");
  if (result) {
    try {
      result.style.removeProperty("display");
    } catch (error) {
      handleError(error);
    }
  }
};

const checkAnswerValidity = (userResponse) => {
  if (!Object.values(confirmationOptions).includes(userResponse)) {
    alert("Entrada inválida. Por favor, tente novamente e insira um número correspondente a uma opção válida.");
    return false;
  }
  if (userResponse === CONFIRMATION_NO) {
    alert("Okay, obrigado e até logo");
    return false;
  }
  if (userResponse === CONFIRMATION_YES) {
    alert("Okay, Vamos lá... Boa sorte!");
    return true;
  }
};

const createOutputDiv = (text, className) => {
  const div = document.createElement("div");
  div.innerText = text;
  div.className = className;
  return div;
};

function startQuiz() {
  let userName = prompt("Digite o seu nome (ou deixe em branco para usar 'Visitante'):") || "Visitante";
  let userConfirmation =
    confirmationOptions[
    Number(
      prompt(
        "Coloque o número correspondente à sua resposta. Quer iniciar o teste? (1) SIM | (2) NÃO"
      )
    )
    ] || null;
  const renderQuestionDisplay = checkAnswerValidity(userConfirmation);
  if (renderQuestionDisplay) {
    showQuizQuestions(renderQuestionDisplay, userName);
  }
}


function collectUserAnswers() {
  let correctAnswers = 0;
  let wrongAnswers = 0;
  const userAnswers = [];


  for (let [_, currentQuestion] of Object.entries(
    questionnaireData)) {
    let resposta;
    do {
      resposta = Number(
        prompt(
          `${currentQuestion.questionText}\n1) ${currentQuestion.selectionOptions[1]}\n2) ${currentQuestion.selectionOptions[2]}\n3) ${currentQuestion.selectionOptions[3]}`
        )
      );
      if (isNaN(resposta) || ![1, 2, 3].includes(resposta)) {
        alert("Por favor, insira um número válido entre 1 e 3.");
      }
    } while (isNaN(resposta) || ![1, 2, 3].includes(resposta));
    userAnswers.push(resposta);
    if (resposta === currentQuestion.correctAnswer) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  }

  return { correctAnswers, wrongAnswers, userAnswers };
}

function showQuizQuestions(shouldDisplay, userName) {
  if (!shouldDisplay) {
    return;
  }

  const { correctAnswers, wrongAnswers } = collectUserAnswers();

  clearPage();

  const greetingElement = window.document.getElementById("saudacao");
  if (greetingElement) {
    try {
      greetingElement.innerText = "Olá, " + userName + "!";
    } catch (error) {
      handleError(error);
    }
  }

  const correctDiv = createOutputDiv("Você acertou " + correctAnswers, "resultado-correto");
  const wrongDiv = createOutputDiv("Você errou " + wrongAnswers, "resultado-errado");
  const resultElement = window.document.getElementById("container-resultado");
  if (resultElement) {
    try {
      resultElement.appendChild(correctDiv);
      resultElement.appendChild(wrongDiv);
    } catch (error) {
      handleError(error);
    }
  }
}
