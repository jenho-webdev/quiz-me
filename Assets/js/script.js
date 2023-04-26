//Create a pool of questions and answers
var qPool = [
  {
    question:
      "What is the output of the following code? \n console.log(typeof null);",
    choices: ["undefined", "null", "object", "number"],
    correctAnswer: 2,
  },
  {
    question: "Which of the following is a falsy value in JavaScript?",
    choices: ["0", "''", "NaN", "All of the above"],
    correctAnswer: 3,
  },
  {
    question: "What is the result of 2 + '2'?",
    choices: ["4", "'22'", "22", "NaN"],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following is not a primitive data type in JavaScript?",
    choices: ["string", "number", "boolean", "array"],
    correctAnswer: 3,
  },
  {
    question:
      "What is the difference between '==' and '===' operators in JavaScript?",
    choices: [
      "Both operators check for value and type equality",
      "'==' checks only for value equality, while '===' checks for value and type equality",
      "'==' checks for value and type equality, while '===' checks only for value equality",
      "None of the above",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the output of the following code? \n console.log('2' + 2 - '2');",
    choices: ["NaN", "02", "4", "22"],
    correctAnswer: 2,
  },
  {
    question: "What is the result of typeof typeof 1?",
    choices: ["number", "string", "undefined", "boolean"],
    correctAnswer: 1,
  },
  {
    question:
      "What is the output of the following code? \n console.log(typeof []);",
    choices: ["object", "array", "undefined", "function"],
    correctAnswer: 0,
  },
  {
    question:
      "What is the result of the following code? \n console.log(1 + -'1' + '2');",
    choices: ["12", "02", "NaN", "02-1"],
    correctAnswer: 3,
  },
  {
    question:
      "What is the output of the following code? \n console.log('1' - - '1');",
    choices: ["0", "2", "'11'", "-1"],
    correctAnswer: 1,
  },
  {
    question:
      "What is the output of the following code? \n console.log(null == undefined);",
    choices: ["true", "false", "undefined", "null"],
    correctAnswer: 0,
  },
  {
    question:
      "What is the output of the following code? \n console.log(+'3' + 4);",
    choices: ["7", "34", "NaN", "undefined"],
    correctAnswer: 0,
  },
  {
    question: "What is the result of '5' + 3 + 2?",
    choices: ["10", "'532'", "15", "'53' + 2"],
    correctAnswer: 1,
  },
  {
    question:
      "What is the output of the following code? \n console.log('hello'.charAt(0));",
    choices: ["'h'", "'e'", "'l'", "'o'"],
    correctAnswer: 0,
  },
  //add more questions here
];

//main page elements
var startButton2 = document.querySelector("#startGamebtn2");
var questionElement = document.querySelector(".display-question");
var optionsList = document.querySelector(".options-list");
var timeEl = document.querySelector(".timer");
var showTime = document.querySelector("#time-label");

//button in modal
var startButton = document.querySelector("#start-button");
var viewBtn = document.querySelector("#viewScore");

//modal elements
var modalStart = document.querySelector("#modalStart");
var modalDialog = document.querySelector(".modalDialog");
var modalHeader = document.querySelector(".modalHeader");
var modalBody = document.querySelector(".modalBody");
var modalFooter = document.querySelector(".modalFooter");
//modal elements for end game
var modalEnd = document.querySelector("#modal-End");
var finalScoreMsg = document.querySelector("#finalScoreMsg");
var modalAlertMsg = document.querySelector(".modalAlertMsg");
var saveBtn = document.querySelector("#saveScore");
var initialInput = document.querySelector("#initials");
//Game var 
var gameQuestions = []; //empty array to hold 10 shuffled selected questions
var timeLeft;
var timer;
var currentQuestionIndex = 0;
var scores = [];


window.addEventListener("click", function (event) {
  var element = event.target;
  //event listener for the start button in view page
  if(element.matches("#startGamebtn2")) {
    startGame();
  }//modal's Start Button
  else if(element.matches("#start-button")) {
    modalStart.style.display = "none";
    showTime.style.display = "block";
    startGame();
  }//event listener for the view score button
  else if(element.matches("#viewScore")) {
    modalStart.style.display = "none";
    modalEnd.style.display = "none";
    showTime.style.display = "none";
    startButton2.style.display = "block";
    renderScores();
  }
  
});

function startGame() {
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    scores = storedScores;
  }
  //create an array of 10 questions randomly from the pool of questions
  shuffleQuestions();
  //set timer to 60 seconds
  timeLeft = 60;
  countdown();
  //render the first question in the gameQuestions array to the dom
  renderQuestion();
}

