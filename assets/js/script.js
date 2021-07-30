//Set up objects to get from the DOM browser window
var answerChoicesEl = document.getElementById('answerChoices');
var displayResultEl = document.getElementById('result');
var dispayQuestionEl = document.getElementById('question');
var displayTimerEl = document.getElementById('timer');
var startGameBtn = document.getElementById('startbtn');
var highScoreBtn = document.getElementById('highScores');
var ptsLbl = document.getElementById('pointsLabel');
var scoreFormEl = new bootstrap.Modal(document.getElementById('scoreCollector'));
var scoreEl = document.getElementById("userScore");
var scoreSubmitEl = document.getElementById('submitScore');
var tryAgainBtn = document.getElementById('tryAgain'); 
var nameSubmitEl = document.getElementById('nameGiven');
//set to global to be available in all functions
var answer = "";
var pointsLeft;
var isGameFinished = false;
var scorers = [];
var backupQuestions = [{
    backupTitle: "",
    backupChoices: [],
    backupAnswer: ""
    }
];
debugger
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
        choices: ["numbers and strings", "other arrays", "booelans", "all choices listed"],
        answer: "all choices listed"
    }, 
    {
        title: "Inside which HTML element do we put the Javascript?",
        choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
        answer: "&lt;script&gt;"
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
        answer: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct"
    }, 
    {
        title: "Which one of these is a JavaScript package manager?",
        choices: ["Node.js",
                "TypeScript",
                "npm"],
        answer: "npm"
    },
    {
        title: "Who invented JavaScript?",
        choices: ["Douglas Crockford",
                "Sheryl Sandberg",
                "Brendan Eich"],
        answer: "Brendan Eich"
    }
];

//used to get questions in a random order
function randomOrder(object){
    return Math.floor(Math.random() * object.length)
}

// Timer that counts down from 60
function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        if(!isGameFinished){
            //always show the time left even after stopping
            displayTimerEl.textContent = pointsLeft;
            // As long as the `pointsLeft` is greater than 0 decrease the display
            if (pointsLeft > 0) {
                // Decrement `pointsLeft` by 1
                pointsLeft--;
            } else {
                stopGame(); 
                clearInterval(timeInterval);
            } 
        } else {
            clearInterval(timeInterval);
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
    
    var loopLength = object.choices.length;
    for (var i = 0; i < loopLength; i++) {
        var choice = object.choices.splice(randomOrder(object.choices), 1); 
        var li = document.createElement("li");
        li.textContent = choice;
        li.setAttribute("class", "choice");
        li.setAttribute("data-index", i+1);
        li.setAttribute("id", 'choice'+String(i+1));
        answerChoicesEl.appendChild(li);
      }
};

function clearAnswerChoices(){
   while(answerChoicesEl.firstChild){
    answerChoicesEl.removeChild(answerChoicesEl.firstChild);
   }
   //this should clear the check answer with each new question
   checkAnswer = "";
};


function answerResult(){
    var resultTime = 1;  
    var answerTimeInterval = setInterval(function () {
        if(resultTime == 0)
        {
            displayResultEl.innerHTML = "";
            displayResultEl.setAttribute("class", '');
            clearInterval(answerTimeInterval);
        }else if (resultTime > 0) {
            resultTime--;
        }
    }, 250);
    getQuestion();
}

function reducePoints(){
    if(pointsLeft > 10){
        pointsLeft = pointsLeft - 10;
        //Update display since this function is decrementing outside of timerInterval 
        displayTimerEl.textContent = pointsLeft;
    }else{
        pointsLeft = 0;
        displayTimerEl.textContent = pointsLeft;
        stopGame();
    }
}

function getQuestion(){
    clearAnswerChoices();
    //check if there are any questions left to ask
    if(questions.length >= 1){
        
        //create an empty object to temporary hold the indexed question pulled at random
        var x = [];
        //take a question at random from the established question objects, remove it from the set and place it in the temporary holder
        x = questions.splice(randomOrder(questions), 1);
        //send question to be displayed
        renderQuestion(x[0]);
        renderAnswerChoices(x[0]);
        checkAnswer = x[0].answer;
    }else{
        stopGame();
    }
}

function guessChecker(y){    
    var evaluatedText = "";
    //Check if value is coming from keyboard or click event
    if(isNaN(y)){
        evaluatedText = document.getElementById(y);
    }else{
        evaluatedText = document.getElementById('choice'+y);
    }
    if(evaluatedText.innerHTML == checkAnswer){
        displayResultEl.innerHTML = "Correct!";
        displayResultEl.setAttribute("class", 'right');
        answerResult();
    }else{
        displayResultEl.innerHTML = "WRONG!";
        displayResultEl.setAttribute("class", 'wrong');
        reducePoints();
        answerResult();     
    }
}

