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
        question: "<img src = '../mem/img/110.png' width='250' height='250' />",
        options: ["Сизокрылка", "Казарка", "Сизоворонка", "Буревестник"],
        answer: 2,
        description: "Сизоворонка обыкновенная.Пристально наблюдает за обстановкой и в случае опасности немедленно улетает",
    }, {
        question: "<img src = '../mem/img/111.png' width='250' height='250' />",
        options: ["Капибара", "Верблюд", "Лама", "Альпака"],
        answer: 1,
        description: "Верблюд двугорбый. Два раза в год, весной и осенью, меняет меховой наряд.",
    },{
        question: "<img src = '../mem/img/112.png' width='250' height='250' />",
        options: ["Омар чёрный", "Морской краб", "Скорпион", "Рак-убийца"],
        answer: 2,
        description: "Скорпион черный. Самки проявляют заботу о потомстве и носят малышей на себе.",
    },{
        question: "<img src = '../mem/img/113.png' width='250' height='250' />",
        options: ["Кеклик", "Казарка", "Кукушка", "Утка-мандаринка"],
        answer: 0,
        description: "Кеклик азиатский - маленькая птичка: средняя длина тела 35 см, вес от 350 до 800 г.",
    },{
        question: "<img src = '../mem/img/114.png' width='250' height='250' />",
        options: ["Пони", "Олень", "Лошадь", "Антилопа"],
        answer: 2,
        description: "Лошадь Пржевальского. Рост в холке — 130 см, а масса — 300–350 кг. ",
    },{
        question: "<img src = '../mem/img/115.png' width='250' height='250' />",
        options: ["Домашний паук", "Паук домовый", "Длинноног", "Мухоед"],
        answer: 1,
        description: "Паук домовый обладает острым зрением и способностью улавливать колебания света, живёт рядом с человеком",
    },
    {
        question: "<img src = '../mem/img/116.png' width='250' height='250' />",
        options: ["Фламинго", "Колпица", "Ибис", "Цапля"],
        answer: 3,
        description: "Цапля рыжая. Ведет колониальный образ жизни. В полете изгибает шею буквой S",
    },
    {
        question: "<img src = '../mem/img/117.png' width='250' height='250' />",
        options: ["Лис рыжий", "Волк красный", "Лис пушистый", "Волк рыжий"],
        answer: 1,
        description: "Красные волки живут семьями. Самцы остаются верными спутнице и принимают активное участие в воспитании детенышей",
    },
    {
        question: "<img src = '../mem/img/118.png' width='250' height='250' />",
        options: ["Лягушка", "Жаба", "Чесночница", "Песочница"],
        answer: 2,
        description: "Чесночница сирийская.Иногда используют в качестве укрытий норы других животных или прячутся под корнями деревьев, камнями",
    },{
        question: "<img src = '../mem/img/119.png' width='250' height='250' />",
        options: ["Ибис", "Колпица", "Журавль", "Цапля"],
        answer: 1,
        description: "Колпица обыкновенная. Гнездится колониями, иногда вместе с ибисами, каравайками и цаплями — от 5 до 150 особей.",
    },{
        question: "<img src = '../mem/img/120.png' width='250' height='250' />",
        options: ["Дикая кошка", "Лис серый", "Песец", "Манул"],
        answer: 3,
        description: "Манул охотится в сумерках, ночью и на рассвете, а днем отдыхает в своем или чужом логове",
    },{
        question: "<img src = '../mem/img/121.png' width='250' height='250' />",
        options: ["Гюрза", "Уж", "Полоз", "Кобра"],
        answer: 0,
        description: "Гюрза смертельно опасна. Нередко зимует на виноградниках.",
    },{
        question: "<img src = '../mem/img/122.png' width='250' height='250' />",
        options: ["Ястреб", "Сокол", "Бородач", "Орёл"],
        answer: 2,
        description: "Бородачи выбирают себе пару на всю жизнь, придерживаются одних и тех же мест гнездования.",
    },{
        question: "<img src = '../mem/img/123.png' width='250' height='250' />",
        options: ["Волк", "Шакал", "Лис", "Собака динго"],
        answer: 1,
        description: "Шакал обыкновенный. Если шакалы охотятся вдвоем, то гонят добычу друг на друга",
    },{
        question: "<img src = '../mem/img/124.png' width='250' height='250' />",
        options: ["Саранча", "Кузнечик", "Стрекоза", "Светлячок"],
        answer: 0,
        description: "Саранча азиатская перелетная. За лето потомство 1 самки саранчи съедает столько, сколько хватило бы для двух овец на тот же период",
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