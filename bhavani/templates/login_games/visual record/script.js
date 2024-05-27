document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".option");
    const question = document.querySelector(".question p");
    const message = document.querySelector(".message");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");

    const questions = [
        {
            image: "catt.jpeg",
            correctAnswer: "Cat",
            options: ["Cat", "Dog", "Elephant","Tiger"],
            selectedAnswer: null // Added to track selected answer
        },
        {
            image: "elephant.jpg",
            correctAnswer: "Elephant",
            options: ["Lion", "Elephant", "Giraffe","Cow"],
            selectedAnswer: null // Added to track selected answer
        },
        {
            image: "https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg",
            correctAnswer: "Bicycle",
            options: ["Helicopter", "Car", "Bicycle","Bike"],
            selectedAnswer: null // Added to track selected answer
        },
        {
            image: "https://greatergood.berkeley.edu/images/EIQuiz/q2_question_image.jpg",
            correctAnswer: "Happiness",
            options: ["Sadness", "Happiness", "Disgust","Pain"],
            selectedAnswer: null // Added to track selected answer
        },
        {
            image: "https://greatergood.berkeley.edu/images/EIQuiz/q3_question_image.jpg",
            correctAnswer: "Anger",
            options: ["Sadness", "Happiness", "Politeness","Anger"],
            selectedAnswer: null // Added to track selected answer
        },
        {
            image: "https://greatergood.berkeley.edu/images/EIQuiz/q6_question_image.jpg",
            correctAnswer: "Surprise",
            options: ["Surprise", "Happiness", "Fear","Compassion"],
            selectedAnswer: null // Added to track selected answer
        },
        // Add more questions here with their respective options and selectedAnswer
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let totalQuestions = questions.length;

    function loadQuestion(questionIndex) {
        const currentQuestion = questions[questionIndex];
        question.textContent = "What is this Expressing?";
        document.querySelector(".question img").src = currentQuestion.image;

        // Update the options
        options.forEach((option, index) => {
            option.textContent = currentQuestion.options[index];
            option.style.backgroundColor = "#007acc"; // Reset option colors
        });
    }

    function validateAnswer() {
        const currentQuestion = questions[currentQuestionIndex];
        return currentQuestion.selectedAnswer !== null;
    }

    loadQuestion(currentQuestionIndex);

    options.forEach(option => {
        option.addEventListener("click", function () {
            const selectedAnswer = this.textContent;
            const currentQuestion = questions[currentQuestionIndex];
            currentQuestion.selectedAnswer = selectedAnswer; // Track selected answer
            options.forEach(opt => {
                opt.style.backgroundColor = "#007acc"; // Reset option colors
            });
            this.style.backgroundColor = "#004f80"; // Highlight selected option
        });
    });

    nextButton.addEventListener("click", function () {
        if (validateAnswer()) {
            const selectedAnswer = questions[currentQuestionIndex].selectedAnswer;
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedAnswer === currentQuestion.correctAnswer) {
                message.textContent = "Correct!";
                score++;
            } else {
                message.textContent = "Try Again!";
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                loadQuestion(currentQuestionIndex);
                message.textContent = "";
            } else {
                question.textContent = "Quiz completed!";
                document.querySelector(".question img").src = "https://img.freepik.com/premium-vector/congratulations-lettering-message-vector-greeting_7233-463.jpg";
                options.forEach(option => {
                    option.style.display = "none";
                });
                nextButton.style.display = "none";
                restartButton.style.display = "block";
                message.textContent = `Your Score: ${score} / ${totalQuestions}`;
            }
        } else {
            message.textContent = "Please select an answer before proceeding.";
        }
    });

    restartButton.addEventListener("click", function () {
        currentQuestionIndex = 0;
        score = 0;
        questions.forEach(question => {
            question.selectedAnswer = null; // Reset selected answers
        });
        loadQuestion(currentQuestionIndex);
        options.forEach(option => {
            option.style.display = "block";
        });
        nextButton.style.display = "block";
        restartButton.style.display = "none";
        message.textContent = "";
    });
});
