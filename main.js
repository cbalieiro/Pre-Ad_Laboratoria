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

const clearPage = () => {
  let hiddenElement = window.document.getElementById("container");
  if (hiddenElement) {
    hiddenElement.remove();
  } 
  const result = window.document.getElementById("resultado");
  if (result) {
    result.style.removeProperty("display");
  }
};

const checkAnswerValidity = (userResponse) => {
  switch (userResponse) {
    case null:
      alert("Você não digitou nada. Tente novamente.");
      startQuiz();
      return false;
    case CONFIRMATION_NO:
      alert("Okay, obrigado e até logo");
      return false;
    case CONFIRMATION_YES:
      alert("Okay, Vamos lá... Boa sorte!");
      return true;
    default:
      alert("Você não digitou nada. Tente novamente.");
      startQuiz();
      return false;
  }
};

function startQuiz() {
  let userName = prompt("Digite o seu nome:") || "Visitante";
  const userConfirmation =
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

function showQuizQuestions(shouldDisplay, userName) {
  if (!shouldDisplay) {
    return;
  }

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

  clearPage();

  const greetingElement = window.document.getElementById("saudacao");
  if (greetingElement) {
    greetingElement.innerText = "Olá, " + userName + "!";
  } else {
    console.error("Element with id 'saudacao' not found in the DOM.");
  }

  const correctDiv = document.createElement("div");
  correctDiv.innerText = "Você acertou " + correctAnswers;
  correctDiv.className = "resultado-correto";
  const wrongDiv = document.createElement("div");
  wrongDiv.innerText = "Você errou " + wrongAnswers;
  wrongDiv.className = "resultado-errado";
  const resultElement = window.document.getElementById("container-resultado");
  if (resultElement) {
    resultElement.appendChild(correctDiv);
    resultElement.appendChild(wrongDiv);
  } else {
    console.error(
      "Element with id 'container-resultado' not found in the DOM."
    );
  }
}
