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

var questionElement = document.getElementById(".display-question");
var optionsList = document.getElementById("options-list");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");

var shuffledQuestions = []; //empty array to hold 10 shuffled selected questions
var timeLeft = 60;
var timer;
var currentQuestionIndex = 0;
// var finalScore;


function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `endGame()` function
      endGame();
    }
  }, 1000);
}




function shuffleQuestions(){

  //pick 10 random questions from the pool of questions.
  for(var i = 0; i < 10; i_++)
  {
    var randomQuestion = qPool[Math.floor(Math.random()*qPool.length)];
    if(!shuffleQuestions.includes(randomQuestion))
    {
      shuffledQuestions.push(randomQuestion);
    }
  }

}

//function to handle displaying question in the shuffledQuestions array to the dom
function renderQuestion() {
  
  
  var currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  var optionsList = currentQuestion.choices;
 
  //create and appand each options for the question as a button
  currentQuestion.choices.forEach((choice, index) => {
  
    //create list item number [i]
    var li = document.createElement("li");
    li.setAttribute("data-index", index);
    //list item contain a button that display the question's option number [i]
    var button = document.createElement("button");
    button.textContent = choice;
    
    li.appendChild(button);
    button.addEventListener("click", () => checkAnswer(index));
    optionsList.appendChild(li);

  });
};

function checkAnswer(selectedAnswer) {
  //get current question in array
  var currentQuestion = shuffledQuestions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer)
  {
    // User's finish time is recorded when the final question is answered correctly
    if(currentQuestionIndex === shuffleQuestions.length - 1)
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
  

// Add click event to options button element

optionsList.addEventListener("click", function (event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and check  if it is the answer from current question
    var userAnswer = element.parentElement.getAttribute("data-index");
    checkAnswer(userAnswer);
    
  }

})

function StartGame() {
  //create an array of 10 questions randomly from the pool of questions
  // shuffleQuestions();
  renderQuestion();
  countdown();
  
}

function endGame(){

  var userName = "";
  var userEmail = "";
  storeScore();

}

function storeScore() {
  // Stringify and set key in localStorage to scores array

}