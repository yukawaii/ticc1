/* import bridge from '@vkontakte/vk-bridge';

// Sends event to client
bridge.send('VKWebAppInit');

// Subscribes to event, sended by client
bridge.subscribe(e => console.log(e)); */

var score,id,token, name1;

function getid(){
    vkBridge.send('VKWebAppGetUserInfo')
.then(data => {console.log(data);
    // *назначение переменных*
id = data.id;
name1=data.first_name;
sessionStorage.setItem('id', id);
setTimeout(function (){console.log("id^ "+ id);}, 3000);
})
.catch(error => console.log(error));
  }
  getid();
  function gettoken(){
    vkBridge.send("VKWebAppGetAuthToken", { 
            "app_id": 8180074, 
            "scope": "friends,status"
          })
          .then(data => {console.log(data);
            token=data.access_token;
            sessionStorage.setItem('token', token);
            console.log("token^ for"+ id + "is^  :"+ token);
    })
    .catch(error => console.log(error)); }
    
    gettoken();  
     //первичная отправка очков в вк, проверка на 0
    function sendscore0(){

        score0=1;
        setTimeout(function (){
        vkBridge.send("VKWebAppCallAPIMethod", {"method": "secure.addAppEvent", "request_id": "32test", "params":
     {"client_secret":"DmtAFZKqEwtyLsnEOD2Z",
      "user_id":id,
      "activity_id":2,
       "value":score0, 
       "v": "5.131", 
       "global": 1,
    "access_token":"8d7a76f48d7a76f48d7a76f49b8d06a79e88d7a8d7a76f4efe9c7449a4bc80bec78fb31",
   //  "access_token":token
      }})
    .then(data => {console.log("Ответ на первичное добавление очков:" + data);
    })
    .catch(error => console.log(error)); }, 3000);}
    sendscore0();

 function getsc(){
  getid();
  setTimeout(function (){
    vkBridge.send("VKWebAppCallAPIMethod", {"method": "apps.getScore", "request_id": "32test", "params":
       {"user_id":id,
         "v": "5.131", 
         "access_token":"8d7a76f48d7a76f48d7a76f49b8d06a79e88d7a8d7a76f4efe9c7449a4bc80bec78fb31"}})
      .then(data => {console.log(data); score=data.response; console.log("getsc=  "+score); 
      })
      .catch(error => console.log(error)); }, 2000);}
getsc();

    function top0(){
      getsc();
          vkBridge.send("VKWebAppShowLeaderBoardBox", {"user_result": score, "global":1})
        .then(data => console.log(data.success))  
       .catch(error => console.log(error));
        } 