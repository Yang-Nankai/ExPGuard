
// function handleError(error) {
//     console.log(error);
// }

// function setCookie(name, value) {
//     document.cookie = name + "=" + value;
// }

var button = document.getElementById('access');

button.onclick = function() {
    window.close();
}

const script = document.createElement('script');
script.src = 'assets/web_assist/js/webassistbundled.min.js';
document.body.appendChild(script);

const style = document.createElement('link');
style.type = 'text/css';
style.rel = "stylesheet";
style.href = 'assets/web_assist/css/webassistui.min.css';
document.head.appendChild(style);

//setCookie('microphone', 'true');