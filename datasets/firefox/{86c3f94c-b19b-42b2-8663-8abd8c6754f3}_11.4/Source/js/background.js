//Start of check for permissions begore the user logs in
var permissionsGranted = false;
const checkPermissions = {
  origins: ["https://cookn-cloud.appspot.com/*", "http://localhost:5918/*", "https://www.dvo.com/*"],
};

async function checkHostPermissions() {
	const granted = await  browser.permissions.contains(checkPermissions);
	permissionsGranted = granted;
}

checkHostPermissions();
// End of check for permissions
