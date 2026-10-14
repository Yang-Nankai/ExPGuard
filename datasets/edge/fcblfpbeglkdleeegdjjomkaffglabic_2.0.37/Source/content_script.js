let __DEBUG = false;

if (__DEBUG) {
  console.log('matador.ai', window == top);
}

let matadorSessionKey = '';
let matadorUserEmail = '';
let unreadMessages = 0;

const phoneNumberRegex = new RegExp(
  /(((\+?([0-9]+))?\(?(([0-9]{4})|([0-9]{3})|([0-9]{2}))\)?[ -.●](([0-9]{3})|([0-9]{4}))[ -.●]+(([0-9]{4})|([0-9]{3})))|\+?[1-9]\d{9,12})/gi
);

const emailRegex = new RegExp(
  '^(?!.*XXXX)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$'
);

/**
 * Validates that a phone number match is standalone (not part of a URL or larger string).
 * Returns true if the phone number is valid (properly separated from other content).
 * Only allows: whitespace, +, -, (, ), . or start/end of string around the number
 * This blocks URL characters like =, &, ?, /, etc.
 */
function isValidPhoneNumberMatch(text, match) {
  if (!match || !match[0]) return false;

  const matchedText = match[0];
  const matchIndex = text.indexOf(matchedText);

  if (matchIndex === -1) return false;

  // Allowed characters around a phone number (whitespace and common phone separators)
  const allowedChars = /^[\s+\-().,:;]*$/;

  // Check character before the match
  if (matchIndex > 0) {
    const charBefore = text[matchIndex - 1];
    // Only allow specific phone-valid separators before the number
    if (!allowedChars.test(charBefore)) {
      return false;
    }
  }

  // Check character after the match
  const afterIndex = matchIndex + matchedText.length;
  if (afterIndex < text.length) {
    const charAfter = text[afterIndex];
    // Only allow specific phone-valid separators after the number
    if (!allowedChars.test(charAfter)) {
      return false;
    }
  }

  return true;
}

let isAlreadyLoaded = false;
let excludedElementIDs = ['SupportFeedbackLeftPhone'];
var matadorLink = 'https://app.matador.ai';
var matadorConversationLink = `${matadorLink}/messages/extension`;
var matadorConversationLinkPhone = `${matadorConversationLink}?phone_number=`;
var matadorConversationLinkEmail = `${matadorConversationLink}?email=`;
var matadorBlueButton = null;
var matadorBlueButtonDraggableIcon = null;
var matadorUnreadButton = null;
var matadorUnreadButtonBlinker = null;
let lastUrl = null;
let functionsExposed = false;
//For Vinsolution it doesn't work for SupportFeedbackLeftPhone

let matadorExtensionOptions = {
  eleadEnabled: true,
  realtorEnabled: true,
  dealerSocketEnabled: true,
  dpEnabled: true,
  egmEnabled: true,
  dealerpeakEnabled: true,
  autoAlertEnabled: true,
  automotiveMasterMindEnabled: true,
  fahrneyEnabled: true,
  crmSuiteEnabled: true,
  carResearchEnabled: true,
  connectcdkEnabled: true,
  dealerCenterEnabled: true,
  leaddriverEnabled: true,
  vinSolutionEnabled: true,
  vautodealersEnabled: true,
  vanillaSoftEnabled: true,
  xtimeEnabled: true,
  promaxEnabled: true,
  tmsEnabled: true,
  goxeeEnabled: true,
  autogatetEnabled: true,
  d2cMediaEnabled: true,
  sellyEnabled: true,
  asnsoftwarecrmEnabled: true,
  dealerstudioEnabled: true,
  activixEnabled: true,
  oneEightyEnabled: true,
  linkedinEnabled: true,
  momentumEnabled: true,
  idealautosyndicateEnabled: true,
  pipedriveEnabled: true,
  carWarsEnabled: true,
  opLogicEnabled: true,
  zoomInfoEnabled: true,
  zohoEnabled: true,
  highergearEnabled: true,
  dealerCloudEnabled: true,
  hubspotEnabled: true,
  elogpsEnabled: true,
  onetoyotaEnabled: true,
  xencallEnabled: true,
  autoswatchEnabled: true,
  tekionEnabled: true,
  readymodeEnabled: true,
  reynoldEnabled: true,
  subaruEnabled: true,
  getmyautoEnabled: true,
  googleDocEnabled: true,
  repromptEnabled: true,
  dealercarsearchEnabled: true,
  panelPosition: 'right',
  unreadButtonChecked: 'right',
  extensionType: 'full',
  extensionTypeManuallyChanged: false,
};

