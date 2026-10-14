function getUrlParams()
{
	return params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
}

var params = getUrlParams();

if(params.permissions && params.permissions.indexOf("downloads") !== -1)
{
	document.getElementById("permissionUrl").innerHTML = "manage your downloads";
}
else document.getElementById("permissionUrl").innerHTML = `access the page <i>'${params.url}'</i>`;

function sendMsgToExt(grantAccess, url)
{
	var msg = {
		type: G2C_MSG.REDIRECT_URL,
		grantAccess: grantAccess,
		url: url,
	};
	
	// console.log(msg);
	chrome.runtime.sendMessage(msg);
}

document.getElementById("grantAccess").onclick = function(){
	
	params = getUrlParams();
	
	console.log("Requesting permissions for "+params.url);
	
	var permissions = [];

	if(params.permissions)
	{
		permissions = JSON.parse(params.permissions);
	}
	
	chrome.permissions.request({
		origins: [params.url],
		permissions: permissions,
	}, (granted) => {
		
		console.log(granted);
		if (granted) {
			
			console.log("Permission granted");
			sendMsgToExt(true, params.url);
			
		} else {
			
			console.log("Host permission denied");
			sendMsgToExt(false, params.url);
		}
	});
};

document.getElementById("notNow").onclick = function(){
	
	params = getUrlParams();
	
	sendMsgToExt(false, params.url);
};