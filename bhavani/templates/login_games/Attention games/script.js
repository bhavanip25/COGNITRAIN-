const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const scoreChartCanvas = document.getElementById("scoreChart");
const scoreChartCtx = scoreChartCanvas.getContext("2d");

let score = 0;
let gameDuration = 40000; // 40 seconds in milliseconds
let interval;
let scoresHistory = []; // Array to store historical scores

if (localStorage.getItem("scoresHistory")) {
    scoresHistory = JSON.parse(localStorage.getItem("scoresHistory"));
}

gameContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
        score++;
        updateScore();
        event.target.remove();
    }
});

function createRandomCircle() {
    const circle = document.createElement("div");
    const randomColor = getRandomColor();
    circle.className = `circle ${randomColor}`;
    const x = Math.random() * (window.innerWidth - 70);
    const y = Math.random() * (window.innerHeight - 70);
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    gameContainer.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 1500);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function getRandomColor() {
    const circleColors = ["red", "blue", "green", "yellow"];
    return circleColors[Math.floor(Math.random() * circleColors.length)];
}

interval = setInterval(createRandomCircle, 1000);

setTimeout(() => {
    clearInterval(interval);
    scoreElement.textContent = `Game Over! Final Score: ${score}`;
    scoresHistory.push(score); // Store final score in history
    localStorage.setItem("scoresHistory", JSON.stringify(scoresHistory)); // Store in localStorage

    // Generate chart after game over
    renderScoreChart();
}, gameDuration);

function renderScoreChart() {
    new Chart(scoreChartCtx, {
        type: 'line',
        data: {
            labels: Array.from({ length: scoresHistory.length }, (_, i) => `Game ${i + 1}`),
            datasets: [{
                label: 'Game Scores',
                data: scoresHistory,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235,4)',
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
