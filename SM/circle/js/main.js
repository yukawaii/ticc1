let SCORE = 0;

const askQuestion = () => {
    const settingOrder = document.getElementById("setting-order").value;
    const questionOrder = settingOrder === "question" ? "trad" : "jp";
    const answerOrder = settingOrder === "answer" ? "trad" : "jp";

    const possibleModes = Array.from(document.getElementsByName("setting-mode"))
        .filter(option => option.checked)
        .map(mode => mode.value);
    if (possibleModes.length < 1) window.location.reload(true);
    const mode = possibleModes[Math.floor(Math.random() * possibleModes.length)];

    const answerCount = 4;
    const possibleAnswers = DATA[mode]
        .sort(() => .5 - Math.random())
        .slice(0, answerCount);
    const answer = possibleAnswers[Math.floor(Math.random() * answerCount)];

    const questionElem = document.getElementById("question");
    questionElem.innerHTML = '<div id="question-content">' + answer[questionOrder] + '</div>';

    const settingTimeAttack = document.getElementById("setting-time-attack").checked;
    const settingTimeAttackSpeed = parseInt(document.getElementById("setting-time-attack-speed").value);
    const timeout = settingTimeAttack ? setTimeout(() => answerQuestion(answer[questionOrder], ''), settingTimeAttackSpeed * 1000) : null;

    if (settingTimeAttack) {
        const timeoutElem = document.createElement("div");
        timeoutElem.id = 'timeoutElem';
        timeoutElem.style.animation = "progress " + settingTimeAttackSpeed + "s linear";
        questionElem.appendChild(timeoutElem);
    }

    const answersElem = document.getElementById("answers");
    answersElem.innerHTML = "";
    possibleAnswers.forEach(possibleAnswer => {
        const answerElem = document.createElement("div");
        answerElem.className = "answer " + (mode === "kanji" || mode === "vocabulary" ? "long" : "short");
        answerElem.onclick = () => {
            if (settingTimeAttack) {
                timeoutElem.style.webkitAnimationPlayState = 'paused';
                clearTimeout(timeout);
            }
            answerQuestion(answer["trad"], possibleAnswer["trad"]);
        }
        answersElem.appendChild(answerElem);

        const answerGuess = document.createElement("div");
        answerGuess.className = "answer-guess";
        answerGuess.innerHTML = possibleAnswer[answerOrder];
        answerElem.appendChild(answerGuess);

        const answerValue = document.createElement("div");
        answerValue.className = "answer-value";
       answerValue.innerHTML = possibleAnswer[questionOrder] ; // +"  " +possibleAnswer["kun"].split(' ')[0];
     answerElem.appendChild(answerValue);
    });
}
var xp=1;
var lvl =1;
var userid=vkBridge.send('VKWebAppGetUserInfo');
function getinfo(){
  userid=vkBridge.send('VKWebAppGetUserInfo')
  .then(function (data) {userid = data.id; console.log("data_id: " + data.id + " MY userid: " + userid);
  sessionStorage.setItem("userid", userid);
      // *назначение переменных*
      return userid;
      
  })
  .catch(error => console.log(error));
 // getsc();
  
};
window.onload = getinfo();
    
function sendxptovk(xp){
    vkBridge.send("VKWebAppCallAPIMethod", {"method": "secure.addAppEvent", "request_id": "appevent", "params": 
    {"client_secret":"n34FNAF7MZWUhCKmUEZX", 
    "user_id":userid, "activity_id":2, "value":xp, "v":"5.131",
     "access_token":"622a2818622a2818622a2818276256f0986622a622a281800bc642eaaa7170413f766fd",
     "global":1}})
     .then(function(data){console.log("Ответ на добавление очков:" + data.response);
    })
    .catch(error => console.log(error)); 
}


sendxptovk(1);
//взять опыт из вк, поделить и получить уровень
function getxptolvl(){
xp = vkBridge.send("VKWebAppCallAPIMethod", {"method": "apps.getScore", "request_id": "getscore", "params":
{"user_id": userid, "v":"5.131",
 "access_token":"622a2818622a2818622a2818276256f0986622a622a281800bc642eaaa7170413f766fd", global:1}})
.then(function (data) {console.log("Очков v вк:" + data.response);
 // *назначение переменных*
xp = data.response;
lvl = Math.floor(xp/500);
return xp, lvl;
})
.catch(error => console.log(error));
}
var xpvk=1;
function getxpfromvk(){
    vkBridge.send("VKWebAppCallAPIMethod", {"method": "apps.getScore", "request_id": "getscore", "params":
    {"user_id": userid, "v":"5.131",
     "access_token":"622a2818622a2818622a2818276256f0986622a622a281800bc642eaaa7170413f766fd", global:1}})
   .then(function (data) {console.log("Очков на вк:" + data.response);
     // *назначение переменных*
  xpvk = data.response;
     return xpvk;
   })
   .catch(error => console.log(error));
};

function sendxpup(){
    getxpfromvk();
    xp= xp+xpvk; 
 sendxptovk(xp);
}

const answerQuestion = (answer, guess) => {
    SCORE = guess === answer ? SCORE + 1 : 0;
    const scoreElem = document.getElementById("score");
    scoreElem.innerHTML = "x" + SCORE;
    if (SCORE>0) {xp=xp+1;
     sessionStorage.setItem('xp', xp);
     sendxpup();
    console.log('xp в сессии update from main.js = ', xp);}
    scoreElem.style.opacity = SCORE > 1 ? 1 : 0;
    scoreElem.animate([
        { transform: "rotate(-15deg) scale(2)" },
        { transform: "rotate(-15deg) scale(1)" }
    ], 200);

    document.getElementById("answers").childNodes.forEach(answerElem => {
        answerElem.onclick = () => false;
        // цвета фона: верно- зелёные, невверно- красные
      
        answerElem.style.backgroundColor = (answerElem.firstChild.innerHTML === answer || answerElem.lastChild.innerHTML === answer) ? "#C3FBD8 " : "#FED6BC";
        answerElem.firstChild.style.height = "48px";
        answerElem.firstChild.style.lineHeight = "48px";
        answerElem.style.fontSize = "24px";
        answerElem.lastChild.style.color = "#000000";
    });
    setTimeout(() => askQuestion(), 4000);
}

window.onload = () => {

  document.getElementById("settings-container").onmouseenter = event => {
        document.getElementById("settings").style.height = "300px"; 
 
    }

  document.getElementById("settings-container").onmouseleave = event =>  {
        document.getElementById("settings").style.height = "0px";
 
    }
    askQuestion();
}