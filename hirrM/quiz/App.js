//инициализация
const bridge = vkBridge.default;
bridge.subscribe((e) => console.log("vkBridge event", e));
bridge.send("VKWebAppInit", {});
var userid=0;

  function getid(){
    bridge.send('VKWebAppGetUserInfo')
.then(data => {console.log(data.id);
    // *назначение переменных*
userid = data.id;
})
.then(data => console.log(data.result))
.catch(error => console.log(error));
  }
  getid();
//поделиться
function share1(){
bridge.send("VKWebAppShare", {"text": "Интересные игры!", "link": "vk.com/app8156273"});
}
function share2(){
  bridge.send("VKWebAppShowWallPostBox", {
    "message": "Игры для быстрого запоминания хираганы!",
    "attachments": "https://vk.com/app8165024"
  });
}

function favor1(){
bridge.send("VKWebAppAddToFavorites");
}
function myadd1(){
  bridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
.then(data => console.log(data.result))
.catch(error => console.log(error));
}
function joingroup(){
  bridge.send("VKWebAppJoinGroup", {"group_id": 213417231});
}
//пригласить друзей в игру
function infr(){
  bridge.send("VKWebAppShowInviteBox", {})
}


  //отправка очков в вк
  function ressend(){
bridge.send("VKWebAppCallAPIMethod", {"method": "secure.addappEvent", "request_id": "32test", "params":
 {"user_id":userid,
  "activity_id":2,
   "value":score, 
   "v": "5.1", 
   "access_token":"2612c80d2612c80d2612c80d77266e5ead226122612c80d446f8f02f2b5426621bfea1f"}})
.then(response => {console.log("Ответ на добавление очков:" + response);
})
.catch(error => console.log(error)); }

  function top1(){
    bridge.send("VKWebAppShowLeaderBoardBox", {user_result: score, global:1})
    .then(data => console.log(data.success))  
   .catch(error => console.log(error));
    } 

