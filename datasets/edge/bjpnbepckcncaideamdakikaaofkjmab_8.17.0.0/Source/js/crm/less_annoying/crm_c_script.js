var config = null;

// set in function injected
var cwServerUrl = document.cwServerUrl;

fetch(`${cwServerUrl}/ss/oapi/crm_config/less_annoying`)
  .then(response => response.json())
  .then(data => {
    console.log('LESS ANNOYING DATA', data);
    config = data;
  });

var buttonHtml = '\
  <div class="ExpandablePageMenuChild PageMenuChild GRAY_COLOR_5 GRAY_COLOR_3_BORDER BLUE_COLOR_1_BACKGROUND PageMenuExpandableSection ">\
    <button class="UnstyledButton PageMenuActionLink GRAY_COLOR_3_BACKGROUND_HOVER GRAY_COLOR_6" type="button" title="">\
      <svg xmlns="http://www.w3.org/2000/svg" class="PageMenuActionLink_Icon GRAY_COLOR_4_SVG Svg_StrokeWidth_1_5" height="20" width="20" fill="none" viewBox="0 0 51 51">\
        <path fill="#829AB1" d="M45.864 19.089a23.998 23.998 0 0 0-1.701-4.158l.819-5.607-3.843-3.906-5.607.819c-1.323-.693-2.709-1.323-4.221-1.701L27.972 0h-5.481l-3.402 4.536a23.998 23.998 0 0 0-4.158 1.701l-5.607-.819-3.906 3.906.819 5.607c-.693 1.323-1.323 2.709-1.701 4.158L0 22.491v5.481l4.536 3.339c.441 1.449 1.008 2.898 1.701 4.158l-.819 5.607 3.906 3.843 5.607-.819c1.323.693 2.709 1.323 4.158 1.764l3.402 4.536h5.481l3.402-4.536c1.449-.441 2.898-1.008 4.221-1.701l5.607.819 3.843-3.843-.882-5.67c.693-1.323 1.323-2.709 1.701-4.158l4.536-3.339v-5.481l-4.536-3.402Z"/>\
        <path fill="#ffffff" d="M36.792 13.86c-1.449 0-2.709 1.26-2.709 2.709v9.513a5.915 5.915 0 0 1-5.922 5.922h-.756v-4.599a2.689 2.689 0 0 0-2.709-2.709 2.689 2.689 0 0 0-2.709 2.709v4.599h-.945c-3.465 0-6.363-2.835-6.363-6.363a6.345 6.345 0 0 1 6.363-6.363 2.689 2.689 0 0 0 2.709-2.709 2.689 2.689 0 0 0-2.709-2.709c-6.489 0-11.781 5.292-11.781 11.781 0 6.174 4.725 11.214 10.71 11.718.189 0 .315.063.504.063h7.686c6.237 0 11.34-5.103 11.34-11.34v-9.513c0-1.449-1.197-2.709-2.709-2.709Z"/>\
      </svg>\
      <span class="PageMenuActionLink_Text">Launch CrankWheel</span>\
    </button>\
    <div class="ExpandableSectionLine"></div>\
  </div>\
';

function attemptToAddButton(attemptNumber) {

  let list = document.getElementById('PageMenuWrapperContent');

  if (list && list.children && list.children[0]) {
    let node = document.createElement('div');
    node.id = "CrankWheelButton";
    node.style = 'position: relative;';
    node.innerHTML = buttonHtml;
    node.onclick = handleRedirect;
    list.children[0].appendChild(node);
  } else if (attemptNumber < 5) {
    window.setTimeout(function () { attemptToAddButton(++attemptNumber); }, 200);
  }
}

attemptToAddButton(1);

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

    case 'URLQS':
      let params = new URLSearchParams(window.location.search);
      return params.get(value);

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


function buildCrankwheelButton() {
  let newElement = document.createElement('div');
  newElement.classList.add('m-x-2');
  newElement.classList.add('m-top-2');
  newElement.classList.add('text-center');
  newElement.classList.add('cw-hubspot');
  newElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 51 51"><title>Launch CrankWheel</title><path fill="#FF7A59" d="M45.864 19.089a23.998 23.998 0 0 0-1.701-4.158l.819-5.607-3.843-3.906-5.607.819c-1.323-.693-2.709-1.323-4.221-1.701L27.972 0h-5.481l-3.402 4.536a23.998 23.998 0 0 0-4.158 1.701l-5.607-.819-3.906 3.906.819 5.607c-.693 1.323-1.323 2.709-1.701 4.158L0 22.491v5.481l4.536 3.339c.441 1.449 1.008 2.898 1.701 4.158l-.819 5.607 3.906 3.843 5.607-.819c1.323.693 2.709 1.323 4.158 1.764l3.402 4.536h5.481l3.402-4.536c1.449-.441 2.898-1.008 4.221-1.701l5.607.819 3.843-3.843-.882-5.67c.693-1.323 1.323-2.709 1.701-4.158l4.536-3.339v-5.481l-4.536-3.402Z"/><path fill="#FAFDF6" d="M36.792 13.86c-1.449 0-2.709 1.26-2.709 2.709v9.513a5.915 5.915 0 0 1-5.922 5.922h-.756v-4.599a2.689 2.689 0 0 0-2.709-2.709 2.689 2.689 0 0 0-2.709 2.709v4.599h-.945c-3.465 0-6.363-2.835-6.363-6.363a6.345 6.345 0 0 1 6.363-6.363 2.689 2.689 0 0 0 2.709-2.709 2.689 2.689 0 0 0-2.709-2.709c-6.489 0-11.781 5.292-11.781 11.781 0 6.174 4.725 11.214 10.71 11.718.189 0 .315.063.504.063h7.686c6.237 0 11.34-5.103 11.34-11.34v-9.513c0-1.449-1.197-2.709-2.709-2.709Z"/></svg>'
  newElement.onclick = () => handleRedirect();
  return newElement;
}
