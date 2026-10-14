"use strict";
function clear(em){
  let last;
  while (last = em.lastChild) em.removeChild(last);
}

function openUrl(url,match,action){
  if(action)extApi.runtime.sendMessage({cmd: "setAction",action:action});
  return extApi.runtime.sendMessage({ cmd: "openUrl", url: url, match: match });
}

function openMsg(url,match,req,host){
  extApi.runtime.sendMessage({cmd: "openUrl",url:url,match:match});
  if(req)extApi.runtime.sendMessage({cmd: "reqAction",req:req,hosts:host});
}

function getTimeStr(date){
  let now=new Date();
  now.setHours(0,0,0);
  if(date>=now){
    return date.toLocaleString(undefined,{"hour12":false,"hour":"numeric","minute":"numeric"});
  }
  now.setMonth(0,1);
  if(date>=now){
    return date.toLocaleString(undefined,{"month":"short","day":"numeric"});
  }
  return date.toLocaleString(undefined,{"year":"2-digit","month":"numeric","day":"numeric"});
}

function createElement(tag,cls,title){
  let em = document.createElement(tag);
  if(cls)em.setAttribute("class",cls);
  if(title)em.setAttribute("title",title);
  return em;
}