const action_buttons_arr = [
  `<div data-button-name="template" class="matador_action_button matador_circle_button">
                      <input type="button" class="matador_action_button_overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1;" />
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 10.1H0H0.5ZM0.5 2.9H1H0.5ZM2.94444 0.5V0V0.5ZM9.05556 0.5V2.68221e-07V0.5ZM11.5 2.9H11H11.5ZM11.5 6.70589H12H11.5ZM5.59859 12.5V12V12.5ZM2.94444 12.5V13V12.5ZM10.784 8.40294L10.4337 8.04616L10.784 8.40294ZM7.32707 11.7971L7.67737 12.1538H7.67737L7.32707 11.7971ZM6.61111 10.1H6.11111H6.61111ZM9.05556 7.7V7.2V7.7ZM3.55556 3C3.27941 3 3.05556 3.22386 3.05556 3.5C3.05556 3.77614 3.27941 4 3.55556 4V3.5V3ZM8.44445 4C8.72059 4 8.94444 3.77614 8.94444 3.5C8.94444 3.22386 8.72059 3 8.44445 3V3.5V4ZM3.55556 6C3.27941 6 3.05556 6.22386 3.05556 6.5C3.05556 6.77614 3.27941 7 3.55556 7V6.5V6ZM6 7C6.27614 7 6.5 6.77614 6.5 6.5C6.5 6.22386 6.27614 6 6 6V6.5V7ZM0.5 10.1H1L1 2.9H0.5H3.27826e-07L0 10.1H0.5ZM2.94444 0.5V1L9.05556 1V0.5V2.68221e-07L2.94444 0V0.5ZM11.5 2.9H11V6.70589H11.5H12V2.9H11.5ZM5.59859 12.5V12H2.94444V12.5V13H5.59859V12.5ZM10.784 8.40294L10.4337 8.04616L6.97678 11.4403L7.32707 11.7971L7.67737 12.1538L11.1343 8.75973L10.784 8.40294ZM5.59859 12.5V13C6.37657 13 7.1245 12.6967 7.67737 12.1538L7.32707 11.7971L6.97678 11.4403C6.6128 11.7976 6.11722 12 5.59859 12V12.5ZM11.5 6.70589L11 6.70589C11 7.20681 10.7974 7.68911 10.4337 8.04616L10.784 8.40294L11.1343 8.75973C11.6875 8.21661 12 7.47801 12 6.70589H11.5ZM0.5 2.9H1C1 1.85927 1.86187 1 2.94444 1V0.5V0C1.32696 -5.96046e-08 3.8743e-07 1.28976 3.27826e-07 2.9H0.5ZM0.5 10.1H0C-5.96046e-08 11.7102 1.32696 13 2.94444 13V12.5V12C1.86187 12 1 11.1407 1 10.1H0.5ZM9.05556 0.5V1C10.1381 1 11 1.85927 11 2.9H11.5H12C12 1.28977 10.673 3.27826e-07 9.05556 2.68221e-07V0.5ZM6.61111 12.5H7.11111V10.1H6.61111H6.11111V12.5H6.61111ZM9.05556 7.7V8.2L11.5 8.2V7.7V7.2L9.05556 7.2V7.7ZM6.61111 10.1H7.11111C7.11111 9.05927 7.97298 8.2 9.05556 8.2V7.7V7.2C7.43807 7.2 6.11111 8.48977 6.11111 10.1H6.61111ZM3.55556 3.5V4H8.44445V3.5V3H3.55556V3.5ZM3.55556 6.5V7H6V6.5V6H3.55556V6.5Z" fill="#77808D"/>
                      </svg>
                    </div>`,

  `<div data-button-name="attachment" class="matador_action_button matador_circle_button">
                      <input type="button" class="matador_action_button_overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1;" />
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_42735_346413)">
                          <path d="M7.7627 0.538086C8.35046 0.538086 8.89945 0.831353 9.22559 1.32031L9.8623 2.27539H10.1201C11.7308 2.27539 13.0369 3.58078 13.0371 5.19141V7.94629C12.6865 7.62609 12.2812 7.36466 11.8369 7.17773V5.19141C11.8367 4.24353 11.0681 3.47559 10.1201 3.47559H9.54102C9.34058 3.47559 9.15331 3.37467 9.04199 3.20801L8.22754 1.98633C8.12399 1.831 7.94938 1.7373 7.7627 1.7373H5.52734C5.34084 1.73739 5.167 1.83119 5.06348 1.98633L4.24902 3.20801C4.13772 3.37473 3.9495 3.47559 3.74902 3.47559H3.16992C2.2221 3.47573 1.45337 4.24361 1.45312 5.19141V9.24609C1.45343 10.1938 2.22214 10.9628 3.16992 10.9629H6.03027C6.02983 10.9881 6.02832 11.0137 6.02832 11.0391C6.02836 11.4285 6.0821 11.8053 6.18164 12.1631H3.16992C1.5594 12.1629 0.254208 10.8566 0.253906 9.24609V5.19141C0.254151 3.58087 1.55936 2.27553 3.16992 2.27539H3.42773L4.06445 1.32031C4.39053 0.831336 4.93962 0.538172 5.52734 0.538086H7.7627ZM6.64551 4.88184C7.87556 4.88201 8.8805 5.83165 8.97266 7.03809C8.49423 7.18641 8.05299 7.41951 7.66504 7.71777C7.73897 7.56691 7.78215 7.39808 7.78223 7.21875C7.78212 6.59072 7.27352 6.08123 6.64551 6.08105C6.01735 6.08105 5.50792 6.59061 5.50781 7.21875C5.50808 7.84675 6.01745 8.35645 6.64551 8.35645C6.79698 8.3564 6.94112 8.32529 7.07324 8.27148C6.74935 8.63886 6.48946 9.06356 6.30957 9.52832C5.17813 9.36516 4.30786 8.39524 4.30762 7.21875C4.30772 5.92787 5.35461 4.88184 6.64551 4.88184Z" fill="#7854F6"/>
                          <path d="M10.7436 11.9657L9.41682 9.80902C9.23363 9.51123 8.84373 9.41834 8.54595 9.60153C8.24816 9.78471 8.15527 10.1746 8.33846 10.4724L9.66522 12.6291C10.0316 13.2247 10.8114 13.4105 11.407 13.0441C12.0025 12.6777 12.1883 11.8979 11.8219 11.3024L10.4952 9.14563C9.94561 8.25229 8.77591 7.9736 7.88256 8.52317C6.98922 9.07273 6.71053 10.2424 7.2601 11.1358L8.58686 13.2925" stroke="#7854F6" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_42735_346413">
                            <rect width="14" height="14" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>`,
  `<div data-button-name="appointment" class="matador_action_button matador_circle_button">
                      <input type="button" class="matador_action_button_overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1;" />
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="14" height="14" fill="url(#pattern0_42735_346408)"/>
                        <defs>
                          <pattern id="pattern0_42735_346408" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_42735_346408" transform="scale(0.0125)"/>
                          </pattern>
                          <image id="image0_42735_346408" width="80" height="80" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYVSURBVHgB7ZxRcts2EIZ/SMr00coNlBNYvkBNnyDpCeKcwHbsdCZPlp8609qxc4LIJ3B8gYrKBayeIMwJqkzzFNtEdyGpiSUApAhCEVl8Mx55SFEkfy7AxWIXQCAQqDACKyA6l22keEZ/SfxKxPBI9LvsooEOmhjFByKBZxrwTPSH3Jf3+FtKvJMCg5/P5Dk8EZ3KvmzgRgJXdM6PfG54xqsFkuV1+EaweNL9+Ei8RYlEZ3KXH9LCuZp4TJY4hif8WuA9urrNZCFdlM829NfwFB7xK6BAGzWnBU+oF4fEBpvbPNSEO9zkUCLUv3Z05yK8PsRS+0DqtCP+oF/dlvy5XoyEQExN+jL+VYxQEqUIqIQTOF5D0UyMRAMX8UtxCUecBKRm2qUnel4h4R4ikJCQOy7+YuGXyNS/u6mseIxEZ+ov9lCQQhaoHFbgOWoEvYQuPhyKAyzJ0gKWIp5EAu7Qy0Sql1cHbvSHR+LFMgcsJSCbOj2p44yvjflptiT6qcCObnSAAheaeW1n8h2da3d+O93gLm4xxCM8pf37WSIva4m5+0A1VLKLNybL3CdhHtMFnPx5JD5hTYhfi4SHjsNX4olI8UK1AAOCRF5mDJ1LQDWmhUU8SW7BLbY+zI9vG9D6W+SP+RibJrqN9JZ9sJ18wL64w45NRDYUvmfkIJ8FpiSeNJg+i/eFXIHXi64AuQcjakKXc99P8BWlBhIUX+k8c6Jwcxy8FMP5r/K1iha26F+TQ92WaWZXpcjsA00RlckVkh/1BVvxiT3aQTG6XQozbVPzGOMOb3Vil0H0G1lNC3skXJtubJQV8eHhprzDjalfpOvdyYpfZgto6JzVwbd44kuMVcEBWI4h6vZRV3MRZ7xQMpswiffMsKtfdfEYHheTUD3dPjYcFRSxYBVwGhzQ/gBZ3wnqQkP1ybpuqE1dTtd+qH2vKRj5vg7WN2Masda/UBr2gKxdQKlXnzrO96gZ1Iy1kRkp7Y63XUCT157iL9QNg89qMqJvh1kwqv/I7IRWmES7NWPoVyikz9OU26cSdYLuqRDe54XrThDQkSCgI0FAR4KAjhR6C1PQdCVZXauGPIulXYtggY4EAR0JAjoSBHQkCOhIENCRIKAjQUBHgoCOBAEdCQI6EgR0xFuW/vcUKfVSx9wjAqeDtFTZVq6EpDqWevW+L/WiiMdN1mw/517LFB9VyRYdQ//fKGHsx3SiUzmYK/XqwTNeBTTkFLI4xno5lfCT4oos75vInMvcwMAqfLpYJaDS1CbZFd7wbYH68itzvg1UKoV+OpXTLLZNh5lyeEhEr7nc6/cSsZSHiaaXxEwn/AqYwlTIYk4Naark80WhJBJdsuQMU7oJbY/hEa8C8htXLqaOxbbMLn7binQhBXcsJH6BjSY4j+9BegafOz5yr0ayYZ3bMM0RLDsnojJHf8Im9WGf8tapRceyLTawKbnv+4xhVhbsjJ03kuv0OnTMdd5jZhS535UIWBWK3G8YiTgSBHQkCOhIIQGzhmJVpOg9WQWkrjPR7rh1LupbRzrardKeTJplgabE603UjdSQyivcBEx0GyX0hTcVR5uNT63Q6rfaBUxxbdjTrVM/qMrZDMEIEtBakWAXsKXU1xegpNhDXTAXFo5t42/GKqAalwr0dfvoifWygpxVYGp9u4bdmfUw2W6MuRlDNnFV5aY8Dd4OTPvzlLNlCsgRFRoI9rU7J6teDKooohKPrh3mSqRcxZT5HOnJkzBFNrpqziJnhfc6MK2BZsvTd0FcB52zmDKXgKrCW1p+kC2RmkL0Rq79UihqvZtU1Qcb+28uf81bTLlUWIoXT+RFGTJ+MeFCZfq8XsW0Yh6mlexcNb/3YLJKAwdhedEM5MTvujFCRZJnrtCPmM/okCDdLNH+gzyO4aHHdWNm5LLEqlFAPKZQNIYXppGGMvkqota7OSy2EJDb6m3Ut8gWvc3cl1z6UcQ0gXXgsp5gOesHTpY14aFdVUYmcaOBXtYwLQ/lrmDJQzuB56rjnkuzWAN4ijVu0l8Zws3wuwwyCSpa2JCTlT9WPlqhm0uoiSbpP/i87BRnIBD4X/AvHgSC/hCrKqUAAAAASUVORK5CYII="/>
                        </defs>
                      </svg>
                    </div>`,
];

function getMatadorIconHTML({
  text,
  normalizedPhoneNumber = '',
  type,
}) {
  // Get extension type from storage (defaults to 'full')
  let extensionType = matadorExtensionOptions.extensionType || 'full';

  // Force legacy mode if user hasn't manually changed the extension type and their email is in the list
  if (
    !matadorExtensionOptions.extensionTypeManuallyChanged &&
    isLegacyOnlyEmail(matadorUserEmail)
  ) {
    extensionType = 'legacy';
  }

  const objElements = {
    phone: {
      data: `data-matador-phone-number="${text}" data-normalize-phone-number="${normalizedPhoneNumber}"`,
      className: 'matador-click-handler',
      icon: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 1.5H6.5C8.98528 1.5 11 3.51472 11 6C11 8.48528 8.98528 10.5 6.5 10.5H3C1.89543 10.5 1 9.60457 1 8.5V6C1 3.51472 3.01472 1.5 5.5 1.5ZM6 6.5C6.27614 6.5 6.5 6.27614 6.5 6C6.5 5.72386 6.27614 5.5 6 5.5C5.72386 5.5 5.5 5.72386 5.5 6C5.5 6.27614 5.72386 6.5 6 6.5ZM8.5 6C8.5 6.27614 8.27614 6.5 8 6.5C7.72386 6.5 7.5 6.27614 7.5 6C7.5 5.72386 7.72386 5.5 8 5.5C8.27614 5.5 8.5 5.72386 8.5 6ZM4 6.5C4.27614 6.5 4.5 6.27614 4.5 6C4.5 5.72386 4.27614 5.5 4 5.5C3.72386 5.5 3.5 5.72386 3.5 6C3.5 6.27614 3.72386 6.5 4 6.5Z" fill="#48AF80"/>
            </svg>
            `,
      text: 'SMS',
    },
    email: {
      data: `data-matador-email="${text}"`,
      className: 'matador-email-click-handler',
      icon: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 1.5C1.89543 1.5 1 2.39543 1 3.5V8.5C1 9.60457 1.89543 10.5 3 10.5H9C10.1046 10.5 11 9.60457 11 8.5V3.5C11 2.39543 10.1046 1.5 9 1.5H3ZM3.20801 3.68796C3.03569 3.57308 2.80287 3.61964 2.68798 3.79197C2.5731 3.96429 2.61967 4.19712 2.79199 4.312L4.68259 5.5724C5.48035 6.10424 6.51965 6.10424 7.31741 5.5724L9.20801 4.312C9.38034 4.19712 9.4269 3.96429 9.31202 3.79197C9.19714 3.61964 8.96431 3.57308 8.79199 3.68796L6.90139 4.94836C6.35555 5.31225 5.64445 5.31225 5.09861 4.94836L3.20801 3.68796Z" fill="#EA9957"/>
            </svg>
            `,
      text: 'Email',
    },
  };

  // WORKAROUND for 1Password extension consuming user gesture:
  // 1Password doesn't consume gestures from <input type="button"> elements
  // This invisible overlay receives the click and preserves the user gesture
  const inputOverlay = `<input type="button" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1;" />`;

  // Legacy mode - just the logo, no wrapper, no plus button
  if (extensionType === 'legacy') {
    return `<span ${objElements[type].data} data-matador-link="1" class="matador_legacy_icon ${objElements[type].className}" style="position:relative;">${inputOverlay}</span>`;
  }

  // Plus button (shared by full and simple modes)
  const plusBtn = `
    <div class="matador_actions_button_wrapper">
      <div class="matador_actions_toggle matador_circle_button" role="button" tabindex="0">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.75 0.75V8.75M8.75 4.75L0.75 4.75" stroke="#A3A1B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>`;

  // Simple mode - icon stacked above text
  if (extensionType === 'simple') {
    const simpleButton = `
      <div data-matador-link="1" ${objElements[type].data} class="matador_button_wrapper_simple ${objElements[type].className}" style="position:relative;">
        ${inputOverlay}
        ${objElements[type].icon}
        <span class="matador_button_text_small">${objElements[type].text}</span>
      </div>
    `;
    return `<div class="matador_icon_and_buttons_wrapper">${simpleButton} ${plusBtn}</div>`;
  }

  // Full mode - default with all features
  const matadorButton = `
      <div data-matador-link="1" ${objElements[type].data} class="matador_button_wrapper ${objElements[type].className}" style="position:relative;">
        ${inputOverlay}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2909 1.72148C13.9574 1.37923 13.4639 1.25172 13.0037 1.38594L2.27265 4.50651C1.78712 4.6414 1.44298 5.02862 1.35027 5.52053C1.25557 6.02116 1.58637 6.65669 2.01854 6.92244L5.37392 8.9847C5.71806 9.1961 6.16224 9.14308 6.44702 8.85585L10.2893 4.9897C10.4827 4.78837 10.8028 4.78837 10.9962 4.9897C11.1896 5.18431 11.1896 5.49973 10.9962 5.70105L7.14731 9.56788C6.86186 9.85444 6.80851 10.3007 7.01859 10.647L9.06876 14.036C9.30886 14.4387 9.72237 14.6668 10.1759 14.6668C10.2292 14.6668 10.2893 14.6668 10.3426 14.6601C10.8628 14.593 11.2763 14.2373 11.4297 13.734L14.611 3.01669C14.7511 2.56035 14.6244 2.06374 14.2909 1.72148Z" fill="#0E0E0E"/>
        </svg>

        <span class="matador_button_text">
          ${objElements[type].text}
        </span>
        <div class="matador_circle_button">
          ${objElements[type].icon}
        </div>
      </div>
  `;

  return `<div class="matador_icon_and_buttons_wrapper">${matadorButton} ${plusBtn}</div>`;
}

