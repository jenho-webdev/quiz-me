//Create a pool of questions and answers
var qPool = [
  {
    question: "What is the output of the following code? \n console.log(typeof null);",
    choices: ["undefined", "null", "object", "number"],
    correctAnswer: 2
  },
  {
    question: "Which of the following is a falsy value in JavaScript?",
    choices: ["0", "''", "NaN", "All of the above"],
    correctAnswer: 3
  },
  {
    question: "What is the result of 2 + '2'?",
    choices: ["4", "'22'", "22", "NaN"],
    correctAnswer: 1
  },
  {
    question: "Which of the following is not a primitive data type in JavaScript?",
    choices: ["string", "number", "boolean", "array"],
    correctAnswer: 3
  },
  {
    question: "What is the difference between '==' and '===' operators in JavaScript?",
    choices: ["Both operators check for value and type equality", "'==' checks only for value equality, while '===' checks for value and type equality", "'==' checks for value and type equality, while '===' checks only for value equality", "None of the above"],
    correctAnswer: 1
  },
  {
    question: "What is the output of the following code? \n console.log('2' + 2 - '2');",
    choices: ["NaN", "02", "4", "22"],
    correctAnswer: 2
  },
  {
    question: "What is the result of typeof typeof 1?",
    choices: ["number", "string", "undefined", "boolean"],
    correctAnswer: 1
  },
  {
    question: "What is the output of the following code? \n console.log(typeof []);",
    choices: ["object", "array", "undefined", "function"],
    correctAnswer: 0
  },
  {
    question: "What is the result of the following code? \n console.log(1 + -'1' + '2');",
    choices: ["12", "02", "NaN", "02-1"],
    correctAnswer: 3
  },
  {
    question: "What is the output of the following code? \n console.log('1' - - '1');",
    choices: ["0", "2", "'11'", "-1"],
    correctAnswer: 1
  },
  {
    question: "What is the output of the following code? \n console.log(null == undefined);",
    choices: ["true", "false", "undefined", "null"],
    correctAnswer: 0
  },
  {
    question: "What is the output of the following code? \n console.log(+'3' + 4);",
    choices: ["7", "34", "NaN", "undefined"],
    correctAnswer: 0
  },
  {
    question: "What is the result of '5' + 3 + 2?",
    choices: ["10", "'532'", "15", "'53' + 2"],
    correctAnswer: 1
  },
  {
    question: "What is the output of the following code? \n console.log('hello'.charAt(0));",
    choices: ["'h'", "'e'", "'l'", "'o'"],
    correctAnswer: 0
  }
  //add more questions here
];

var questionElement = document.querySelector(".display-question");
var optionsList = document.querySelector(".options-list");
var startButton = document.querySelector("#start-button");
var timeEl = document.querySelector("#timer");
var modalStart = document.querySelector(".modalStart");
var modalDialog = document.querySelector(".modal-dialog");
var modalHeader = document.querySelector(".modal-header");
var modalBody = document.querySelector(".modal-body");
var modalFooter = document.querySelector(".modal-footer");

var gameQuestions = []; //empty array to hold 10 shuffled selected questions
var timeLeft;
var timer;
var currentQuestionIndex = 0;
// var finalScore;

startButton.addEventListener("click", function () {
    modalStart.style.display = "none";
    startGame();
});
    
function startGame() {
  //create an array of 10 questions randomly from the pool of questions

  shuffleQuestions();
  //set timer to 60 seconds
  timeLeft = 60;
  countdown();
  //render the first question in the gameQuestions array to the dom
  renderQuestion();
 
}

function shuffleQuestions() 
{
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
  var p = document.createElement("p");;
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
};

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
  if (selectedAnswer === currentQuestion.correctAnswer)
  {
    // User's finish time is recorded when the final question is answered correctly
    if(currentQuestionIndex === gameQuestions.length - 1)
    {
        clearInterval(timer);
        endGame();
    }
    else
    {
        currentQuestionIndex++;
        renderQuestion();
    }
    
  }
  //if wrong answer 
  else
  {
    //deduct 5 sec from the remaining time
    timeLeft -= 5;
    //if no time left, then clear timer and game over.
    if(timeLeft <=0)
    {
      clearInterval(timer);
      endGame();
    }
    //else advance to next question
    else{
      currentQuestionIndex++;
      renderQuestion();
    }
  }
}
  


function endGame(){
  var userName = "";
  var userEmail = "";
  optionsList.innerHTML = "";
  questionElement.innerHTML = "";

  //create a modal header
  modalHeader.innerText = "Game Over";

  //create a modal body
  modalBody.innerText = "Your final score is " + timeLeft;

  //create a form

  //create a text input

  //create a label: first name

  //create a text input

  //create a label: last name

  //create a modal footer

  //create and add a submit button to modal footer

  //add event listener to submit button
  
  //when submit button is clicked

  //get the value of the text input

  //show the modal
  modalStart.style.display = "block";

  //store it to local storage
  storeScore(userResult);
}

function storeScore(userResult) {
  // Get stored scores from localStorage, or if not any, set to empty array
  var storedScores = JSON.parse(localStorage.getItem("scores")) || [];
  // Push new score into scores array
  storedScores.push(userResult);
} 






