document.getElementById("openHomeBtn").addEventListener("click", function() {
	var homeUrl = 'https://etrain.info/';
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		homeUrl = 'https://m.etrain.info/';
	}
	chrome.runtime.sendMessage({type:'openHome', url:homeUrl}, function(resp){});
});
document.getElementById("version").textContent = chrome.runtime.getManifest().version;