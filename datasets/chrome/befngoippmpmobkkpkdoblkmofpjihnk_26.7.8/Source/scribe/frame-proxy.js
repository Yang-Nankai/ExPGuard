const frame = document.querySelector('iframe')

// this gets replaced at build time by gulp
const url = new URL('https://account.leadiq.com/app/surf-micro')
url.search = window.location.search
frame.src = url