function isElementVisible(el) {
  if (!el) return false;

  let cur = el;

  while (cur && cur !== document) {
    const style = getComputedStyle(cur);

    if (
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      style.visibility === 'collapse' ||
      style.opacity === '0'
    ) {
      return false;
    }

    cur = cur.parentElement;
  }

  return true;
}

function cleanEmailString(email) {
  if (!email) return '';
  return email.replace(/[^a-zA-Z0-9._%+-@]/g, '');
}

function getInnerTextWithoutMatador(element) {
  if (!element) return '';
  const clone = element.cloneNode(true);
  const matadorElements = clone.querySelectorAll(
    '.matador_icon_and_buttons_wrapper, .matador_button_wrapper'
  );
  matadorElements.forEach((el) => el.remove());
  return clone.innerText.trim();
}

function createFloatingMatadorIcon({
  node,
  placement = 'center',
  offset = 0,
  html,
}) {
  const el = document.createElement('div');
  el.innerHTML = html.trim();
  const element = el.firstElementChild;

  if (!isElementVisible(node.parentNode)) {
    return;
  }

  node.parentNode.insertBefore(element, node.nextSibling);

  const parent = node.parentNode;
  const computedStyle = window.getComputedStyle(parent);

  if (
    (computedStyle.overflow === 'hidden' ||
      computedStyle.overflowX === 'hidden') &&
    (computedStyle.maxWidth !== 'none' ||
      computedStyle.width !== 'auto')
  ) {
    parent.style.overflow = 'visible';
    parent.style.overflowX = 'visible';
  }

  if (
    computedStyle.display === 'flex' ||
    computedStyle.display === 'inline-flex'
  ) {
    element.style.flexShrink = '0';
  }

  const wrapper = element.querySelector(
    '.matador_actions_button_wrapper'
  );
  const mainButton = element.querySelector(
    '.matador_button_wrapper, .matador_button_wrapper_simple'
  );

  if (!wrapper) return;

  const floating = document.createElement('div');

  floating.className = 'floating_actions_menu';
  floating.style.position = 'fixed';
  floating.style.zIndex = 999999;

  action_buttons_arr.forEach((btnHTML) => {
    const btnEl = document.createElement('template');
    btnEl.innerHTML = btnHTML.trim();
    const btnNode = btnEl.content.firstElementChild;

    btnNode.addEventListener('click', (e) => {
      const buttonName = btnNode.getAttribute('data-button-name');
      const type = mainButton.classList.contains(
        'matador-email-click-handler'
      )
        ? 'email'
        : 'phone';

      handleClickLogic(mainButton, type, e, {
        action: buttonName,
        button_name: buttonName,
      });
    });

    floating.appendChild(btnNode);
  });

  const modal = node.parentNode.closest(
    [
      // Generic/dialog
      '.modal',
      '[role="dialog"]',
      '[role="alertdialog"]',
      '[data-testid="dialog"]',
      'modal-dialog modal-sm',

      // Bootstrap
      '.modal-dialog',
      '.modal.show',

      // React Modal (react-modal library)
      '.ReactModalPortal',
      '.ReactModal__Overlay',
      '.ReactModal__Content',

      // Material UI
      '.MuiModal-root',
      '.MuiDialog-root',
      '.MuiPopover-root',

      // Ant Design
      '.ant-modal',
      '.ant-modal-root',
      '.ant-modal-mask',
      '.ant-modal-wrap',
      '.ant-drawer',
      '.ant-drawer-content-wrapper',

      // Chakra UI
      '[data-chakra-component="Modal"]',
      '.chakra-modal__content-container',
      '.chakra-modal__content',

      // Headless UI
      '.headlessui-dialog',
      '.headlessui-dialog-overlay',
      '[data-headlessui-state]',

      // Radix UI (and shadcn/ui)
      '[data-radix-dialog-content]',
      '[data-radix-dialog-overlay]',
      '[data-radix-popover-content]',
      '[data-radix-popover-root]',

      // Mantine
      '.mantine-Modal-root',
      '.mantine-Modal-modal',
      '.mantine-Drawer-root',
      '.mantine-Drawer-drawer',

      // Flowbite
      '[data-modal-target]',
      '[data-modal]',

      // PrimeReact
      '.p-dialog',
      '.p-dialog-mask',
      '.p-overlaypanel',

      // SweetAlert2
      '.swal2-container',
      '.swal2-popup',

      // Tippy.js
      '.tippy-box',
    ].join(', ')
  );
  const container = modal || document.body;
  container.appendChild(floating);

  ['mousedown', 'mouseup', 'click'].forEach((eventType) => {
    wrapper.addEventListener(eventType, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  wrapper.addEventListener('click', (e) => {
    const isOpen = wrapper.classList.toggle('active');

    if (isOpen) {
      floating.classList.add('active');
    } else {
      floating.classList.remove('active');
    }
  });

  const cleanupAutoUpdate = FloatingUIDOM.autoUpdate(
    wrapper,
    floating,
    async () => {
      const { x, y } = await FloatingUIDOM.computePosition(
        wrapper,
        floating,
        { placement, strategy: 'fixed' }
      );
      floating.style.left = x + 'px';
      floating.style.top = y + 'px';
    }
  );

  // This fixes the issue in google docs where
  // the button is not removed when the user clicks outside of it
  // and it's content is being added to the column as text
  if (window.location.hostname.includes('docs.google.com')) {
    const removeButton = () => {
      if (element.parentNode) {
        element.remove();
      }
      if (floating.parentNode) {
        floating.remove();
      }
      cleanupAutoUpdate();
      node.matadorScanned = 0;
    };

    const onMouseDown = (e) => {
      if (!element.isConnected) {
        document.removeEventListener('mousedown', onMouseDown, true);
        return;
      }

      if (
        !element.contains(e.target) &&
        e.target !== node &&
        !floating.contains(e.target)
      ) {
        removeButton();
        document.removeEventListener('mousedown', onMouseDown, true);
      }
    };

    document.addEventListener('mousedown', onMouseDown, true);

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Tab') {
        removeButton();
        document.removeEventListener('mousedown', onMouseDown, true);
      }
    });
  }
}

function addMatadorIconListeners() {
  const phoneNumberElements = document.querySelectorAll(
    '.matador-click-handler'
  );
  const emailElements = document.querySelectorAll(
    '.matador-email-click-handler'
  );

  if (__DEBUG) {
    console.log(phoneNumberElements);
    console.log(emailElements);
  }

  phoneNumberElements.forEach((el) => {
    el.addEventListener('click', numberElementClickHandler);
  });

  emailElements.forEach((el) => {
    el.addEventListener('click', emailElementClickHandler);
  });
}

