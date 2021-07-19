//Set up objects to get from the DOM browser window
var answerChoicesEl = document.getElementById('answerChoices');
var displayResultEl = document.getElementById('result');
var dispayQuestionEl = document.getElementById('question');
var displayTimerEl = document.getElementById('timer');
var startButtonEl = document.getElementById('startbtn');
//Object to hold the questions, answer choices and the correct choice. 
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["stings", "booleans", "alerts", "numbers"],
        answer: "alerts",
        rendered: false
    },
    {
        title: "The condition in an if / else statement is enclosed within _________.",
        choices: ["quotes", "curly brackets", "paratheses", "angle brackets"],
        answer: "paratheses",
        rendered: false

    },  
    {
        title: "Arrays in Javascript can be used to store ________.",
        choices: ["numbers and strings", "other arrays", "booelans", "all of the above"],
        answer: "all of the above",
        rendered: false

    },  
    {
        title: "Inside which HTML element do we put the Javascript?",
        choices: ["<script>", "<scripting>", "<js>", "<javascript>"],
        answer: "<script>",
        rendered: false

    },  
    {
        title: "What is the correct JavaScript syntax to change the content of the following HTML?  <p id='demo'>This is a demonstration.</p>",
        choices: [" document.getElementByName('p').innerHTML = 'Hello World!';",
        "document.getElement('p').innerHTML = 'Hello World!';",
        "document.getElementById('demo').innerHTML = 'Hello World!';",
        "#demo.innerHTML = 'Hello World!';"],
        answer: "document.getElementById('demo').innerHTML = 'Hello World!';",
        rendered: false
    },
    {
        title: "String values must be enclosed within ______ and when being assigned to variables.",
        choices: ["quotes", "curly brackets", "paratheses", "angle brackets"],
        answer: "quotes",
        rendered: false
    },  
    {
        title: "Where is the correct place to insert a Javascript?",
        choices: ["Both the <head> section and the <body> section are correct",
                "The <head> section",
                "The <body> section"],
        answer: "Both the <head> section and the <body> section are correct",
        rendered: false
    },  
];

// Timer that counts down from 60
function countdown() {
    var timeLeft = 5;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        //always show the time left even after stopping
        displayTimerEl.textContent = timeLeft;
        // As long as the `timeLeft` is greater than 0 decrease the display
        if (timeLeft > 0) {
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else {
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            endGame();
        } 
    }, 1000);
  }

// TODO: What is the purpose of this function?
// takes what ever is entered in the todo-text box and adds a corresponding element
function renderQuestion(object) {
    dispayQuestionEl.innerHTML = "";
    console.log(object);
    dispayQuestionEl.innerHTML = object.title;
}

function renderAnswerChoices(object){  
    for (var i = 0; i < object.choices.length; i++) {
        var choice = object.choices[i];  
        var li = document.createElement("li");
        li.textContent = choice;
        li.setAttribute("data-index", i);
        answerChoicesEl.appendChild(li);
      }
};

function clearAnswerChoices(parent){
   while(parent.firstChild){
       parent.removeChild(parent.firstChild);
   }
};

function endGame(){
    var over = {
            title: "GAME OVER!",
            choices: ["No", "Time", "Left"]
        };
    renderQuestion(over);
    renderAnswerChoices(over);
    return;
};

startButtonEl.addEventListener("click", startQuiz);

function startQuiz(){
    startButtonEl.style.display = 'none';
    countdown();
};

function radomOrder(object){
    return Math.floor(Math.random() * object.length)
}

function checkRemainingQuestions(object){
    //count of how many questions are still false
    var x = 0;
    for(var i =0; i < objects.length; i++){
        if(object.rendered == true)
        x++;
    }

}
