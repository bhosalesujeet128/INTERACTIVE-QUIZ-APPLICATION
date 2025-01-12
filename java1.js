const questions = [
    {
        question: "What is molecular formula of Water?",
        answers: [
          { text: "H₂O", correct: true },
          { text: "CO₂", correct: false },
          { text: "HO", correct: false },
          { text: "CO", correct: false },
        ],
      },
      {
          question: "What is the capital of India",
          answers: [
            { text: "Mumbai", correct: false},
            { text: "New Delhi", correct: true },
            { text: "Pune", correct: false },
            { text: "Chennai", correct: false },
          ],
        },
      {
        question: "What is square root of 625?",
        answers: [
          { text: "10", correct: false },
          { text: "14", correct: false },
          { text: "25", correct: true },
          { text: "26", correct: false },
        ],
      },
      {
        question: "Which programming language runs in a web browser?",
        answers: [
          { text: "Python", correct: false },
          { text: "JavaScript", correct: true },
          { text: "C++", correct: false },
          { text: "Java", correct: false },
        ],
      },
      {
          question: "which gas is known as laughing gas?",
          answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
            { text: "Nitrous Oxide", correct: true },
          ],
        },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const answersContainer = document.getElementById("answers");
  const nextButton = document.getElementById("next-button");
  const submitButton = document.getElementById("submit-button");
  const scoreContainer = document.getElementById("score-container");
  const scoreElement = document.getElementById("score");
  
  function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-button");
      button.dataset.correct = answer.correct;
      button.addEventListener("click", selectAnswer);
      answersContainer.appendChild(button);
    });
  
    if (currentQuestionIndex === questions.length - 1) {
      nextButton.hidden = true;
      submitButton.hidden = false;
    } else {
      nextButton.hidden = false;
      submitButton.hidden = true;
    }
  }
  
  function resetState() {
    nextButton.disabled = true;
    answersContainer.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(selectedButton, correct);
    if (correct) {
      score++;
    }
    Array.from(answersContainer.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct === "true");
      button.disabled = true;
    });
    nextButton.disabled = false;
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion();
  });
  
  submitButton.addEventListener("click", showScore);
  
  function showScore() {
    questionElement.hidden = true;
    answersContainer.hidden = true;
    nextButton.hidden = true;
    submitButton.hidden = true;
    scoreContainer.hidden = false;
    scoreElement.textContent = `${score} / ${questions.length}`;
  }
  
  // Initialize the quiz
  loadQuestion();
  