function getAdditionalData(phoneNumber, e) {
  let url = new URL(window.location.href);
  let result = [];
  let name = null;
  let email = null;
  let source = 'OTHER';
  let website = url.host;
  //This key is used to keep one alive websocket connection.
  let plugin = 'matadorExtension';

  if (url.host.indexOf('dealersocket.com') !== -1) {
    let nameSelector = document.querySelector(
      "span[name='editName']"
    );
    let emailSelector = document.querySelector(
      "[name='editEmail'] .ds-inline-edit-value"
    );
    if (nameSelector) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }
    if (emailSelector) {
      email = cleanEmailString(
        getInnerTextWithoutMatador(emailSelector)
      );
      if (email && email.indexOf(';') != -1) {
        email = email.split(';')[0];
      }
    }
    source = 'DEALERSOCKET';
  }

  if (url.host.indexOf('drivecentric.com') !== -1) {
    let nameSelector = document.querySelector(
      "span[class='cust-name']"
    );
    let emailSelector = document.querySelector(
      "div[analyticsdetect='DealCard|Navigate|Email']"
    );
    if (nameSelector) {
      name = nameSelector.innerText.trim();
    }
    if (emailSelector) {
      email = cleanEmailString(
        getInnerTextWithoutMatador(emailSelector)
      );
    }
    source = 'DRIVECENTRIC';
  }

  if (url.host.indexOf('eleadcrm.com') !== -1) {
    if (url.pathname.indexOf('OpptyDetails.aspx') !== -1) {
      let emailSelectorElement = document.querySelector(
        '#tableDataCustomerInformation table > tbody > tr:nth-child(8) > td:nth-child(2)'
      );

      let emailSelector = getInnerTextWithoutMatador(
        emailSelectorElement
      );

      // Aggressively clean the string: keep only valid email characters
      emailSelector = cleanEmailString(emailSelector);

      name = document
        .querySelector(
          '#tableDataCustomerInformation table > tbody > tr > td:nth-child(3)'
        )
        .innerText.trim();

      if (emailSelector && emailSelector.match(emailRegex)) {
        email = emailSelector;
      }
    }

    source = 'ELEADS';
  }

  if (
    (url.host === 'apps.vinmanager.com' ||
      url.host === 'vinsolutions.app.coxautoinc.com') &&
    url.pathname.indexOf('CustomerDashboard.aspx') !== -1
  ) {
    name = document.querySelector(
      'table#cd-customer-profile-table .CustomerInfo_CustomerName'
    ).innerText;
    email = cleanEmailString(
      getInnerTextWithoutMatador(
        document.querySelector(
          'table#cd-customer-profile-table #customer-email-span'
        )
      )
    );
    source = 'VINSOLUTION';
  }

  if (url.host.indexOf('activix.ca') > -1) {
    if (url.pathname.indexOf('/leads/') > -1) {
      const spans = document.querySelectorAll('span');

      const emailList = [];

      if (spans && spans.length) {
        spans.forEach((span) => {
          const labelText = span.textContent.trim();

          if (
            labelText === 'First name' ||
            labelText === 'Last name' ||
            labelText === 'Prénom' ||
            labelText === 'Nom'
          ) {
            const inputElement = span
              .closest('div')
              .nextElementSibling.querySelector('input');

            if (inputElement) {
              if (
                labelText === 'First name' ||
                labelText === 'Prénom'
              ) {
                name = inputElement.value;
              } else {
                name += ' ' + inputElement.value;
              }
            }
          }

          if (
            labelText === 'Home email' ||
            labelText === 'Work email' ||
            labelText === 'Courriel maison' ||
            labelText === 'Courriel travail'
          ) {
            const value = span
              .closest('div')
              .nextElementSibling.querySelector('input')?.value;

            if (value && value.match(emailRegex)) {
              emailList.push({
                email: value,
                priority:
                  labelText === 'Home email' ||
                  labelText === 'Courriel maison'
                    ? 1
                    : 2,
              });
            }
          }
        });

        if (emailList.length) {
          emailList.sort((a, b) => a.priority - b.priority);
          email = emailList[0].email;
        }
      }
    }
    source = 'ACTIVIX';
  }

  if (
    url.host.indexOf('d2cmedia.ca') !== -1 &&
    url.pathname.indexOf('crm') !== -1
  ) {
    let nameSelector = document.querySelector(
      '.tab-pane.active .panel-heading .d2c_dealEditCName'
    );
    if (nameSelector && nameSelector.innerText) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }

    const mailIconSelector = document.querySelector(
      '.tab-pane.active .panel-body .icon-envelope'
    );

    if (mailIconSelector) {
      const emailSelector =
        mailIconSelector?.nextElementSibling || '';
      let value = getInnerTextWithoutMatador(emailSelector);
      value = cleanEmailString(value);
      if (value && value.match(emailRegex)) {
        email = value;
      }
    }

    source = 'D2C';
  }

  if (url.host.indexOf('car-research.com') !== -1) {
    let nameSelector = document.querySelector('.customer-name');

    if (nameSelector && nameSelector.innerText) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }

    const emailLabel = Array.from(
      document.querySelectorAll('div')
    ).find((div) => div.textContent.trim() === 'Email:');

    if (emailLabel) {
      const emailValueDiv =
        emailLabel.nextElementSibling?.nextElementSibling;

      let emailVal = emailValueDiv
        ? cleanEmailString(getInnerTextWithoutMatador(emailValueDiv))
        : '';

      if (emailVal && emailVal.match(emailRegex)) {
        email = emailVal;
      }
    }
    source = 'AFFINITIV';
  }

  if (url.host.indexOf('dealerstudio.com') !== -1) {
    if (url.pathname.endsWith('contacts')) {
      let rowSelector =
        e.target?.parentElement?.parentElement?.parentElement;

      if (rowSelector && rowSelector.querySelector) {
        const nameSelector = rowSelector.querySelector('td a');
        const emailSelector =
          rowSelector.querySelector('td:nth-child(2)');
        if (nameSelector && nameSelector.innerText) {
          name = nameSelector.innerText.trim();
          name = name.replace(
            /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
            ''
          );
        }

        let emailVal = emailSelector
          ? cleanEmailString(
              getInnerTextWithoutMatador(emailSelector)
            )
          : '';

        if (emailVal && emailVal.match(emailRegex)) {
          email = emailVal;
        }
      }
    } else {
      const firstNameSelector = document.querySelector(
        '#editable-item-first_name > div > div > div:nth-child(2)'
      );
      const lastNameSelector = document.querySelector(
        '#editable-item-last_name > div > div > div:nth-child(2)'
      );
      const emailSelector = document.querySelector(
        '#editable-item-email > div > div > div:nth-child(2)'
      );
      name = `${firstNameSelector?.innerText || ''} ${
        lastNameSelector?.innerText || ''
      }`?.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );

      let emailVal = emailSelector
        ? cleanEmailString(getInnerTextWithoutMatador(emailSelector))
        : '';

      if (emailVal && emailVal.match(emailRegex)) {
        email = emailVal;
      }
    }
    source = 'DEALERSTUDIO';
  }

  if (
    url.host === 'vanillasoft.net' &&
    url.pathname.indexOf('web') !== -1
  ) {
    var firstName = document.querySelector(
      "input[id*='FirstName' i]"
    ).value;
    var lastName = document.querySelector(
      "input[id*='LastName' i]"
    ).value;
    name = firstName + ' ' + lastName;
    email = document.querySelector("input[id*='Email' i]").value;
    source = 'VANILLASOFT';
  }

  if (url.host.indexOf('app.tekioncloud.com') !== -1) {
    if (url.pathname.endsWith('contacts')) {
      const row = e.target.closest('.rt-tr-group');
      const cells = row.querySelectorAll('.rt-td');
      const nameCell = cells[1];

      const spans = nameCell.querySelectorAll('span');

      if (spans.length) {
        name = spans[spans.length - 1].textContent.trim();
      }

      const emailText = cells[6]
        ? getInnerTextWithoutMatador(cells[6])
        : '';

      let cleanedEmailText = cleanEmailString(emailText);
      if (cleanedEmailText && cleanedEmailText.match(emailRegex)) {
        email = cleanedEmailText;
      }
    } else {
      let infoBlockContainer = document.querySelector(
        'div[class*="crm_customerInfo_defaultActivityContainer"]'
      );
      let nameSelector;

      // Check if is in Contact tab
      if (infoBlockContainer) {
        nameSelector = document.querySelector(
          'span[class*="crm_contactInfo_contactName"]'
        );
      }

      if (!infoBlockContainer) {
        // Find the block that user pressed (here can be multiple blocks)
        infoBlockContainer = e?.target?.closest(
          '[class*="crm_contactInfo_container"]'
        );
        if (infoBlockContainer) {
          nameSelector = infoBlockContainer
            .querySelector('div[class*="root_heading_h4"]')
            ?.querySelector('span');
        }
      }

      if (nameSelector && nameSelector.innerText) {
        name = nameSelector.innerText.trim();
        name = name.replace(
          /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
          ''
        );
        name = name.replaceAll('...', '').trim();
      }

      if (infoBlockContainer) {
        const emailIcon =
          infoBlockContainer.querySelector('.icon-mail');

        if (emailIcon) {
          const container = emailIcon.nextElementSibling;
          const emailDiv = container.querySelector(
            'div[class*="maskClassName"]'
          );

          let emailVal = emailDiv
            ? cleanEmailString(getInnerTextWithoutMatador(emailDiv))
            : '';

          if (emailVal && emailVal.match(emailRegex)) {
            email = emailVal;
          }
        }
      }
    }
    source = 'TEKION';
  }

  // Implementation for our demo fake CRMs
  if (url.host === 'demo.matador.ai') {
    name = document.querySelector('.matador_name')?.innerText || '';
    const emailSelector = document.querySelector('.matador_email');

    if (emailSelector) {
      email = cleanEmailString(
        getInnerTextWithoutMatador(emailSelector)
      );
    }
  }

  if (name != null) {
    let nameComponents = name.split(' ');
    let firstName = nameComponents[0];
    let lastName = '';
    let phoneComponent;
    let phoneSelector = document.querySelector(
      "span[name='tertiaryPhone']"
    );

    if (phoneSelector) {
      phoneComponent = phoneSelector.innerText
        .trim()
        .replace(/\D/g, '');
    }

    if (nameComponents.length > 1) {
      nameComponents.shift();
      lastName = nameComponents.join(' ');
    }

    if (phoneNumber) {
      result.push('first_name=' + encodeURIComponent(firstName));
      result.push('last_name=' + encodeURIComponent(lastName));
    }
  }

  if (email != null) {
    var decodedEmail = decodeHTMLEntities(email);
    if (validateEmail(decodedEmail)) {
      result.push('email=' + encodeURIComponent(decodedEmail));
    }
  }

  result.push('plugin=' + encodeURIComponent(plugin));

  if (source != null) {
    result.push('source=' + encodeURIComponent(source));
  }

  if (website != null) {
    result.push('website=' + encodeURIComponent(website));
  }

  if (result.length > 0) {
    return result.join('&');
  }

  return null;
}

