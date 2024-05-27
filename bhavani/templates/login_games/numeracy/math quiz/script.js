// script.js

const problemElement = document.getElementById("problem");
const userAnswerElement = document.getElementById("user-answer");
const submitButton = document.getElementById("submit-button");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");

let timer;
let timeLeft = 30; // Updated timer to 30 seconds
let score = 0;
let totalQuestions = 0;

submitButton.addEventListener("click", checkAnswer);

function generateProblem() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    totalQuestions++;
    return `${num1} + ${num2}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function checkAnswer() {
    const problemText = problemElement.textContent;
    const [num1, , num2] = problemText.split(" ");
    const correctAnswer = parseInt(num1) + parseInt(num2);
    const userAnswer = parseInt(userAnswerElement.value);

    if (userAnswer === correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Oops! Try again.";
    }

    userAnswerElement.value = "";
    const newProblem = generateProblem();
    problemElement.textContent = newProblem;

    // Check if it's the last question before displaying the final score
    if (totalQuestions === 10) {
        gameOver();
    }
}

function gameOver() {
    submitButton.disabled = true;
    userAnswerElement.disabled = true;

    // Display the final score in the format "Your Score: X/Total Score"
    resultElement.textContent = `Game Over! Your Score: ${score}/${totalQuestions}`;
}

problemElement.textContent = generateProblem();
startTimer();
