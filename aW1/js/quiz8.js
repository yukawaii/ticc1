const questionText = document.getElementById("question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goHomeBtn = document.querySelector(".go-home-btn");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const nameText = document.getElementById("myForm");
const finalMsg = document.querySelector(".finalMsg");

let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];
let interval;

const myApp = [
 
    {
        question: "<img src = '../mem/img/98.png' width='250' height='250' />",
        options: ["Чайка", "Казарка", "Перепёлка", "Буревестник"],
        answer: 3,
        description: "Буревестник средиземноморский. Ныряет на глубину 15 м, но плохо передвигается по суше, опираясь на грудь и крылья",
    }, {
        question: "<img src = '../mem/img/99.png' width='250' height='250' />",
        options: ["Черепаха морская", "Тортилла", "Средиземноморская", "Береговая черепаха"],
        answer: 2,
        description: "Черепаха средиземноморская. Ночью и днем спит, прячась между камнями или зарывшись в песок. Зимой впадает в спячку",
    },{
        question: "<img src = '../mem/img/100.png' width='250' height='250' />",
        options: ["Каракатица", "Морской конёк", "Кальмар", "Креветка"],
        answer: 0,
        description: "Каракатица обыкновенная. Каждый плавник работает сам по себе,поэтому она передвигается немного боком.",
    },{
        question: "<img src = '../mem/img/101.png' width='250' height='250' />",
        options: ["Сокол", "Ястреб", "Кукушка", "Снегирь"],
        answer: 0,
        description: "Сокол средиземноморский. Действуют сообща: одна птица пугает добычу, а другая ловит ее на лету.",
    },{
        question: "<img src = '../mem/img/102.png' width='250' height='250' />",
        options: ["Пума", "Олень", "Лань", "Антилопа"],
        answer: 2,
        description: "Лань. В отдельных частях ареала встречаются совершенно темные или, напротив, практически белые лани.",
    },{
        question: "<img src = '../mem/img/103.png' width='250' height='250' />",
        options: ["Камбала", "Спинорог", "Скат", "Манта"],
        answer: 1,
        description: "Спинорог серый. . В составе первого спинного плавника есть три колючих луча для обороны, напоминающих рога",
    },
    {
        question: "<img src = '../mem/img/104.png' width='250' height='250' />",
        options: ["Тигр", "Пума", "Пантера", "Леопард"],
        answer: 3,
        description: "Леопард. Охотятся ночью, поодиночке, выслеживая жертву из засады.",
    },
    {
        question: "<img src = '../mem/img/105.png' width='250' height='250' />",
        options: ["Цапля", "Фламинго", "Журавль", "Аист"],
        answer: 1,
        description: "Фламинго обыкновенный. Ноги без перьев мёрзнут, поэтому поднимает то одну, то другую ногу.",
    },
    {
        question: "<img src = '../mem/img/106.png' width='250' height='250' />",
        options: ["Уж", "Черепаха", "Полоз", "Гюрза"],
        answer: 2,
        description: "Полоз эскулапов. Укус не смертелен, но весьма болезнен.",
    },{
        question: "<img src = '../mem/img/107.png' width='250' height='250' />",
        options: ["Орбис", "Ибис", "Ирис", "Катарсис"],
        answer: 1,
        description: "Ибис священный. Охотится на других птиц, поедает их яйца. Врагов нет.",
    },{
        question: "<img src = '../mem/img/108.png' width='250' height='250' />",
        options: ["Мышь", "Тушканчик", "Белка-летяга", "Лисица фенек"],
        answer: 3,
        description: "Лисица фенек ведёт ночной образ жизни. Может прыгать на высоту 70 сантиметров",
    },{
        question: "<img src = '../mem/img/109.png' width='250' height='250' />",
        options: ["Скарабей", "Колорад", "Жук-навозник", "Майский жук"],
        answer: 0,
        description: "Скарабей священный. Основное занятие — скатывание шариков навоза (еда скарабея). ",
    }
    ]
  