function getAdditionalDataEmail(email, e) {
  let url = new URL(window.location.href);
  let result = [];
  let name = null;
  let source = 'OTHER';
  let website = url.host;
  let plugin = 'matadorExtension';
  let phoneNumber = null;

  if (
    url.host.indexOf('eleadcrm.com') !== -1 &&
    url.pathname.indexOf('OpptyDetails.aspx') !== -1
  ) {
    name = document
      .querySelector(
        '#tableDataCustomerInformation table > tbody > tr > td:nth-child(3)'
      )
      .innerText.trim();

    const phonesArr = document.querySelectorAll(
      '#tableDataCustomerInformation table > tbody > tr > td > a'
    );

    for (const element of phonesArr) {
      if (element.innerText.match(phoneNumberRegex)) {
        phoneNumber = element.innerText.trim();
        break;
      }
    }
    source = 'ELEADS';
  }

  if (url.host.indexOf('activix.ca') > -1) {
    if (url.pathname.indexOf('/leads/') > -1) {
      const spans = document.querySelectorAll('span');

      const phoneNumbersList = [];

      const phoneNumbersPriorities = {
        'Mobile phone': 1,
        'Home phone': 2,
        'Work phone': 3,
        Cellulaire: 1,
        'Téléphone maison': 2,
        'Téléphone travail': 3,
      };

      if (spans && spans.length) {
        spans.forEach((span) => {
          const labelText = span.textContent.trim();

          if (
            labelText === 'First name' ||
            labelText === 'Last name' ||
            labelText === 'Prénom' ||
            labelText === 'Nom'
          ) {
            const inputElement = span
              .closest('div')
              .nextElementSibling.querySelector('input');

            if (inputElement) {
              if (
                labelText === 'First name' ||
                labelText === 'Prénom'
              ) {
                name = inputElement.value;
              } else {
                name += ' ' + inputElement.value;
              }
            }
          }

          if (phoneNumbersPriorities[labelText]) {
            const value = span
              .closest('div')
              .nextElementSibling.querySelector('input')?.value;

            if (value && value.match(phoneNumberRegex)) {
              phoneNumbersList.push({
                phone: value,
                priority: phoneNumbersPriorities[labelText],
              });
            }
          }
        });

        if (phoneNumbersList.length) {
          phoneNumbersList.sort((a, b) => a.priority - b.priority);
          phoneNumber = phoneNumbersList[0].phone;
        }
      }
    }
    source = 'ACTIVIX';
  }

  if (url.host.indexOf('dealersocket.com') !== -1) {
    let nameSelector = document.querySelector(
      "span[name='editName']"
    );

    const phoneSelectorsArr = [
      'primaryPhone',
      'secondaryPhone',
      'tertiaryPhone',
    ];

    for (const className of phoneSelectorsArr) {
      let phoneSelector = document.querySelector(
        `span[name='${className}']`
      );
      if (phoneSelector) {
        const value = phoneSelector.innerText.trim();
        if (value && value.match(phoneNumberRegex)) {
          phoneNumber = value;
          break;
        }
      }
    }

    if (nameSelector) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }
    source = 'DEALERSOCKET';
  }

  if (
    (url.host === 'apps.vinmanager.com' ||
      url.host === 'vinsolutions.app.coxautoinc.com') &&
    url.pathname.indexOf('CustomerDashboard.aspx') !== -1
  ) {
    let nameSelector = document.querySelector(
      '.CustomerInfo_CustomerName'
    );

    if (nameSelector) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }

    const customerDetailSpan = document.querySelector(
      '.CustomerInfo_CustomerDetail'
    );

    if (customerDetailSpan) {
      const spanText = customerDetailSpan.textContent;

      const getValueByLabel = (text, label) => {
        const regex = new RegExp(
          `${label}: \\((\\d{3})\\) \\d{3}-\\d{4}`,
          'i'
        );
        const match = text.match(regex);
        return match
          ? match[0].replace(`${label}: `, '').trim()
          : null;
      };

      const priorityOrder = ['C', 'H', 'W'];
      let selectedValue = null;

      for (const label of priorityOrder) {
        selectedValue = getValueByLabel(spanText, label);
        if (selectedValue) break;
      }

      phoneNumber = selectedValue;
    }
    source = 'VINSOLUTION';
  }

  if (
    url.host.indexOf('d2cmedia.ca') !== -1 &&
    url.pathname.indexOf('crm') !== -1
  ) {
    let nameSelector = document.querySelector(
      '.tab-pane.active .panel-heading .d2c_dealEditCName'
    );
    if (nameSelector && nameSelector.innerText) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }

    const phoneSelector = document.querySelector(
      '.tab-pane.active .panel-body .d2c_cellnumber'
    );

    if (phoneSelector) {
      const value = phoneSelector.innerText.trim();
      if (value && value.match(phoneNumberRegex)) {
        phoneNumber = value;
      }
    }
    source = 'D2C';
  }

  if (url.host.indexOf('car-research.com') !== -1) {
    let nameSelector = document.querySelector('.customer-name');

    if (nameSelector && nameSelector.innerText) {
      name = nameSelector.innerText.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );
    }

    const mobileLabel = Array.from(
      document.querySelectorAll('div')
    ).find(
      (div) =>
        div.textContent.trim() === 'Mobile #:' ||
        div.textContent.trim() === 'Home #:'
    );

    if (mobileLabel) {
      const mobileValueDiv =
        mobileLabel.nextElementSibling?.nextElementSibling;

      if (
        mobileValueDiv?.innerText &&
        mobileValueDiv.innerText.match(phoneNumberRegex)
      ) {
        phoneNumber = mobileValueDiv.innerText.trim();
      }
    }
    source = 'AFFINITIV';
  }

  if (url.host.indexOf('dealerstudio.com') !== -1) {
    if (url.pathname.endsWith('contacts')) {
      let rowSelector =
        e.target?.parentElement?.parentElement?.parentElement
          ?.parentElement;

      if (rowSelector && rowSelector.querySelector) {
        const nameSelector = rowSelector.querySelector('td a');
        const phoneNumberSelector =
          rowSelector.querySelector('td:nth-child(3)');
        if (nameSelector && nameSelector.innerText) {
          name = nameSelector.innerText.trim();
          name = name.replace(
            /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
            ''
          );
        }
        if (
          phoneNumberSelector &&
          phoneNumberSelector?.innerText &&
          phoneNumberSelector.innerText.match(phoneNumberRegex)
        ) {
          phoneNumber = phoneNumberSelector.innerText.trim();
        }
      }
    } else {
      const firstNameSelector = document.querySelector(
        '#editable-item-first_name > div > div > div:nth-child(2)'
      );
      const lastNameSelector = document.querySelector(
        '#editable-item-last_name > div > div > div:nth-child(2)'
      );
      const phoneNumberSelector = document.querySelector(
        '#editable-item-phone_number > div > div > div:nth-child(2)'
      );

      name = `${firstNameSelector?.innerText || ''} ${
        lastNameSelector?.innerText || ''
      }`?.trim();
      name = name.replace(
        /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
        ''
      );

      if (
        phoneNumberSelector &&
        phoneNumberSelector?.innerText &&
        phoneNumberSelector.innerText.match(phoneNumberRegex)
      ) {
        phoneNumber = phoneNumberSelector.innerText.trim();
      }
    }
    source = 'DEALERSTUDIO';
  }

  if (url.host.indexOf('promaxonline.com') !== -1) {
    const isModalOpen = document.querySelector('.MuiDrawer-modal');

    if (!isModalOpen && url.pathname.indexOf('customer') !== -1) {
      let rowSelector =
        e.target?.parentElement?.parentElement?.parentElement
          ?.parentElement;

      if (rowSelector && rowSelector.querySelector) {
        const nameSelector = rowSelector.querySelector('td p');
        if (nameSelector && nameSelector.innerText) {
          name = nameSelector.innerText.trim();
          name = name.replace(
            /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
            ''
          );
        }
      }
    }

    if (isModalOpen) {
      let customerName = '';

      if (!name) {
        customerName = document.querySelector('a h5');
        if (customerName && customerName.innerText) {
          name = customerName.innerText.trim();
          name = name.replace(
            /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
            ''
          );
        }
      }
      const priorities = ['Cell:', 'Home:', 'Work:'];
      const paragraphs = Array.from(
        document.querySelectorAll('p')
      ).filter((el) =>
        priorities.some((label) =>
          el.textContent.trim().startsWith(label)
        )
      );

      const relevantElements = paragraphs;

      for (let label of priorities) {
        const element = relevantElements.find((el) =>
          el.textContent.trim().startsWith(label)
        );

        if (
          element &&
          element?.parentElement?.nextElementSibling &&
          element?.parentElement?.nextElementSibling?.innerText
        ) {
          phoneNumber =
            element?.parentElement?.nextElementSibling?.innerText.trim();
          break;
        }
      }
    }
    source = 'PROMAX';
  }

  if (url.host.indexOf('app.tekioncloud.com') !== -1) {
    if (url.pathname.endsWith('contacts')) {
      const row = e.target.closest('.rt-tr-group');
      const cells = row.querySelectorAll('.rt-td');

      const nameCell = cells[1];

      const nameSpans = nameCell.querySelectorAll('span');

      if (nameSpans.length) {
        name = nameSpans[nameSpans.length - 1].textContent.trim();
      }

      let phoneText = cells[5]?.textContent?.trim?.();

      if (!phoneText || !phoneText.match(phoneNumberRegex)) {
        phoneText = cells[8]?.textContent?.trim?.();
      }

      if (phoneText && phoneText.match(phoneNumberRegex)) {
        phoneNumber = phoneText;
      }
    } else {
      let infoBlockContainer = document.querySelector(
        'div[class*="crm_customerInfo_defaultActivityContainer"]'
      );
      let nameSelector;

      // Check if is in Contact tab
      if (infoBlockContainer) {
        nameSelector = document.querySelector(
          'span[class*="crm_contactInfo_contactName"]'
        );
      }

      if (!infoBlockContainer) {
        // Find the block that user pressed (here can be multiple blocks)
        infoBlockContainer = e?.target?.closest(
          '[class*="crm_contactInfo_container"]'
        );
        if (infoBlockContainer) {
          nameSelector = infoBlockContainer
            .querySelector('div[class*="root_heading_h4"]')
            ?.querySelector('span');
        }
      }

      if (nameSelector && nameSelector.innerText) {
        name = nameSelector.innerText.trim();
        name = name.replace(
          /^\s*(?:M(?:iss|rs?|s)|Dr|Rev|Er|Sir|Master)\b[\s.]*/gims,
          ''
        );
        name = name.replaceAll('...', '').trim();
      }

      if (infoBlockContainer) {
        const priorities = ['(W)', '(H)', '(M)'];

        for (const label of priorities) {
          const labelDiv = Array.from(
            infoBlockContainer.querySelectorAll('div')
          ).find((div) => div.textContent.trim() === label);

          if (labelDiv && labelDiv.parentElement) {
            const parentDiv = labelDiv.parentElement;
            const firstNode = parentDiv.childNodes[0];
            if (firstNode && firstNode.nodeValue) {
              phoneNumber = firstNode.nodeValue.trim();
              break;
            }
          }
        }
      }
    }
    source = 'TEKION';
  }

  // Implementation for our demo fake CRMs
  if (url.host === 'demo.matador.ai') {
    name = document.querySelector('.matador_name')?.innerText || '';
    phoneNumber =
      document.querySelector('.matador_number')?.innerText || '';
  }

  if (name != null) {
    let nameComponents = name.split(' ');
    let firstName = nameComponents[0] || '';
    let lastName = nameComponents[1] || '';

    if (nameComponents.length > 1) {
      nameComponents.shift();
      lastName = nameComponents.join(' ');
    }

    if (email) {
      result.push('first_name=' + encodeURIComponent(firstName));
      result.push('last_name=' + encodeURIComponent(lastName));
    }
  }

  if (phoneNumber != null) {
    result.push(
      'phone_number=' +
        encodeURIComponent(phoneNumber.replace(/\D/g, ''))
    );
  }

  result.push('plugin=' + encodeURIComponent(plugin));
  result.push('type=' + encodeURIComponent('email'));

  if (source != null) {
    result.push('source=' + encodeURIComponent(source));
  }

  if (website != null) {
    result.push('website=' + encodeURIComponent(website));
  }

  if (result.length > 0) {
    return result.join('&');
  }

  return null;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function decodeHTMLEntities(str) {
  var element = document.createElement('div');
  if (str && typeof str === 'string') {
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';
  }

  return str;
}

