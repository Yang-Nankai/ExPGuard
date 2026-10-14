chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

function disconnect(){
	if(!responseReceived){
      	sendResponse({error: 'CertipluginChrome: Erro ao executar a operação. Verifique se o executável está instalado.'});
	}
}

function message(msg){
	responseReceived = true;
    sendResponse(msg);
}

  var port = chrome.runtime.connectNative('br.com.certisign.certisigner');

  try {
	var responseReceived = false;

    port.onMessage.addListener(message);
    port.onDisconnect.addListener(disconnect);
    port.postMessage(request);
  } catch (e) {
    sendResponse({error: e.message});
    return false;
  }
  return true;
});
