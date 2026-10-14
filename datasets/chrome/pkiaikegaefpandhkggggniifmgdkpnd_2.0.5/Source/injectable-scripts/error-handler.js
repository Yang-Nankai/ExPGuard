const ERROR = 'error';
const INFO = 'info';
const WARNING = 'warning';

const removeCandidateNotVisibleAlert = () => {

  const alertMessage = document.getElementById('user-position-check');

  if (typeof alertMessage !== 'undefined' && alertMessage !== null) {

    alertMessage.parentNode.removeChild(alertMessage);

  }

  return;

}

const addCandidateNotVisibleAlert = () => {

  const userCheckMessage = document.createElement('div');
  userCheckMessage.id = 'user-check-message';

  userCheckMessage.innerText = 'Please make sure you are visible in the camera';

  const userCheckMessageContainer = document.createElement('div');
  userCheckMessageContainer.id = 'user-check-message-container';

  userCheckMessageContainer.appendChild(userCheckMessage);

  const userPositionCheck = document.createElement('label');
  userPositionCheck.id = 'user-position-check';

  userPositionCheck.appendChild(userCheckMessageContainer);

  document.body.appendChild(userPositionCheck);

}

const setupErrorMessageUI = () => {

  const errorMessageText = document.createElement('label');
  errorMessageText.id = 'error-message-text';

  const errorMessageTitle = document.createElement('label');
  errorMessageTitle.id = 'error-message-title';

  const errorMessageContent = document.createElement('div');
  errorMessageContent.id = 'error-message-content';

  errorMessageContent.appendChild(errorMessageTitle);
  errorMessageContent.appendChild(errorMessageText);

  const errorMessageContainer = document.createElement('div');
  errorMessageContainer.id = 'error-message-container';

  errorMessageContainer.appendChild(errorMessageContent);

  const hireproLogo = document.createElement('img');
  hireproLogo.id = 'hirepro-logo';
  hireproLogo.alt = 'HirePro';
  hireproLogo.src = 'https://s3-ap-southeast-1.amazonaws.com/all-hirepro-files/hirepro/transcript_hirepro_logo.png';

  const topBar = document.createElement('div');
  topBar.id = 'top-bar';

  topBar.appendChild(hireproLogo);

  const errorMessage = document.createElement('div');
  errorMessage.id = 'error-message';

  errorMessage.appendChild(topBar);
  errorMessage.appendChild(errorMessageContainer);

  errorMessage.className = 'hide';

  document.body.append(errorMessage);

}

const removeError = () => {

  const errorMessageDiv = document.getElementById('error-message');

  if (typeof errorMessageDiv !== 'undefined' && errorMessageDiv !== null) {

    errorMessageDiv.parentNode.removeChild(errorMessageDiv);

  }

  return;

}

const displayError = (error) => {

  removeError();
  removeCandidateNotVisibleAlert();

  setupErrorMessageUI();

  $('#error-message-title').text(error.mainText);
  $('#error-message-text').text(error.message);

  $('#error-message').removeClass('hide');
  $('#error-message').removeClass('show');

  if (error.closeable === true) {

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.innerText = 'Close';
    closeButton.id = 'error-close-button';

    closeButton.onclick = () => {
      log('Pressed close!');
      $('#error-message').addClass('hide');
    }

    $('#error-message-content').append(closeButton);

  }

  if (error.actionButtonText !== '') {

    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.innerText = error.actionButtonText;
    actionButton.id = 'error-action-button';

    actionButton.onclick = () => {
      error.action();
      $('#error-message').addClass('hide');
    }

    $('#error-message-content').append(actionButton);

  }

}

const addError = (options) => {

  const { type, mainText,  message, actionButtonText, closeable, action } = options;

  if (typeof type !== 'string') {
    throw new Error('type needs to be a string');
  }

  if (typeof mainText !== 'string') {
    throw new Error('maintext needs to be a string');
  }

  if (typeof message !== 'string') {
    throw new Error('message needs to be a string');
  }

  if (typeof actionButtonText !== 'string') {
    throw new Error('actionButtonText needs to be a string');
  }

  if (typeof closeable !== 'boolean') {
    throw new Error('closeable needs to be a boolean');
  }

  if (typeof action !== 'function') {
    throw new Error('action needs to be a function');
  }

  displayError(options);

}