function handleClickLogic(element, type, e, extraParams = {}) {
  e.preventDefault();
  e.stopPropagation();

  let identifier = null;
  let additionalData = null;
  let url = '';

  if (type === 'phone') {
    // Not more valid, double check before removing
    if (element.tagName == 'IMG') {
      identifier = element.parentElement.dataset.matadorPhoneNumber;
    } else {
      identifier = element.getAttribute('data-matador-phone-number');
    }

    // Digits only
    identifier = identifier.replace(/\D/g, '');
    additionalData = getAdditionalData(identifier, e);
    url = matadorConversationLinkPhone + identifier;
  } else if (type === 'email') {
    identifier = element.getAttribute('data-matador-email');
    additionalData = getAdditionalDataEmail(identifier, e);
    url =
      matadorConversationLinkEmail + encodeURIComponent(identifier);
  }

  if (__DEBUG) {
    console.log(identifier);
  }

  if (additionalData != null) {
    url += '&' + additionalData;
  }

  // Add extra params
  Object.keys(extraParams).forEach((key) => {
    url += `&${key}=${encodeURIComponent(extraParams[key])}`;
  });

  lastUrl = url;

  chrome.runtime.sendMessage({
    action: 'TOGGLE_CONVERSATION',
    url: lastUrl,
    maintain: true,
  });
  setTimeout(() => {
    if (!matadorBlueButton) return;
    if (matadorExtensionOptions.panelPosition === 'right') {
      matadorBlueButton.style.right = '-2px';
    } else {
      matadorBlueButton.style.left = '-2px';
    }
    matadorBlueButton.style.display = 'flex';
  }, 500);

  return false;
}

function numberElementClickHandler(e) {
  return handleClickLogic(e.currentTarget, 'phone', e);
}

function emailElementClickHandler(e) {
  return handleClickLogic(e.currentTarget, 'email', e);
}

//Get all the dom delements and filter out based on property
function divAndParagraphNodesUnder() {
  let walk = document.querySelectorAll(
    'div,p,h1,span,a,th,td,canvas'
  );

  return Array.from(walk).filter(
    (d) => d.matadorScanned != 1 && !excludedElementIDs.includes(d.id)
  );
}

function inputNodesUnder() {
  let allInputsOfActivixCRM = [];
  let walk = document.querySelectorAll(
    "input[name*='phone' i],input[id*='phone' i], input[class='phone' i], input[name*='email' i],input[id*='email' i], input[class='email' i]"
  );

  if (window.location.href.includes('crm.activix.ca/leads')) {
    allInputsOfActivixCRM = document.querySelectorAll(
      "input[class*='form-input' i]"
    );
    allInputsOfActivixCRM = Array.from(allInputsOfActivixCRM).filter(
      (inputItem) => {
        return (
          inputItem.value.match(phoneNumberRegex) ||
          inputItem.value.match(emailRegex)
        );
      }
    );
    if (allInputsOfActivixCRM.length) {
      allInputsOfActivixCRM = allInputsOfActivixCRM.map((item) => {
        if (item) {
          item.parentElement.style =
            'display:flex;align-items:center';
        }
        return item;
      });
    }
  }

  return Array.from([...walk, ...allInputsOfActivixCRM]).filter(
    (d) =>
      d.matadorScanned != 1 &&
      !excludedElementIDs.includes(d.id) &&
      d.type !== 'hidden'
  );
}

function hookPhoneNumberonInputField(rootElement = null) {
  let domElements = inputNodesUnder();

  console.log('Input nodes', domElements);

  let uniqueDOMElements = [];

  for (let element of domElements) {
    element.matadorScanned = 1;

    let matchPhoneNumber = element.value.match(phoneNumberRegex);
    let matchEmail = element.value.match(emailRegex);

    if (matchPhoneNumber || matchEmail) {
      uniqueDOMElements.push(element);
    }
  }

  console.log('Unique input elements', uniqueDOMElements);

  if (__DEBUG) {
    console.log(uniqueDOMElements);
  }

  for (let inputNode of uniqueDOMElements) {
    let text = '';
    let normalizedPhoneNumber = '';
    let htmlMatadorIcon = '';

    const phoneNumberText = inputNode.value.match(phoneNumberRegex);
    const emailText = inputNode.value.match(emailRegex);

    if (phoneNumberText && phoneNumberText[0]) {
      normalizedPhoneNumber = normalizePhoneNumber(
        phoneNumberText[0]
      );
      text = phoneNumberText[0];
      htmlMatadorIcon = getMatadorIconHTML({
        text,
        normalizedPhoneNumber,
        type: 'phone',
      });
    }
    if (emailText) {
      text = emailText['input']?.trim();
      htmlMatadorIcon = getMatadorIconHTML({
        text,
        type: 'email',
      });
    }

    if (htmlMatadorIcon) {
      createFloatingMatadorIcon({
        node: inputNode,
        html: htmlMatadorIcon,
      });

      inputNode.matadorScanned = 1;
    }
  }

  addMatadorIconListeners();
}

function hookPhoneNumbers(rootElement = null) {
  const urlHostname = window.location.hostname;

  let domElements = divAndParagraphNodesUnder();

  // This part is for our demo site, where we have different class names for phone and email.
  if (urlHostname.includes('demo.matador.ai')) {
    // As demo's CRM is our own fake page we added those classnames on phones and emails.
    domElements = document.querySelectorAll(
      '.matador_number, .matador_email'
    );
    // Remove ALL matador elements because we can change users from top of demo which doesn't change both route and dom elements
    // but the numbers inside can change so every time we remove the old ones and
    // add new ones to make sure they have the right phone number or email.

    // Remove elements within phone/email containers
    domElements.forEach((el) => {
      // Remove icon and button wrappers
      el.querySelectorAll(
        '.matador_icon_and_buttons_wrapper'
      ).forEach((wrapper) => wrapper.remove());
      // Remove legacy icons
      el.querySelectorAll('.matador_legacy_icon').forEach((icon) =>
        icon.remove()
      );
      // Remove any element with data-matador-link (fallback for edge cases)
      el.querySelectorAll('[data-matador-link]').forEach((link) =>
        link.remove()
      );
      // Reset matadorScanned flag to allow re-scanning
      el.matadorScanned = 0;
    });

    // Remove floating action menus (they are appended to body or modal containers)
    document
      .querySelectorAll('.floating_actions_menu')
      .forEach((menu) => menu.remove());

    // Remove the unread message button
    const unreadButton = document.getElementById(
      'unread-message-block'
    );
    if (unreadButton) unreadButton.remove();
  }
  let uniqueParentElements = [];

  for (let element of domElements) {
    element.matadorScanned = 1;
    for (let childNode of element.childNodes) {
      if (childNode.nodeType === Node.TEXT_NODE) {
        const textContent = childNode.textContent;
        const phoneMatch = textContent.match(phoneNumberRegex);

        // Only accept phone number if it's not embedded in other alphanumeric characters
        let matchPhoneNumber = isValidPhoneNumberMatch(
          textContent,
          phoneMatch
        )
          ? phoneMatch
          : null;
        let matchEmail = textContent?.trim().match(emailRegex);

        if (matchPhoneNumber || matchEmail) {
          uniqueParentElements.push(childNode);
        }
      }
    }
  }

  if (__DEBUG) {
    console.log(uniqueParentElements);
  }

  for (let textnode of uniqueParentElements) {
    let text = '';
    let normalizedPhoneNumber = '';
    let htmlMatadorIcon = '';

    const textContent = textnode.textContent;
    const phoneMatch = textContent.match(phoneNumberRegex);

    // Only accept phone number if it's not embedded in other alphanumeric characters
    const phoneNumberText = isValidPhoneNumberMatch(
      textContent,
      phoneMatch
    )
      ? phoneMatch
      : null;
    const emailText = textContent?.trim().match(emailRegex);

    if (phoneNumberText && phoneNumberText[0]) {
      normalizedPhoneNumber = normalizePhoneNumber(
        phoneNumberText[0]
      );
      text = phoneNumberText[0];
      htmlMatadorIcon = getMatadorIconHTML({
        text,
        normalizedPhoneNumber,
        type: 'phone',
      });
    }
    if (emailText) {
      text = emailText['input']?.trim();
      htmlMatadorIcon = getMatadorIconHTML({
        text,
        type: 'email',
      });
    }

    if (htmlMatadorIcon) {
      createFloatingMatadorIcon({
        node: textnode,
        html: htmlMatadorIcon,
      });

      let nodelists = textnode.parentNode.querySelectorAll('*');

      Array.from(nodelists).map((dom) => (dom.matadorScanned = 1));
    }
  }

  addMatadorIconListeners();
}

// This is require to listen to save event, whenever their is a change in extension settings.
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action == 'save') {
    setTimeout(() => window.location.reload(), 100);
  }
});

