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
        question: "<img src = '../mem/img/161.png' width='250' height='250' />",
        options: ["Птица-носорог", "Сиалия", "Сизоворонка", "Баклан"],
        answer: 0,
        description: "Птица-носорог азиатская.  Ведет скрытный образ жизни, проводя большую часть времени в кроне тропических деревьев. ",
    }, {
        question: "<img src = '../mem/img/162.png' width='250' height='250' />",
        options: ["Орангутан", "Верблюд", "Гиббон", "Слон"],
        answer: 3,
        description: "Слон азиатский. Тяжело переносит полуденный зной — прячется в тени деревьев.",
    },{
        question: "<img src = '../mem/img/163.png' width='250' height='250' />",
        options: ["Тюлень", "Дюгонь", "Ламантин", "Кит"],
        answer: 1,
        description: "Дюгонь каждые четверть часа подплывает к поверхности воды, чтобы сделать глоток воздуха.",
    },{
        question: "<img src = '../mem/img/164.png' width='250' height='250' />",
        options: ["Кеклик", "Ибис", "Журавль", "Сиали"],
        answer: 2,
        description: "Журавль индийский. Танец — неотъемлемая часть брачного ритуала",
    },{
        question: "<img src = '../mem/img/165.png' width='250' height='250' />",
        options: ["Леопард", "Кошка", "Лис", "Манул"],
        answer: 1,
        description: "Кошка-рыболов. Подкарауливает рыбу, сидя на береге реки, и оглушаетее ударом мощной лапы",
    },{
        question: "<img src = '../mem/img/166.png' width='250' height='250' />",
        options: ["Рыба-молот", "Скат", "Спинорог", "Манта"],
        answer: 3,
        description: "Манта.  Часто можно увидеть отдыхающей на поверхности водной глади.",
    },
    {
        question: "<img src = '../mem/img/167.png' width='250' height='250' />",
        options: ["Павлин", "Колпица", "Ибис", "Птица-носорог"],
        answer: 0,
        description: "Павлин обыкновенный. Самые опасные враги павлина — гремучие змеи, тигры и леопарды",
    },
    {
        question: "<img src = '../mem/img/168.png' width='250' height='250' />",
        options: ["Тюлень", "Носорог", "Буйвол", "Броненосец"],
        answer: 1,
        description: "Носорог индийский. Днем отдыхают в небольших водоемах, наполненных жидкой грязью.",
    },
    {
        question: "<img src = '../mem/img/169.png' width='250' height='250' />",
        options: ["Дельфин", "Манта", "Чесночница", "Акула"],
        answer: 3,
        description: "Акула мальгашская ночная. Известны случаи нападения на людей, но без смертельных исходов.",
    },{
        question: "<img src = '../mem/img/170.png' width='250' height='250' />",
        options: ["Угуису", "Колпица", "Майна", "Тетерев"],
        answer: 2,
        description: "Майна обыкновенная. В неволе ее можно обучить человеческой речи.",
    },{
        question: "<img src = '../mem/img/171.png' width='250' height='250' />",
        options: ["Мартышка", "Горилла", "Гиббон", "Орангутан"],
        answer: 3,
        description: "Орангутан отлично приспособлен к жизни на деревьях.",
    },{
        question: "<img src = '../mem/img/172.png' width='250' height='250' />",
        options: ["Кит", "Скат", "Молот-рыба", "Медуза"],
        answer: 2,
        description: "Молот-рыба бронзовая. Несмотря на внушительные размеры, не представляет опасности для человека.",
    }    ]
  
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
    sendscore();
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