function startQuiz(){   
    //check if quiz has occurred in the current session
    //if true, deep store of the questions prior to mutating object'
    //debugger
    clearAnswerChoices()
    backupQuestions = questionObjectCopy(backupQuestions, questions, isGameFinished);
    highScoreBtn.setAttribute("class", 'hidden');
    startGameBtn.setAttribute("class", "hidden");
    isGameFinished = false;
    pointsLeft = 60;
    displayTimerEl.textContent = pointsLeft;
    ptsLbl.removeAttribute('class', 'hidden');
    getQuestion();
    countdown(); 
};

function stopGame(){
    //This is built in function that will end the point reduction/timer
    isGameFinished = true;
    // Reset questions
    questions = [];
    if(pointsLeft === 0){
        var over = {
            title: "GAME OVER!",
        };
        
    }else{
        var over = {
            title: "You have answered all the questions!",
        };
        //not clear why, but the timer stops and there appears to be a difference in the "Your Score" and points Remaining
        displayTimerEl.textContent = pointsLeft;
    }   
    renderQuestion(over);
    //Restore questions
    questions =  questionObjectCopy(questions, backupQuestions, isGameFinished);
    recordName();
}

function recordName(){
    //render the modal
    scoreEl.innerHTML = pointsLeft;
    nameSubmitEl.value = "";
    scoreFormEl.toggle();
};

scoreSubmitEl.addEventListener("click", function(event) {
    event.preventDefault();
    //don't accept blanks
    if(nameSubmitEl.value !== ""){
        // create user object from submission
        var scorer = {
            Name: nameSubmitEl.value.trim(),
            score: pointsLeft
        };
        scorers.push(scorer)
        // set new submission to local storage 
        localStorage.setItem("userScores", JSON.stringify(scorers));
        scoreFormEl.toggle();
        sortScores();
        displayHighScores(); 
    }
})

tryAgainBtn.addEventListener("click", function(event){
    event.preventDefault();
    scoreFormEl.toggle();
    isGameFinished = false;
    startQuiz();
});

function init(){
    var lastScorers = JSON.parse(localStorage.getItem('userScores'));
    if(lastScorers !== null){
        scorers = lastScorers;
    }
}

function sortScores(){
    //sorting a 2 dimension array from Stack Overflow, jahroy via Mozilla documentation
    scorers.sort(function compare(a, b){
        if (a.score === b.score){
            return 0;
        } else{
            return (a.score > b.score) ? -1 : 1;
        }
    });
}

function displayHighScores(){
    if(isGameFinished){
            startGameBtn.removeAttribute('class', 'hidden');
            startGameBtn.setAttribute("class", 'btn btn-primary btn-custom mx-auto');
            startGameBtn.innerText = 'Play Again';  
    }
    if(scorers.length > 0 && scorers !== null){
        for (var i = 0; i < scorers.length; i++) { 
            var li = document.createElement("li");
            li.textContent = scorers[i].Name + "   " + scorers[i].score;
            li.setAttribute("class", "scores");
            answerChoicesEl.appendChild(li);
        }
    }else {
        var li = document.createElement("li");
            li.textContent = "... Board is wide Open! Take a Spot, you are guaranteed a place!";
            li.setAttribute("class", "scores");
            answerChoicesEl.appendChild(li);
    }
    ptsLbl.setAttribute('class', 'hidden');
}
//From stackoverflow question https://stackoverflow.com/questions/6612385/why-does-changing-an-array-in-javascript-affect-copies-of-the-array
function deepObjectCopy(object){
    var copyOfThingArray = [...object]
    return copyOfThingArray;
}

function questionObjectCopy(objectToStore, objectToCopy, isCondtion){
    objectToStore = deepObjectCopy(objectToCopy)
    if(isCondtion){
        for(var i = 0; i < objectToCopy.length; i++){
            objectToStore[i].choices = deepObjectCopy(objectToCopy[i].backupChoices)
        }
    } else{
        for(var i = 0; i < objectToCopy.length; i++){
            objectToStore[i].backupChoices = deepObjectCopy(objectToCopy[i].choices)
        }
    }
    return objectToStore;
}

init();
// All listening elements actions take below

startGameBtn.addEventListener("click", startQuiz);

highScoreBtn.addEventListener("click", function(event){
    event.preventDefault();
    bthighScoreBtn = new bootstrap.Button(highScoreBtn);
    bthighScoreBtn.toggle();
    clearAnswerChoices();
    sortScores();
    displayHighScores();
});

// Adding an event listner for mouse clicking of answers
answerChoicesEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (pointsLeft === 0) {
        return;
    }
    var element = event.target;
    // checks clicked element is a list item and then calls function to check answer.
    if (element.matches("li") === true) {
      var guess = element.getAttribute("id");
      guessChecker(guess);
    }
});