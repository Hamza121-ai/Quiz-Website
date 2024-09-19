let quizData = [
    {
        question: "What does HTML stand for?",
        correct: "C. Hyper Text Markup Language",
        options: [
            "A. Hyper Type Multi Language",
            "B. Hyper Text Multiple Language",
            "C. Hyper Text Markup Language",
            "D. Home Text Multi Language"
        ]
    },
    {
        question: "What does CSS stand for?",
        correct: "A. Cascading Style Sheet",
        options: [
            "A. Cascading Style Sheet",
            "B. Cute Style Sheet",
            "C. Computer Style Sheet",
            "D. Codehal Style Sheet"
        ]
    },
    {
        question: "What does PHP stand for?",
        correct: "A. Hypertext Preprocessor",
        options: [
            "A. Hypertext Preprocessor",
            "B. Hometext Programming",
            "C. Hypertext Preprogramming",
            "D. Programming Hypertext Preprocessor"
        ]
    },
    {
        question: "What does SQL stand for?",
        correct: "D. Structured Query Language",
        options: [
            "A. Strength Query Language",
            "B. Stylesheet Query Language",
            "C. Science Question Language",
            "D. Structured Query Language"
        ]
    },
    {
        question: "What does XML stand for?",
        correct: "Extensible Markup Language",
        options: ["Excellent Multiple Language","Explore Multiple Language","Extra Markup Language","Extensible Markup Language"]

        
    }
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 5;
let timerInterval;

const resetLocalStorage = () => {
    for(i = 0; i < MAX_QUESTIONS; i++){
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();



const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if(userAnswer === quizData[questionNumber].correct){
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container.option");
    allOptions.forEach((o) =>{
        o.classList.add("disabled");
    });

};

const createQuestion = () => {
    clearInterval(timerInterval);

    let secondsLeft = 9;
    const timerDisplay = document.querySelector(".quiz-container .timer");

    timerDisplay.textContent = `Time Left: 10 seconds`;
    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${secondsLeft.toString().padStart(2, "0")} seconds`;
        secondsLeft--;

        if(secondsLeft < 3){
            timerDisplay.classList.add("danger");
        }

        if(secondsLeft < 0){
            clearInterval(timerInterval);
            displayNextQuestion();
        }

    }, 1000);


    options.innerHTML = "";
    question.innerHTML = `<span class= 'question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

    quizData[questionNumber].options.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);

        });
        options.appendChild(option);
    });

};

const retakeQuiz = () => {
     questionNumber = 0;
     score = 0;
     resetLocalStorage();

     createQuestion();
     quizResult.style.display = "none";
     quizContainer.style.display = "block";
}

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for(let i = 0; i < MAX_QUESTIONS; i++){
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if(!answeredCorrectly){
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${quizData
            [i].question}</div>
            <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
            <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

            quizResult.appendChild(resultItem);
        
        }
        const retakeBtn = document.createElement("button");
        retakeBtn.classList.add("retake-btn");
        retakeBtn.innerHTML = "Retake Quiz";
        retakeBtn.addEventListener("click", retakeQuiz);
        quizResult.appendChild(retakeBtn);


        };
        


createQuestion();

const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1){
        displayQuizResult();
        return;
    }


    questionNumber++;
    createQuestion();

};

nextBtn.addEventListener("click", displayNextQuestion);

