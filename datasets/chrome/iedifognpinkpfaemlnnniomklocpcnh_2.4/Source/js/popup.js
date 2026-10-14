
document.addEventListener('DOMContentLoaded', function() {
  init();
  console.log('asdasd');
});

var init = function () {
	document.getElementById('popup_btn').textContent = chrome.i18n.getMessage('popup_btn');
	document.getElementById('popup_message').textContent = chrome.i18n.getMessage('popup_message');

	let a = chrome.i18n.getMessage('application_desc');
	console.log(a);
}
