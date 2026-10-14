var queryString = window.location.search;
var URLParams = new URLSearchParams(queryString);

var authUrl = 'https://b4g.baydin.com/getpartitionedcookie';
var email = URLParams.get('email');
var otp = URLParams.get('otp');
if (email) {
    authUrl += '?email=' + email;
}
if (otp) {
    authUrl += '&otp=' + otp;
}
document.getElementById('b4giframe').setAttribute("src",authUrl);