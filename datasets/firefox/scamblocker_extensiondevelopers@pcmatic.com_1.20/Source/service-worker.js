var brow = {};

if (chrome.runtime) {
  brow = chrome.runtime;
} else {
  brow  =browser.runtime;
}
brow.onMessage.addListener((message, sender, sendResponse) =>  {
  if (message.callingFunc === 'isMalicious') {
    const  sw_blockingPost = async (message) => {

      try {

        let body = new URLSearchParams();

        for (const [key, value] of Object.entries(message.form)) {
          body.set(key,value);
        }

        const response = await fetch(message.url, {
         method: 'POST',
         headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body
         });
         const data = await response.json();
         message.data = data;
         sendResponse(message);
       } catch(error) {
        message.data = error
        sendResponse(message);
       } 
    } 
    sw_blockingPost(message);
    return true;
  }

});