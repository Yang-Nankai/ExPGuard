let iF, iFTime;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen') return;

  switch (message.type) {
    case 'if-open':
      const request = message.data;
      if (iF && iF.src.lastIndexOf(request.data, 0) === 0) {
        const iFTimeTill = Math.ceil(Math.abs(new Date() - iFTime)/1000);
        if (iFTimeTill > request.urlExpire) {
          iF.onload = () => {
            iFTime = new Date();
            sendResponse(true);
          };
          iF.src = iF.src;
        } else {
          sendResponse(true);
        }
      } else {
        if (iF) iF.remove();
        iF = document.createElement('iframe');
        iF.id = 'myFrame';
        iF.onload = () => {
          iFTime = new Date();
          sendResponse(true);
        };
        iF.src = request.data;
        iF.style.cssText = 'width:800px;height:600px;';
        document.body.appendChild(iF);
      }
      break;

    case 'if-remove':
      if (iF) iF.remove();
      sendResponse(true);
      break;

    case 'if-script':
      iF.contentWindow.postMessage(message.data, "*");
      document.addEventListener(message.data.eventId, function handler(e) {
        document.removeEventListener(message.data.eventId, handler);
        sendResponse(e.detail);
      });
      break;
  }
  return true;
});

window.addEventListener("message", (event) => {
  document.dispatchEvent(new CustomEvent(event.data.eventId, {
    detail: event.data.data
  }));
}, false);