function shuffleQuestions() {
  //pick 10 random questions from the pool of questions.
  while (gameQuestions.length <= 9) {
    var randomQuestion = qPool[Math.floor(Math.random() * qPool.length)];
    if (!gameQuestions.includes(randomQuestion)) {
      gameQuestions.push(randomQuestion);
    }
  }
}

function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timer = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timeEl` to show the remaining seconds
      timeEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timeEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timeEl` to an empty string
      timeEl.textContent = "";
      // Use `clearInterval()` to stop the timer
      clearInterval(timer);
      // Call the `endGame()` function
      endGame();
    }
  }, 1000);
}

//function to handle displaying question in the gameQuestions array to the dom
function renderQuestion() {
  var currentQuestion = gameQuestions[currentQuestionIndex];
  var p = document.createElement("p");
  p.textContent = currentQuestion.question;
  //clear the question from the previous
  questionElement.innerHTML = "";
  questionElement.appendChild(p);

  //clear the options list from the previous question
  optionsList.innerHTML = "";

  //create and appand each options for the question as a button
  currentQuestion.choices.forEach((choice, index) => {
    //create list item number [i]
    var li = document.createElement("li");
    li.setAttribute("data-index", index);
    //list item contain a button that display the question's option number [i]
    var button = document.createElement("button");
    button.textContent = choice;

    li.appendChild(button);
    optionsList.appendChild(li);
  });
}

//function to handle user's answer selection
optionsList.addEventListener("click", function (event) {
  var element = event.target;
  // Checks if element is a option selecting button
  if (element.matches("button") === true) {
    // Get its data-index value and check  if it is the answer from current question
    var userAnswer = element.parentElement.getAttribute("data-index");
    checkAnswer(userAnswer);
  }
});

function checkAnswer(selectedAnswer) {
  //get current question in array
  var currentQuestion = gameQuestions[currentQuestionIndex];

  //if the user selected the correct answer
  if (selectedAnswer === currentQuestion.correctAnswer) {
    //then it is at the last question
    if (currentQuestionIndex == 9) {
      //end the game

      endGame();
    }
    //else if it is not last question, edvance to next question
    else {
      currentQuestionIndex++;
      renderQuestion();
    }
  }
  //if the user selected the wrong answer
  else if (selectedAnswer !== currentQuestion.correctAnswer) {
    //if it is at the last question
    if (currentQuestionIndex == 9) {
      //timer take 5 sec off and game over
      //endGame will zero out all negative timeLeft amount as the final result
      timeLeft = timeLeft - 5;
      endGame();
    } else {
      //else if it is not last question, timer - 5 and advance to next question
      timeLeft = timeLeft - 5;
      currentQuestionIndex++;
      renderQuestion();
    }
  } //just in case there are any other cases
  else {
    endGame();
  }
}

// GAME OVER
function endGame() {
  var initials = "";
  var finalScore = timeLeft;
  optionsList.innerHTML = "";
  questionElement.innerHTML = "";

  //set the score to 0 if it is negative
  if (finalScore < 0) {
    finalScore = 0;
  }

  //stop the countdown
  clearInterval(timer);

  //show the modal
  modalEnd.style.display = "block";

  //show final score to modal body
  finalScoreMsg.innerText = "Your final score is: " + finalScore;

  //add event listener to submit button
  saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    //get the value of the text input to the inital field

    while (initialInput.value === "") {
      alert("Please enter your initials");
      return;
    }
    initials = initialInput.value.trim();
    saveHighScore(finalScore, initials);
    alert("Success!!! Your score has been saved!");
    window.location.reload();
  });
}
function saveHighScore(score, initials) {
  var lastSave = {
    initials: initials,
    score: score,
  };

  scores.push(lastSave);
  initialInput = "";

  localStorage.setItem("scores", JSON.stringify(scores));
}

function renderScores() {
  //Get scores saved in local storage SavedScores

  scores = JSON.parse(localStorage.getItem("scores"));

  //for each saved score, create a list item and append it to the question element

  if (scores === null) {
    scores = [];
  }

  for (var i = 0; i < scores.length; i++) {
    var save = scores[i];
    var p = document.createElement("p");
    p.textContent = "Initial: " + save.initials + "  | " + " Score: " + save.score;
    questionElement.appendChild(p);
  }
  
  
}
