import OneSignal from 'onesignal-node'

export const firstNotification = new OneSignal.Notification({      
    contents: {      
        en: "Test notification",      
        tr: "Test mensaje"      
    },    
    include_player_ids: ["1dd608f2-c6a1-11e3-851d-000c2940e62c", "2dd608f2-c6a1-11e3-851d-000c2940e62c"]    
});      
    
// Add a new target after creating initial notification body    
firstNotification.postBody["include_player_ids"].push["3aa608f2-c6a1-11e3-851d-000c2940e62c"]    
    
myClient.sendNotification(firstNotification, function (err, httpResponse,data) {      
   if (err) {      
       console.log('Something went wrong...');      
   } else {      
       console.log(data);      
   }      
});      