function load() {
    //console.log("test");
    number++;
    questionText.innerHTML = myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = number + " / " + myApp.length;
}

function createOptions() {
    optionBox.innerHTML = "";
    for (let i = 0; i < myApp[questionIndex].options.length; i++) {
        // console.log(myApp[questionIndex].options[i]);
        const option = document.createElement("div");
        option.innerHTML = myApp[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

function generateRandomQuestion() {
    let randomNumber = Math.floor(Math.random() * (myApp.length));
    let hitDuplicate = 0;
    if (myArray.length == 0) {
        questionIndex = randomNumber;
    } else {
        for (let i = 0; i < myArray.length; i++) {
            if (randomNumber == myArray[i]) {
                hitDuplicate = 1;
                // console.log("found duplicate")
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        } else {
            questionIndex = randomNumber;
        }
    }

    myArray.push(randomNumber);
    // console.log(myArray);
    load();

}

function check(ele) {
    // console.log(ele.id);
    const id = ele.id;
    if (id == myApp[questionIndex].answer) {
        // console.log("correct");
        ele.classList.add("correct");
        score++;
        scoreBoard();
    } else {
        // console.log("wrong");
        ele.classList.add("wrong");
        // show correct answer when clicked answer is wrong;
        for (let i = 0; i < optionBox.children.length; i++) {
            if (optionBox.children[i].id == myApp[questionIndex].answer) {
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

    if (number / (myApp.length) == 1) {
        // console.log("over");
        quizOver();
    }
}

function timeIsUp() {
    showTimeUpText();
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == myApp[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct");
        }
    }
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();

}

function startTimer() {
    let timeLimit = 10;
    remainingTime.classList.remove("less-time");
    interval = setInterval(() => {
        timeLimit--;
        if (timeLimit < 10) {
            timeLimit = "0" + timeLimit;
        }
        if (timeLimit < 6) {
            remainingTime.classList.add("less-time");
        }

        remainingTime.innerHTML = timeLimit;
        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered");
    }
}

function showAnswerDescription() {
    // answer description will only show if it is definied
    if (typeof myApp[questionIndex].description !== "undefined") {
        answerDescription.classList.add("show");
        answerDescription.innerHTML = myApp[questionIndex].description;
    }
}

function hideAnswerDescription() {
    answerDescription.classList.remove("show");
    answerDescription.innerHTML = "";
}

function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");

}

function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove("show");
}

function showTimeUpText() {
    timeUpText.classList.add("show");
}

function hideTimeUpText() {
    timeUpText.classList.remove("show");
}

function scoreBoard() {
    correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    // questionIndex++;
    generateRandomQuestion();
    // load();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}

function quizResult() {
    document.querySelector(".total-questions").innerHTML = myApp.length;
    document.querySelector(".total-attempt").innerHTML = attempt;
    document.querySelector(".total-correct").innerHTML = score;
    document.querySelector(".total-wrong").innerHTML = attempt - score;
    const percentage = (score / (myApp.length)) * 100;
    document.querySelector(".percentage").innerHTML = Math.floor(percentage) + "%";
    sessionStorage.setItem("score1", score);
}

let namesAndScores = JSON.parse(localStorage.getItem("namesAndScores"));

    if (namesAndScores === null) {
        namesAndScores = [
                {"name": "Melody",
                "score": "100%"}
        ]
    };

function resetQuiz() {
    attempt = 0;
    // questionIndex = 0;
    score = 0;
    number = 0;
    myArray = [];
}

function quizOver() {
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener("click", () => {
    // quizBox.style.display = "none";
    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

startAgainQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

goHomeBtn.addEventListener("click", () => {
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
})

startQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizHomeBox.classList.remove("show");
    startTimer();
    generateRandomQuestion();
})

// // window.onload = () => {
//     // load();
//     startTimer();
//     generateRandomQuestion();
// }