var config = null;

// set in function injected
var cwServerUrl = document.cwServerUrl;

fetch(`${cwServerUrl}/ss/oapi/crm_config/zohocrm`)
  .then(response => response.json())
  .then(data => {
    config = data;
  });

var startTime = +new Date();
var maxTime = 10_000;
var timeInc = 200;

function showHideButton() {
  if (document.location.href.indexOf('/Contacts/') != -1 || document.location.href.indexOf('/Leads/') != -1) {
    document.getElementById('cw-zoho-button').classList.remove('cw-button-hide');
  } else {
    document.getElementById('cw-zoho-button').classList.add('cw-button-hide');
  }
}

function attemptToAddButton() {
  const sendEmailButton = document.getElementById('btn_send_mail');
  if (!sendEmailButton) {
    let now = +new Date();
    if (now - startTime <= maxTime) {
      setTimeout(() => attemptToAddButton(), timeInc);
    }
    return;
  }
  if (sendEmailButton && sendEmailButton.parentNode) {
    sendEmailButton.parentNode.insertBefore(buildCrankwheelButtonGray(), sendEmailButton);
    showHideButton();
  }
}

if (!document.getElementById('cw-zoho-button')) {
  attemptToAddButton();
}

function buildUrlQuery(config) {
  let output = {};
  for (let key in config) {
    let value = config[key];
    let splits = value.split('#');

    let baseElement = getElement(splits[0]);

    if (!baseElement) {
      output[key] = '';
    } else if (splits[1] === undefined) {
      output[key] = baseElement;
    } else {
      let innerSplits = splits[1].split(':');
      let innerType = innerSplits[0];
      let innerValue = innerSplits[1];

      switch (innerType) {
        case 'ATTR':
          output[key] = baseElement.getAttribute(innerValue);
          break;
        case 'innerText':
          output[key] = baseElement.innerText;
          break;
        case 'value':
          output[key] = baseElement.value;
          break;
        case 'PARAM':
          let query = baseElement.split('?')[1];
          let urlParams = new URLSearchParams(query);
          output[key] = urlParams.get(innerValue);
          break;
        }
    }
  }
  return new URLSearchParams(output).toString();
}

function getElement(selector) {

  let splits = selector.split(':');
  let type = splits[0];
  let value = splits[1];

  switch (type) {
    case 'QS':
      return document.querySelector(value);

    case 'ID':
      return document.getElementById(value);

    case 'URL':
      if (value === undefined) {
        return document.URL;
      } else if (value === 'LAST') {
        return getPureUrl().split('/').pop();
      } else {
        let index = parseInt(value);
        return getPureUrl().split('/')[index];
      }

    default:
      console.log('INVALID TYPE');
      return null;
  }
}

function getPureUrl() {
  return document.URL.split('?')[0];
}

function handleRedirect() {
  if (config === null) {
    return;
  }
  let urlInfo = buildUrlQuery(config);
  let url = `${cwServerUrl}/ss/crm_integration?${urlInfo}`;
  window.open(url, '_blank');
}

function buildCrankwheelButtonGray() {
  let newElement = document.createElement('div');
  newElement.innerHTML = '<div id="cw-zoho-button" class="cw-button-hide cw-zoho-gray-cont"><svg class="cw-zoho-gray" xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="none" viewBox="0 0 51 51"><title>Launch CrankWheel with this person\'s phone number and email pre-filled, and track meetings back to this person</title><path fill="#EAF0F6" stroke="#425B76" d="m45.386 19.235.047.156.131.098 4.336 3.252v4.978l-4.332 3.19-.143.104-.045.172c-.364 1.396-.974 2.743-1.66 4.052l-.076.146.025.163.843 5.419-3.486 3.486-5.359-.783-.16-.023-.144.075c-1.29.676-2.71 1.232-4.135 1.666l-.156.047-.098.131-3.252 4.336h-4.981l-3.252-4.336-.098-.13-.156-.048c-1.409-.429-2.764-1.044-4.072-1.729l-.144-.075-.16.023-5.361.783-3.549-3.49.783-5.357.024-.166-.08-.147c-.673-1.222-1.228-2.636-1.662-4.063l-.048-.158-.134-.099L.5 27.72v-4.978l4.336-3.252.14-.105.044-.169c.364-1.396.974-2.743 1.66-4.052l.075-.144-.023-.16-.783-5.36L9.5 5.95l5.359.783.16.023.144-.075a23.498 23.498 0 0 1 4.072-1.666l.156-.047.098-.131L22.741.5h4.978l3.19 4.332.106.145.175.044c1.456.364 2.802.974 4.11 1.659l.144.075.16-.023 5.356-.783 3.491 3.549-.783 5.36-.023.161.075.144a23.504 23.504 0 0 1 1.666 4.072Z"/><path fill="#425B76" d="M36.792 13.86c-1.449 0-2.709 1.26-2.709 2.709v9.513a5.915 5.915 0 0 1-5.922 5.922h-.756v-4.599a2.689 2.689 0 0 0-2.709-2.709 2.689 2.689 0 0 0-2.709 2.709v4.599h-.945c-3.465 0-6.363-2.835-6.363-6.363a6.345 6.345 0 0 1 6.363-6.363 2.689 2.689 0 0 0 2.709-2.709 2.689 2.689 0 0 0-2.709-2.709c-6.489 0-11.781 5.292-11.781 11.781 0 6.174 4.725 11.214 10.71 11.718.189 0 .315.063.504.063h7.686c6.237 0 11.34-5.103 11.34-11.34v-9.513c0-1.449-1.197-2.709-2.709-2.709Z"/></svg></div>'
  newElement.onclick = () => handleRedirect();
  return newElement;
}