async function startExtension() {
  if (isAlreadyLoaded) {
    return;
  }
  isAlreadyLoaded = true;

  setInterval(async () => {
    // syncWebSockets();
    const t0 = performance.now();
    hookPhoneNumbers();
    hookPhoneNumberonInputField();
    const t1 = performance.now();
    if (__DEBUG) {
      console.log(
        `Call to hookPhoneNumbers took ${t1 - t0} milliseconds.`
      );
    }
    // console.log("refreshing tokens");
  }, 3000);

  hookPhoneNumbers();
  hookPhoneNumberonInputField();
}

// Function to get data from local Storage from extension
const getObjectFromLocalStorage = async function (key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

function normalizePhoneNumber(phoneNumber) {
  let normalizedPhoneNumber = phoneNumber.replace(/[-+().\s]/g, '');
  return normalizedPhoneNumber.substr(-10);
}

async function syncWebSockets() {
  if (window !== window.parent) return;

  matadorSessionKey = await getObjectFromLocalStorage(
    'matadorSessionKey'
  );
  unreadMessages = await getObjectFromLocalStorage('unreadMessages');
  const matadorBlinking = document.getElementById('matador_blinking');

  if (unreadMessages) {
    matadorUnreadButtonMain.classList.add('blinking');
    matadorBlinking.innerHTML = unreadMessages;
  } else {
    matadorUnreadButtonMain.classList.remove('blinking');
    matadorBlinking.innerHTML = '';
  }
}

function injectMainButton(matadorExtensionOptions) {
  // replaceInjectedMatadorIframeDocument(
  //   matadorExtensionOptions,
  //   window.document
  // );
}

async function injectUnreadConversationListButton(
  matadorExtensionOptions
) {
  if (!matadorExtensionOptions.unreadButtonChecked) return;
  if (window !== window.parent) return;

  setInterval(async () => {
    syncWebSockets();
  }, 3000);

  matadorUnreadButton = document.createElement('div');
  matadorUnreadButton.id = 'unread-message-block';
  matadorUnreadButton.classList.add(
    'matador__unread-message-drag-item-wrappeer'
  );
  matadorUnreadButton.style.top = `${
    window.localStorage.getItem('top') || 16 + '%'
  }`;

  matadorUnreadButtonDraggableIcon = document.createElement('div');
  matadorUnreadButtonDraggableIcon.classList.add(
    'hover-draggable-icon'
  );
  matadorUnreadButtonDraggableIcon.innerHTML = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6ZM7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5C7.44772 5 7 5.44771 7 6ZM3 6C3 6.55228 3.44771 7 4 7C4.55229 7 5 6.55228 5 6C5 5.44771 4.55229 5 4 5C3.44771 5 3 5.44771 3 6ZM8 11C7.44772 11 7 10.5523 7 10C7 9.44771 7.44772 9 8 9C8.55228 9 9 9.44772 9 10C9 10.5523 8.55228 11 8 11ZM12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11ZM3 10C3 10.5523 3.44771 11 4 11C4.55228 11 5 10.5523 5 10C5 9.44771 4.55229 9 4 9C3.44771 9 3 9.44771 3 10Z" fill="#fff"></path>
  </svg>
  `;

  matadorUnreadButtonMain = document.createElement('div');
  matadorUnreadButtonMain.classList.add('matador__drag-item');
  matadorUnreadButtonMain.innerHTML = `
    <div id="matador_blinking" class="matador_blinking"></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5.45218 5.03585C6.64117 2.98514 7.23566 1.95978 8.02026 1.63135C8.64706 1.36898 9.35354 1.36898 9.98033 1.63135C10.7649 1.95978 11.3594 2.98514 12.5484 5.03585L15.4297 10.0055C16.6187 12.0562 17.2132 13.0815 17.1065 13.9224C17.0213 14.5941 16.6681 15.2034 16.1265 15.6127C15.4486 16.1251 14.2596 16.1251 11.8816 16.1251H6.11897C3.74101 16.1251 2.55202 16.1251 1.87409 15.6127C1.33251 15.2034 0.979271 14.5941 0.894055 13.9224C0.787383 13.0815 1.38187 12.0562 2.57086 10.0055L5.45218 5.03585Z" fill="white"/>
      <path d="M8.18916 6.18904C8.18916 5.74085 8.55249 5.37752 9.00068 5.37752C9.44887 5.37752 9.81219 5.74085 9.81219 6.18904V10.5229C9.81219 10.9711 9.44887 11.3344 9.00068 11.3344C8.55249 11.3344 8.18916 10.9711 8.18916 10.5229V6.18904Z" fill="#E05D4C"/>
      <path d="M8.18916 13.5883C8.18916 13.142 8.55437 12.7802 9.00068 12.7802C9.44698 12.7802 9.81219 13.142 9.81219 13.5883C9.81219 14.0346 9.44698 14.3964 9.00068 14.3964C8.55437 14.3964 8.18916 14.0346 8.18916 13.5883Z" fill="#E05D4C"/>
    </svg>
    <div class="matador__drag-item-line"></div>
    <div class="matador__drag-item-text">
     <svg width="10" height="38" viewBox="0 0 10 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.544922 35.9082H5.91797C7.125 35.9082 7.97461 35.1465 7.97461 33.7988C7.97461 32.4512 7.125 31.6836 5.91797 31.6836H0.544922L0.544922 30.377H6.0293C7.85156 30.377 9.14062 31.6777 9.14062 33.7988C9.14062 35.9199 7.85156 37.2207 6.0293 37.2207H0.544922V35.9082ZM9 28.9707H2.83594V27.7637H3.86719V27.7344C3.16406 27.4004 2.73047 26.7441 2.73047 25.7949C2.73047 24.4355 3.59766 23.6562 5.00977 23.6562H9V24.9277H5.25586C4.33008 24.9277 3.82031 25.3613 3.82031 26.2402C3.82031 27.1309 4.45312 27.7051 5.4082 27.7051H9V28.9707ZM9 22.4316H2.83594V21.2246H3.88477V21.1953C3.16406 20.9902 2.73633 20.4395 2.73633 19.7129C2.73633 19.5312 2.76563 19.373 2.7832 19.2793H3.96094C3.91992 19.3789 3.89063 19.6016 3.89063 19.8477C3.89063 20.6621 4.43555 21.166 5.30859 21.166H9V22.4316ZM3.74414 16.1855C3.74414 17.0703 4.41797 17.6914 5.34961 17.7559V14.6738C4.40625 14.7031 3.74414 15.3008 3.74414 16.1855ZM7.18945 14.6797V13.4785C8.31445 13.6543 9.11719 14.7207 9.11719 16.1328C9.11719 17.9434 7.89258 19.0391 5.94727 19.0391C4.01367 19.0391 2.72461 17.9258 2.72461 16.1855C2.72461 14.4746 3.93164 13.4082 5.80078 13.4082H6.23438V17.7617H6.31055C7.38281 17.7617 8.0918 17.1172 8.0918 16.1035C8.0918 15.3828 7.72852 14.8496 7.18945 14.6797ZM8.10352 10.2676C8.10352 9.38281 7.49414 8.69141 6.69141 8.69141H6.20508L6.29883 10.209C6.35156 10.9648 6.68555 11.3926 7.21289 11.3926C7.75195 11.3926 8.10352 10.9473 8.10352 10.2676ZM9.10547 10.6191C9.10547 11.8262 8.35547 12.6699 7.24805 12.6699C6.16992 12.6699 5.50781 11.8438 5.42578 10.3789L5.32617 8.69141H4.85156C4.16602 8.69141 3.75586 9.1543 3.75586 9.92773C3.75586 10.6602 4.10742 11.1172 4.6582 11.2285V12.4238C3.54492 12.3535 2.72461 11.4043 2.72461 9.88086C2.72461 8.38672 3.51563 7.43164 4.75195 7.43164H9V8.64453H7.98633V8.67383C8.67188 9.03125 9.10547 9.81055 9.10547 10.6191ZM9.10547 3.88672C9.10547 5.44531 7.86328 6.47656 5.91797 6.47656C3.97266 6.47656 2.73633 5.44531 2.73633 3.89844C2.73633 3.01367 3.18164 2.31055 3.86133 1.96484V1.94141H0.544922L0.544922 0.669922H9V1.90039H7.95117V1.92383C8.6543 2.28711 9.10547 2.99023 9.10547 3.88672ZM3.80273 3.55273C3.80273 4.55469 4.62305 5.18164 5.91797 5.18164C7.21875 5.18164 8.0332 4.55469 8.0332 3.55273C8.0332 2.58008 7.20703 1.92969 5.91797 1.92969C4.64063 1.92969 3.80273 2.58008 3.80273 3.55273Z" fill="white"/>
      </svg>
    </div>`;

  // WORKAROUND for 1Password extension consuming user gesture:
  // 1Password doesn't consume gestures from <input type="button"> elements
  // Add an invisible input button overlay that will receive the click
  const matadorUnreadButtonOverlay = document.createElement('input');
  matadorUnreadButtonOverlay.type = 'button';
  matadorUnreadButtonOverlay.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1;';
  matadorUnreadButtonMain.style.position = 'relative';
  matadorUnreadButtonMain.appendChild(matadorUnreadButtonOverlay);

  matadorUnreadButton.appendChild(matadorUnreadButtonMain);
  matadorUnreadButton.appendChild(matadorUnreadButtonDraggableIcon);

  if (matadorExtensionOptions.panelPosition === 'right') {
    matadorUnreadButton.style.right = '0px';
    matadorUnreadButtonMain.classList.add('right');
  } else {
    matadorUnreadButton.style.left = '0px';
    matadorUnreadButtonMain.classList.add('left');
  }

  document.body.appendChild(matadorUnreadButton);

  let onClickHandler = () => {
    chrome.runtime.sendMessage({
      action: 'TOGGLE_CONVERSATION_LIST',
      url: matadorConversationLink,
    });
  };
  dragElement(matadorUnreadButton, 'unread', onClickHandler);
}

function dragElement(elmnt, buttonType, onClickHandler) {
  let initialY;
  let pos2 = 0;
  let pos4 = 0;
  let isDragging = false;
  const DRAG_THRESHOLD = 20; // pixels

  if (elmnt) {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    pos4 = e.clientY;
    initialY = pos4;
    isDragging = false;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    // elmnt.onclick = onClickHandler;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    if (
      !isDragging &&
      Math.abs(e.clientY - initialY) > DRAG_THRESHOLD
    ) {
      isDragging = true;
    }

    if (!isDragging) return; // don’t drag yet

    // calculate the new cursor position:
    pos2 = pos4 - e.clientY;
    pos4 = e.clientY;

    // Check if the new position exceeds the boundaries
    const windowHeight = window.innerHeight;
    const elmntHeight = elmnt.offsetHeight;
    let newTop = elmnt.offsetTop - pos2;

    if (newTop < 0) {
      newTop = 0; // Prevent dragging above the top of the window
    } else if (newTop > windowHeight - elmntHeight) {
      newTop = windowHeight - elmntHeight; // Prevent dragging below the bottom of the window
    }

    // set the element's new position:
    elmnt.onclick = null;
    elmnt.style.top = newTop + 'px';
    elmnt.classList.add('matador_draggable-item-hover');
    let dragPlace = newTop + 'px';

    if (buttonType === 'unread') {
      window.localStorage.setItem('top', dragPlace);
    } else if (buttonType === 'blue') {
      window.localStorage.setItem('top-blue', dragPlace);
    }
  }

  function closeDragElement() {
    elmnt.classList.remove('matador_draggable-item-hover');
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    if (!isDragging) {
      onClickHandler();
    }
  }
}

const objFunctions = {
  openConversation: (objParams) => {
    let url = `${matadorConversationLink}?`;

    const additionalData = [];

    if (!objParams?.email && !objParams?.phoneNumber) {
      return {
        success: false,
        message: 'No email or phone number provided',
      };
    }

    if (objParams?.phoneNumber) {
      additionalData.push(
        'phone_number=' +
          encodeURIComponent(objParams.phoneNumber.replace(/\D/g, ''))
      );
    }
    if (objParams?.email) {
      additionalData.push(
        'email=' + encodeURIComponent(objParams.email)
      );
    }

    if (objParams?.name) {
      additionalData.push(
        'first_name=' + encodeURIComponent(objParams.name)
      );
    }
    if (objParams?.lastName) {
      additionalData.push(
        'last_name=' + encodeURIComponent(objParams.lastName)
      );
    }

    if (objParams?.priority && objParams?.[objParams.priority]) {
      additionalData.push(
        'type=' + encodeURIComponent(objParams?.priority)
      );
    } else {
      const priority = objParams?.phoneNumber
        ? 'phoneNumber'
        : 'email';
      additionalData.push('type=' + encodeURIComponent(priority));
    }

    if (additionalData?.length) {
      url += '&' + additionalData.join('&');
    }

    lastUrl = url;

    chrome.runtime.sendMessage({
      action: 'TOGGLE_CONVERSATION',
      url: url,
      maintain: true,
    });
    setTimeout(() => {
      if (!matadorBlueButton) return;
      if (matadorExtensionOptions.panelPosition === 'right') {
        matadorBlueButton.style.right = '-2px';
      } else {
        matadorBlueButton.style.left = '-2px';
      }
      matadorBlueButton.style.display = 'flex';
    }, 500);
  },
  toggleSidepanel: () => {
    chrome.runtime.sendMessage({
      action: 'TOGGLE_CONVERSATION_LIST',
      url: matadorConversationLink,
    });
  },
};

function injectScriptForExposingFunctions() {
  if (functionsExposed) return;

  functionsExposed = true;

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(
    'service_worker_utils/inject.js'
  );
  script.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(script);

  window.addEventListener('message', (event) => {
    if (event.data.type && objFunctions[event.data.type]) {
      objFunctions[event.data.type](event.data.args);
    }
  });
}

// The script will start running from here on 'load' event
window.addEventListener('load', async function () {
  const response = await getObjectFromLocalStorage('options');

  matadorExtensionOptions = {
    ...matadorExtensionOptions,
    ...response,
  };

  matadorUserEmail =
    (await getObjectFromLocalStorage('matadorUserEmail')) || '';

  let urlHostname = window.location.hostname;
  const pathname = window.location.pathname;

  // Get latest values from browser
  let gotFromStoreage = await getObjectFromLocalStorage('options');

  matadorExtensionOptions = {
    ...matadorExtensionOptions,
    ...gotFromStoreage,
  };

  let pagePath = window.location.pathname;
  let ancestorOrigins = window.location.ancestorOrigins.length;

  if (
    urlHostname.includes('eleadcrm.com') &&
    matadorExtensionOptions.eleadEnabled
  ) {
    startExtension();
    if (
      matadorExtensionOptions.unreadButtonChecked &&
      !pagePath.includes('/login')
    ) {
      await injectUnreadConversationListButton(
        matadorExtensionOptions
      );
    }
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('forddirectcrm.com') &&
    matadorExtensionOptions.eleadEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('crmsuite.com') &&
    matadorExtensionOptions.crmSuiteEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dealersocket.com') &&
    matadorExtensionOptions.dealerSocketEnabled &&
    !pagePath.includes('/CRM/business') &&
    !pagePath.includes('/CRM/admin/UserSignature') &&
    !pagePath.includes('/CRM/CuteSoft_Client/CuteEditor/Template')
  ) {
    startExtension();
    if (
      !pagePath.includes('/Login') &&
      !pagePath.includes('/Logout')
    ) {
      await injectUnreadConversationListButton(
        matadorExtensionOptions
      );
    }
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('realtor.ca') &&
    matadorExtensionOptions.realtorEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dealercenter.net') &&
    matadorExtensionOptions.dealerCenterEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('v12autodealers.com') &&
    matadorExtensionOptions.vautodealersEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    (urlHostname.includes('apps.vinmanager.com') ||
      urlHostname.includes('vinsolutions.app.coxautoinc.com')) &&
    matadorExtensionOptions.vinSolutionEnabled
  ) {
    if (pagePath.includes('CustomerDashboard.aspx')) {
      startExtension();
    }
    if (!pagePath.includes('usersettings.aspx')) {
      injectMainButton(matadorExtensionOptions);
    }
    await injectUnreadConversationListButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('vanillasoft.net') &&
    matadorExtensionOptions.vanillaSoftEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('tmscan.com') &&
    matadorExtensionOptions.tmsEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('activix.ca') &&
    matadorExtensionOptions.activixEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
    injectScriptForExposingFunctions();
  } else if (
    urlHostname.includes('isw.dlsaccelerator.com') &&
    matadorExtensionOptions.oneEightyEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('tis.toyota.com') &&
    matadorExtensionOptions.onetoyotaEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('linkedin.com') &&
    matadorExtensionOptions.linkedinEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('udccrm.com') &&
    matadorExtensionOptions.momentumEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('pipedrive.com') &&
    matadorExtensionOptions.pipedriveEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('crmpro.sm360.ca') &&
    matadorExtensionOptions.sm360Enabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('app.zoominfo.com') &&
    matadorExtensionOptions.zoomInfoEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('zoho.com') &&
    matadorExtensionOptions.zohoEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('readymode.com') &&
    matadorExtensionOptions.readymodeEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('tekioncloud.com') &&
    matadorExtensionOptions.tekionEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('driver.coxautoinc.com') &&
    matadorExtensionOptions.leaddriverEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('autoswatch.com') &&
    matadorExtensionOptions.autoswatchEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('xencall.com') &&
    matadorExtensionOptions.xencallEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('highergear.net') &&
    matadorExtensionOptions.highergearEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('app.elogps.net') &&
    matadorExtensionOptions.elogpsEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dealer.reyrey.net') &&
    matadorExtensionOptions.reynoldEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('subarucareconnect.com') &&
    matadorExtensionOptions.subaruEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('admin.d2cmedia.ca') &&
    matadorExtensionOptions.d2cMediaEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('getmyauto.com') &&
    matadorExtensionOptions.getmyautoEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dealercarsearch.com') &&
    matadorExtensionOptions.dealercarsearchEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('docs.google.com') &&
    matadorExtensionOptions.googleDocEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('hubspot.com') &&
    matadorExtensionOptions.hubspotEnabled
  ) {
    if (!ancestorOrigins) {
      startExtension();
      await injectUnreadConversationListButton(
        matadorExtensionOptions
      );
      injectMainButton(matadorExtensionOptions);
    }
  } else if (
    urlHostname.includes('drivecentric.com') &&
    matadorExtensionOptions.driveCentricEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('carwars.com') &&
    matadorExtensionOptions.carWarsEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('oplogic.com') &&
    matadorExtensionOptions.opLogicEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dealerpeak.net') &&
    matadorExtensionOptions.dealerpeakEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dealr.cloud') &&
    matadorExtensionOptions.dealerCloudEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('goxee.com') &&
    matadorExtensionOptions.goxeeEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('autoalert.com') &&
    matadorExtensionOptions.autoAlertEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('automotivemastermind.com') &&
    matadorExtensionOptions.automotiveMasterMindEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('egmserver') &&
    matadorExtensionOptions.egmEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('car-research.com') &&
    matadorExtensionOptions.carResearchEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('connectcdk.com') &&
    matadorExtensionOptions.connectcdkEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('fahrney.techwall') &&
    matadorExtensionOptions.fahrneyEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('xtime') &&
    matadorExtensionOptions.xtimeEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('idealautosyndicate.com') &&
    matadorExtensionOptions.idealautosyndicateEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('dp360crm.com') &&
    matadorExtensionOptions.dpEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    (urlHostname.includes('totaldealer.com') ||
      urlHostname.includes('dealerstudio.com')) &&
    matadorExtensionOptions.dealerstudioEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('asnsoftware.com') &&
    matadorExtensionOptions.asnsoftwarecrmEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('autogate') &&
    matadorExtensionOptions.autogatetEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('carsales') &&
    matadorExtensionOptions.autogatetEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('sellyserver') &&
    matadorExtensionOptions.sellyEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('promaxonline') &&
    matadorExtensionOptions.promaxEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('reprompt') &&
    matadorExtensionOptions.repromptEnabled
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  } else if (
    urlHostname.includes('demo.matador.ai') &&
    pathname.includes('/integrations/')
  ) {
    startExtension();
    await injectUnreadConversationListButton(matadorExtensionOptions);
    injectMainButton(matadorExtensionOptions);
  }
});
