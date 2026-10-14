
let start = document.querySelector('#start');
// let stop = document.querySelector('#stop');



start.addEventListener('click', ()=>{
  // chrome.runtime.sendMessage({data: "start"});
  console.log("onload")
  window.open('https://examroom.ai', '__blank')
})


// stop.addEventListener('click', ()=>{
//   chrome.runtime.sendMessage({data: "refresh"})
//   // window.open('chrome://extensions/?id=fnolmkmpiogkhkmgejhpgkejekpojenj', '__blank')
// })

/* chrome.runtime.onConnect.addEventListener(function(port){
  let runtime = port;
  console.log('hahaha',runtime)

}) */







