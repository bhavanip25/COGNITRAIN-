document.addEventListener('DOMContentLoaded', function () {
    const problemElement = document.getElementById('problem');
    const answerInput = document.getElementById('answer');
    const checkButton = document.getElementById('check-button');
    const timerElement = document.getElementById('timer');
    const timerCountElement = document.getElementById('timer-count');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score-value');
    const restartButton = document.getElementById('restart-button');

    let timer;
    let timerCount = 30;
    let score = 0;
    let isGameRunning = false;
    let currentProblem = generateProblem();

    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        return {
            expression: `${num1} ${operator} ${num2}`,
            answer: eval(`${num1} ${operator} ${num2}`),
        };
    }

    function startGame() {
        score = 0;
        isGameRunning = true;
        resultContainer.style.display = 'none';
        timerCount = 30;
        currentProblem = generateProblem();
        problemElement.textContent = `Problem: ${currentProblem.expression}`;
        answerInput.value = '';
        checkButton.removeAttribute('disabled');
        timerElement.style.color = 'black';
        startTimer();
    }

    function endGame() {
        isGameRunning = false;
        checkButton.setAttribute('disabled', 'disabled');
        timerElement.style.color = 'red';
        resultContainer.style.display = 'block';
        scoreElement.textContent = score;
    }

    checkButton.addEventListener('click', function () {
        if (isGameRunning) {
            const userAnswer = parseInt(answerInput.value);

            if (!isNaN(userAnswer)) {
                if (userAnswer === currentProblem.answer) {
                    score++;
                }

                currentProblem = generateProblem();
                problemElement.textContent = `Problem: ${currentProblem.expression}`;
                answerInput.value = '';
            }
        }
    });

    restartButton.addEventListener('click', function () {
        startGame();
    });

    function startTimer() {
        timer = setInterval(function () {
            timerCountElement.textContent = timerCount;
            timerCount--;

            if (timerCount < 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    startGame();
});
