//Set up objects to get from the DOM browser window
var answerChoicesEl = document.getElementById('answerChoices');
var displayResultEl = document.getElementById('result');
var dispayQuestionEl = document.getElementById('question');
var displayTimerEl = document.getElementById('timer');
var startButtonEl = document.getElementById('startbtn');
var scoreFormEl = document.getElementById('scoreCollector');
//set to global to be available in all functions
var answer = "";
var pointsLeft = 60;
//Object to hold the questions, answer choices and the correct choice. 
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["stings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within _________.",
        choices: ["quotes", "curly brackets", "paratheses", "angle brackets"],
        answer: "paratheses"
    },  
    {
        title: "Arrays in Javascript can be used to store ________.",
        choices: ["numbers and strings", "other arrays", "booelans", "all of the above"],
        answer: "all of the above"
    }, 
    {
        title: "Inside which HTML element do we put the Javascript?",
        choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
        answer: "<script>"
    },  
    {
        title: "What is the correct JavaScript syntax to change the content of the following HTML?  &lt;p id='demo'&gt;This is a demonstration.&lt;/p&gt;",
        choices: [" document.getElementByName('p').innerHTML = 'Hello World!';",
        "document.getElement('p').innerHTML = 'Hello World!';",
        "document.getElementById('demo').innerHTML = 'Hello World!';",
        "#demo.innerHTML = 'Hello World!';"],
        answer: "document.getElementById('demo').innerHTML = 'Hello World!';"
    },
    {
        title: "String values must be enclosed within ______ and when being assigned to variables.",
        choices: ["quotes", "curly brackets", "paratheses", "angle brackets"],
        answer: "quotes"
    },  
    {
        title: "Where is the correct place to insert a Javascript?",
        choices: ["Both the <head> section and the <body> section are correct",
                "The <head> section",
                "The <body> section"],
        answer: "Both the <head> section and the <body> section are correct"
    },  
];

// Timer that counts down from 60
function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        //always show the time left even after stopping
        displayTimerEl.textContent = pointsLeft;
        // As long as the `pointsLeft` is greater than 0 decrease the display
        if (pointsLeft > 0) {
            // Decrement `pointsLeft` by 1
            pointsLeft--;
        } else {
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            endGame();
        } 
    }, 1000);
  }

//This function will display in the banner
function renderQuestion(object) {
    dispayQuestionEl.innerHTML = "";
    dispayQuestionEl.innerHTML = object.title;
}
//This function will render choices in the object list and add data attributes to 'listen' if a user presses a key corresponding to multiplechoice
function renderAnswerChoices(object){  
    for (var i = 0; i < object.choices.length; i++) {
        var choice = object.choices[i];  
        var li = document.createElement("li");
        li.textContent = choice;
        li.setAttribute("data-index", i+1);
        li.setAttribute("id", 'choice'+String(i+1));
        answerChoicesEl.appendChild(li);
      }
};

function clearAnswerChoices(){
   while(answerChoicesEl.firstChild){
    answerChoicesEl.removeChild(answerChoicesEl.firstChild);
   }
   checkAnswer = "";
};
function stopGame(){

}

//When the game ends due to wrong answers or no points left
function endGame(){
    var over = {
            title: "GAME OVER!",
        };
    renderQuestion(over);
    clearAnswerChoices();
    return;
};

function reducePoints(){
    displayResultEl.innerHTML = "WRONG!";
    displayResultEl.setAttribute("class", 'wrong');
    if(pointsLeft > 5){
        //pause for 3 seconds and reduce the points
        pointsLeft = pointsLeft - 2;
        displayTimerEl.textContent = pointsLeft;
        setTimeout(getQuestion(), 3000);  
    }else{
        endGame();
    }
}

function startQuiz(){
    startButtonEl.style.display = 'none';
    getQuestion();
    countdown();    
};

function randomOrder(object){
    return Math.floor(Math.random() * object.length)
}

function getQuestion(){

    //check if there are any questions left to ask
    if(questions.length >= 1){
    //remove any messages about being right or wrong as next question is shown
    displayResultEl.innerHTML = "";
    displayResultEl.setAttribute('class', '');
    clearAnswerChoices();

        //create an empty object to temporary hold the indexed question pulled at random
        var x = [];
        //take a question at random from the established question objects, remove it from the set and place it in the temporary holder
        x = questions.splice(randomOrder(questions), 1);
        //send question to be displayed
    
        renderQuestion(x[0]);
        renderAnswerChoices(x[0]);
        
        checkAnswer = x[0].answer;
        console.log(checkAnswer);
    }else{
        stopGame();
    }

}


function guessChecker(y){
    console.log(y);
    var evaluatedText = document.getElementById('choice'+y);
    if(evaluatedText.innerHTML == checkAnswer){
        displayResultEl.innerHTML = "Correct!";
        displayResultEl.setAttribute("class", 'right');
        console.log('right');
        getQuestion();
    }else{
        console.log('reduced points')
        reducePoints();
    }
}

startButtonEl.addEventListener("click", startQuiz);

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
    // If the count is zero, exit function
    if (pointsLeft === 0) {
      return;
    }
    // Convert all keys to lower case
    var key = event.key;
    var numericCharacters = "0123456789".split("");
    // Test if key pushed is a number
    console.log('OUTSIDE event listner if condition, key pressed'+key) 
    if (numericCharacters.includes(key) && key <= answerChoicesEl.lastElementChild.dataset.index) {
       console.log('inside event listner if, key is '+key) 
      var guess = event.key;
      guessChecker(guess);
    }
  });