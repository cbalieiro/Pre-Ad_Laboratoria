const questionnaireData = [
  {
    questionText: "Quem era o vocalista da banda Queen?",
    selectionOptions: { 1: "Maddona", 2: "Freddie Mercury", 3: "Simone" },
    correctAnswer: 2,
  },
  {
    questionText: "Quem descobriu o Brasil?",
    selectionOptions: {
      1: "Cristóvão Colombo",
      2: "Maria Madalena",
      3: "Pedro Alvares Cabral",
    },
    correctAnswer: 3,
  },
  {
    questionText: "Quem é Gal Costa?",
    selectionOptions: { 1: "Cantora", 2: "Modelo", 3: "Atriz" },
    correctAnswer: 1,
  },
];

const CONFIRMATION_YES = "SIM";
const CONFIRMATION_NO = "NÃO";

const confirmationOptions = {
  1: CONFIRMATION_YES,
  2: CONFIRMATION_NO,
};

const handleGoBack = () => {
  localStorage.removeItem("userAnswers");
  window.location.reload();
};

const handleError = (error) => {
  console.error("A página enfrentou problemas:", error);
  handleGoBack();
};

const removeElementByIdFromDOM = (elementId) => {
  let documentElement = window.document.getElementById(`${elementId}`);
  if (documentElement) {
    try {
      documentElement.remove();
    } catch (error) {
      handleError(error);
    }
  }
};

const removeDisplayNoneOfElementByID = (elementId) => {
  const documentElement = window.document.getElementById(`${elementId}`);
  if (documentElement) {
    try {
      documentElement.style.removeProperty("display");
    } catch (error) {
      handleError(error);
    }
  }
};

const handleShowTemplateWithAnswers = () => {
  removeElementByIdFromDOM("tela-quiz");
  removeDisplayNoneOfElementByID("tela-resultado");
  const userAnswers = localStorage.getItem("userAnswers");
  const quizResultElement = window.document.getElementById("gabarito");
  let createTemplate = "";
  if (userAnswers) {
    const parsedUserAnswers = JSON.parse(userAnswers);

    for (let i = 0; i < questionnaireData.length; i++) {
      let currentQuestion = questionnaireData[i];
      let userAnswer = parsedUserAnswers[i];
      let correctAnswer = currentQuestion.correctAnswer;
      let isCorrect = userAnswer === correctAnswer;
      createTemplate += `
        <p>${currentQuestion.questionText}</p>
        <ul>
          <ol style="color:${userAnswer === 1 ? (isCorrect ? "green" : "red") : "black"}">${currentQuestion.selectionOptions[1]}</ol>
          <ol style="color:${userAnswer === 2 ? (isCorrect ? "green" : "red") : "black"}">${currentQuestion.selectionOptions[2]}</ol>
          <ol style="color:${userAnswer === 3 ? (isCorrect ? "green" : "red") : "black"}">${currentQuestion.selectionOptions[3]}</ol>
        </ul>`;
    }
    console.log(createTemplate);
    quizResultElement.innerHTML = createTemplate;
  }
};

const checkAnswerValidity = (userResponse) => {
  if (!Object.values(confirmationOptions).includes(userResponse)) {
    alert(
      "Entrada inválida. Por favor, tente novamente e insira um número correspondente a uma opção válida."
    );
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

function handleStartQuiz() {
  let userName =
    prompt("Digite o seu nome (ou deixe em branco para usar 'Visitante'):") ||
    "Visitante";
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

  for (let i = 0; i < questionnaireData.length; i++) {
    let currentQuestion = questionnaireData[i];
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

  const { correctAnswers, wrongAnswers, userAnswers } = collectUserAnswers();

  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

  removeElementByIdFromDOM("tela-inicial");
  removeDisplayNoneOfElementByID("tela-quiz");
  removeDisplayNoneOfElementByID("proxima-tela");

  const greetingElement = window.document.getElementById("saudacao");
  if (greetingElement) {
    try {
      greetingElement.innerText = "Olá, " + userName + "!";
    } catch (error) {
      handleError(error);
    }
  }

  const correctDiv = createOutputDiv(
    "Você acertou " + correctAnswers,
    "resultado-correto"
  );
  const wrongDiv = createOutputDiv(
    "Você errou " + wrongAnswers,
    "resultado-errado"
  );
  const resultElement = window.document.getElementById("placar-resultado");
  if (resultElement) {
    try {
      resultElement.appendChild(correctDiv);
      resultElement.appendChild(wrongDiv);
    } catch (error) {
      handleError(error);
    }
  }
}
