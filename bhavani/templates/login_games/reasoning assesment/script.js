document.addEventListener('DOMContentLoaded', function () {
    const levelSelection = document.getElementById('level-selection');
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const timerCountElement = document.getElementById('timer-count');
    const scoreElement = document.getElementById('score-value');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next');
    const returnToLevelButton = document.getElementById('return-to-level-selection');

    let currentLevel = null;
    let currentQuestion = 1;
    let timer;
    let timerCount = 10;
    let score = 0;
    let correctAnswer = "";

    function startTimer() {
        timer = setInterval(function () {
            timerCountElement.textContent = timerCount;
            timerCount--;

            if (timerCount < 0) {
                clearInterval(timer);
                displayNextQuestion();
            }
        }, 1000);
    }

    function displayNextQuestion() {
        clearInterval(timer);
        timerCount = 10;

        if (currentQuestion <= 10) { // Assuming 10 questions per level
            currentQuestion++;
            updateQuestion();
            startTimer();
        } else {
            displayResult();
        }
    }

   
    function updateQuestion() {
       // Define the questions and answers for the Easy section
const questions = {
    easy: [
        {
            text: "What is the capital of France?",
            options: ["A. London", "B. Berlin", "C. Paris"],
            correctAnswer: "C"
        },
        {
            text: "How many sides does a triangle have?",
            options: ["A. 3", "B. 4", "C. 5"],
            correctAnswer: "A"
        },
        {
            text: "What is 5 multiplied by 7?",
            options: ["A. 12", "B. 35", "C. 42"],
            correctAnswer: "C"
        },
        {
            text: "Which planet is known as the Red Planet?",
            options: ["A. Venus", "B. Mars", "C. Jupiter"],
            correctAnswer: "B"
        },
        {
            text: "How many days are there in a leap year?",
            options: ["A. 365", "B. 366", "C. 367"],
            correctAnswer: "B"
        },
        {
            text: "What comes after the letter 'Y' in the alphabet?",
            options: ["A. Z", "B. X", "C. W"],
            correctAnswer: "A"
        },
        {
            text: "Which animal is known as the 'king of the jungle'?",
            options: ["A. Tiger", "B. Lion", "C. Elephant"],
            correctAnswer: "B"
        },
        {
            text: "How many continents are there on Earth?",
            options: ["A. 4", "B. 6", "C. 7"],
            correctAnswer: "C"
        },
        {
            text: "What is the largest planet in our solar system?",
            options: ["A. Earth", "B. Venus", "C. Jupiter"],
            correctAnswer: "C"
        },
        {
            text: "How many fingers are there on one hand?",
            options: ["A. 4", "B. 5", "C. 6"],
            correctAnswer: "B"
        },
        // Add more questions for the easy level here
    ],
    medium: [
        {
            text: "What is the sum of 6 and 8?",
            options: ["A. 10", "B. 12", "C. 14"],
            correctAnswer: "B"
        },
        {
            text: "Which planet is known as the 'Morning Star'?",
            options: ["A. Mars", "B. Venus", "C. Mercury"],
            correctAnswer: "B"
        },
        {
            text: "How many sides does a hexagon have?",
            options: ["A. 5", "B. 6", "C. 7"],
            correctAnswer: "B"
        },
        {
            text: "What is the largest mammal on Earth?",
            options: ["A. Elephant", "B. Blue Whale", "C. Giraffe"],
            correctAnswer: "B"
        },
        {
            text: "What is the capital of Japan?",
            options: ["A. Tokyo", "B. Beijing", "C. Seoul"],
            correctAnswer: "A"
        },
        {
            text: "What is the square root of 49?",
            options: ["A. 6", "B. 7", "C. 8"],
            correctAnswer: "B"
        },
        {
            text: "Which gas do plants absorb from the atmosphere?",
            options: ["A. Oxygen", "B. Nitrogen", "C. Carbon dioxide"],
            correctAnswer: "C"
        },
        {
            text: "What is the chemical symbol for water?",
            options: ["A. Wo", "B. H2O", "C. Wa"],
            correctAnswer: "B"
        },
        {
            text: "How many continents have deserts?",
            options: ["A. 3", "B. 4", "C. 5"],
            correctAnswer: "C"
        },
        {
            text: "Which planet is known as the 'Red Planet'?",
            options: ["A. Venus", "B. Mars", "C. Jupiter"],
            correctAnswer: "B"
        },
        // Add more questions for the medium level here
    ],
    hard: [
        {
            text: "What is the largest organ in the human body?",
            options: ["A. Liver", "B. Heart", "C. Skin"],
            correctAnswer: "C"
        },
        {
            text: "Which gas do plants release during photosynthesis?",
            options: ["A. Oxygen", "B. Nitrogen", "C. Carbon dioxide"],
            correctAnswer: "A"
        },
        {
            text: "What is the chemical symbol for gold?",
            options: ["A. Au", "B. Ag", "C. Ge"],
            correctAnswer: "A"
        },
        {
            text: "What is the longest river in the world?",
            options: ["A. Nile", "B. Amazon", "C. Mississippi"],
            correctAnswer: "A"
        },
        {
            text: "Which element is represented by the symbol 'Fe' on the periodic table?",
            options: ["A. Iron", "B. Silver", "C. Gold"],
            correctAnswer: "A"
        },
        {
            text: "What is the tallest mountain on Earth?",
            options: ["A. Mount Everest", "B. K2", "C. Mount Kilimanjaro"],
            correctAnswer: "A"
        },
        {
            text: "How many bones are there in the adult human body?",
            options: ["A. 206", "B. 216", "C. 226"],
            correctAnswer: "A"
        },
        {
            text: "What is the process by which plants make their own food?",
            options: ["A. Photosynthesis", "B. Respiration", "C. Digestion"],
            correctAnswer: "A"
        },
        {
            text: "Which gas do humans exhale when they breathe?",
            options: ["A. Oxygen", "B. Nitrogen", "C. Carbon dioxide"],
            correctAnswer: "C"
        },
        {
            text: "What is the chemical symbol for oxygen?",
            options: ["A. Ox", "B. O2", "C. O"],
            correctAnswer: "C"
        },
        // Add more questions for the hard level here
    ]
};

        

        if (currentQuestion <= questions[currentLevel].length) {
            const question = questions[currentLevel][currentQuestion - 1];
            const questionTextElement = document.getElementById('question-text');
            const optionAElement = document.getElementById('option-A');
            const optionBElement = document.getElementById('option-B');
            const optionCElement = document.getElementById('option-C');
            const optionA = document.getElementById('optionA');
            const optionB = document.getElementById('optionB');
            const optionC = document.getElementById('optionC');

            questionTextElement.textContent = `Question ${currentQuestion}: ${question.text}`;
            optionAElement.value = question.options[0];
            optionBElement.value = question.options[1];
            optionCElement.value = question.options[2];
            optionA.textContent = question.options[0];
            optionB.textContent = question.options[1];
            optionC.textContent = question.options[2];

            correctAnswer = question.correctAnswer;
        }
    }

    function resetQuiz() {
        currentLevel = null;
        currentQuestion = 1;
        score = 0;
        levelSelection.style.display = 'block';
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'none';
    }

    // Event listeners for level selection
    document.getElementById('easy-level').addEventListener('click', function () {
        currentLevel = 'easy';
        levelSelection.style.display = 'none';
        questionContainer.style.display = 'block';
        updateQuestion();
        startTimer();
    });

    document.getElementById('medium-level').addEventListener('click', function () {
        currentLevel = 'medium';
        levelSelection.style.display = 'none';
        questionContainer.style.display = 'block';
        updateQuestion();
        startTimer();
    });

    document.getElementById('hard-level').addEventListener('click', function () {
        currentLevel = 'hard';
        levelSelection.style.display = 'none';
        questionContainer.style.display = 'block';
        updateQuestion();
        startTimer();
    });


 // ...



// Event listener for the "Next" button
nextButton.addEventListener('click', function () {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === correctAnswer) {
            score++;
          
        }

       
    }
    
    displayNextQuestion();
    // scoreElement.textContent = score;
    // console.log(score)
});

// ...


function displayResult() {
    resultContainer.style.display = 'block';
    scoreElement.textContent = score;

    let feedback = "You did well!";
    if (score < 5) {
        feedback = "You can do better!";
    } else if (score < 8) {
        feedback = "Good job!";
    }
    feedbackElement.textContent = feedback;
}

    

    

    // Event listener for the "Return to Level Selection" button
    returnToLevelButton.addEventListener('click', resetQuiz);
});


