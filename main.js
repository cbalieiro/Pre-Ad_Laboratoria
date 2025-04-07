const questionnaireData = {
  firstQuestion: {
    questionText: "Quem era o vocalista da banda Queen?",
    selectionOptions: { 1: "Maddona", 2: "Freedy Mercury", 3: "Simone" },
    correctAnswer: 2,
  },
  secondQuestion: {
    questionText: "Quem descobriu o Brasil?",
    selectionOptions: {
      1: "Cristovam Colombo",
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

const confirmationOptions = {
  1: "SIM",
  2: "NÃO",
};

goBack = () => {
  window.location.reload()
}

clearPage = () => {
  const hiddenElement = window.document.getElementById("container");
  hiddenElement.remove();
  const result = window.document.getElementById("resultado")
  result.style.removeProperty("display");
}

const checkAnswerValidity = (userResponse) => {
  if (userResponse === null) {
    alert("Resposta inválida. Tente novamente.");
    startQuiz();
    return false;
  }
  if (userResponse === confirmationOptions[2]) {
    alert("Okay, obrigado e até logo");
    return false;
  } else if (userResponse === confirmationOptions[1]) {
    alert("Okay, Vamos lá... Boa sorte!");
    return true;
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

  for (let [key, currentQuestion] of Object.entries(questionnaireData)) {
    console.log(currentQuestion);
    const resposta = Number(prompt(`${currentQuestion.questionText}\n1) ${currentQuestion.selectionOptions[1]}\n2) ${currentQuestion.selectionOptions[2]}\n3) ${currentQuestion.selectionOptions[3]}`));
    if (resposta)
      userAnswers.push(resposta);
    if (resposta === currentQuestion.correctAnswer) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }
  }
  clearPage();

  const greetingElement = window.document.getElementById("saudacao");
  greetingElement.innerText = "Olá, " + userName + "!";

const correctDiv = document.createElement("div");
  correctDiv.innerText = "Você acertou " + correctAnswers;
  correctDiv.className = "resultado-correto";
  const wrongDiv = document.createElement("div"); 
  wrongDiv.innerText = "Você errou " + wrongAnswers;
  wrongDiv.className = "resultado-errado";

  const resultElement = window.document.getElementById("container-resultado");
  resultElement.appendChild(correctDiv);
  resultElement.appendChild(wrongDiv);
}


