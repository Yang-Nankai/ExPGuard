"use strict";
const extApi = globalThis.browser ?? globalThis.chrome;

function onResponse(action){
  if(action){
    for(let i=0;i<localStorage.length;i++){
      let key=localStorage.key(i);
      if(key.indexOf("SC.UserDefaults")==0){
        let s=localStorage.getItem(key);
        if(s){
          s=s.replace(/"lastSelectedFolder":"\S+?"/,'"lastSelectedFolder":"'+action+'"');
          localStorage.setItem(key,s);
        }
        break;
      }
    }
  }
}

extApi.runtime.sendMessage({cmd: "getAction"}).then(onResponse);
  

