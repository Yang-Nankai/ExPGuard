/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DrawerWidget)
/* harmony export */ });
/* harmony import */ var _svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1599);
/* harmony import */ var _svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3415);
/* harmony import */ var _svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_1__);


class DrawerWidget {
  constructor(right = '10px', bottom = '10px') {
    do {
      this.widgetId = `DrawerWidget-${Math.random().toString(36).substr(2, 9)}`;
    } while (document.getElementById(this.widgetId)); // unique ID 생성


    this.right = right;
    this.bottom = bottom;
    this.styles = {
      '.drawerWidgetToggleButton': {
        position: 'fixed',
        right: '350px',
        bottom: this.bottom,
        zIndex: '99999',
        width: '60px',
        height: '60px',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        background: 'transparent',
        opacity: '1',
        transition: 'right 0.5s'
      },
      '.drawerWidgetToggleButton.off': {
        right: this.right,
        opacity: '0.3',
        transition: 'right 0.5s, opacity 10s' // Add transition for right and opacity

      },
      '.drawerWidgetToggleButton.off:hover': {
        opacity: '1',
        transition: 'right 0.5s, opacity 0s' // Add transition for right and opacity

      },
      '.drawerWidget': {
        position: 'fixed',
        right: '-350px',
        top: '0px',
        zIndex: '99998',
        width: '350px',
        // Set the width to 350px when open
        height: '100vh',
        // Full height
        overflow: 'hidden',
        // Hide horizontal
        transition: '0.5s',
        // Transition effect
        backgroundColor: '#111' // Background color

      },
      '.drawerWidget.open': {
        right: '0px'
      },
      '.drawerIframe': {
        border: 'none',
        width: '100%',
        height: '100%',
        transform: 'scale(1)',
        transformOrigin: '0 0'
      }
    };
    this.widgetHtml = `
      <div id="${this.widgetId}">
        <button class="drawerWidgetToggleButton">${(_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_1___default())}</button>
        <div class="drawerWidget">
          <iframe class="drawerIframe" ></iframe>
        </div>
      </div>
      `;
  }

  toggleWidget() {
    const widgetElement = document.querySelector(`#${this.widgetId} .drawerWidget`);
    const toggleButton = document.querySelector(`#${this.widgetId} .drawerWidgetToggleButton`);

    if (widgetElement.classList.contains('open')) {
      widgetElement.classList.remove('open');
      toggleButton.innerHTML = (_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_1___default());

      if (!toggleButton.classList.contains('off')) {
        toggleButton.classList.add('off');
      }
    } else {
      widgetElement.classList.add('open');
      toggleButton.innerHTML = (_svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_0___default());

      if (toggleButton.classList.contains('off')) {
        toggleButton.classList.remove('off');
      }
    }
  }

  toggleButtonClickListener() {
    console.log('toggle');
    this.toggleWidget();
  }

  turnOnWidget() {
    const widgetElement = document.querySelector(`#${this.widgetId} .drawerWidget`);
    const toggleButton = document.querySelector(`#${this.widgetId} .drawerWidgetToggleButton`);
    widgetElement.classList.add('open');
    toggleButton.innerHTML = (_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_1___default());

    if (toggleButton.classList.contains('off')) {
      toggleButton.classList.remove('off');
    }
  }

  update(msg) {
    if (msg.data.type === 'updateTimerWidget') {
      console.log('updateTimerWidget', msg);

      if (msg.data.openModal) {
        this.turnOnWidget();
      }

      let url = `${msg.data.origin || 'https://www.screena.com'}/widget/timer-setting?anonymousRoomId=${msg.data?.anonymousRoomId}&anonymousUserId=${msg.data?.anonymousUserId}&ga_client_id=${msg.data?.ga_client_id}`;
      const iframe = document.querySelector(`#${this.widgetId} .drawerIframe`);
      if (iframe.src === url && !msg.data.forceUpdate) return;
      iframe.src = url;
    }
  }

  destroy() {
    // Remove event listener
    const toggleButton = document.querySelector(`#${this.widgetId} .screenaWidgetToggleButton`);
    toggleButton.removeEventListener('click', this.toggleButtonClickListener); // Remove widget HTML

    const widgetElement = document.getElementById(this.widgetId);
    document.body.removeChild(widgetElement); // Remove dynamic style tag

    const styleTag = document.getElementById(`style-${this.widgetId}`);
    document.head.removeChild(styleTag);
  } // 위젯을 페이지에 렌더링


  render() {
    document.body.insertAdjacentHTML('beforeend', this.widgetHtml); // camelCase를 snake_case로 변경하는 함수

    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`); // 스타일 적용


    let css = '';

    for (const selector in this.styles) {
      let rules = '';

      for (const property in this.styles[selector]) {
        const snakeCaseProperty = camelToSnakeCase(property);
        rules += `${snakeCaseProperty}: ${this.styles[selector][property]};`;
      }

      css += `#${this.widgetId} ${selector} { ${rules} }\n`;
    }

    const styleTag = document.createElement('style');
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
    const toggleButton = document.querySelector(`#${this.widgetId} .drawerWidgetToggleButton`); // Bind the click event listener function to the current instance of TimerWidget
    // to make sure the correct context is preserved when the event is triggered

    this.toggleButtonClickListener = this.toggleButtonClickListener.bind(this);
    toggleButton.addEventListener('click', this.toggleButtonClickListener);

    if (!toggleButton.classList.contains('off')) {
      toggleButton.classList.add('off');
    } // 'message' 이벤트 리스너를 등록합니다.


    window.addEventListener('message', event => {
      if (event.data === 'closeScreenaTimerDeck') {
        this.toggleButtonClickListener();
      }
    }, false);
  }

}

/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SettingWidget)
/* harmony export */ });
/* harmony import */ var _svg_rewind_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7614);
/* harmony import */ var _svg_rewind_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_svg_rewind_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _svg_fastforward_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7556);
/* harmony import */ var _svg_fastforward_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_svg_fastforward_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1599);
/* harmony import */ var _svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3415);
/* harmony import */ var _svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_3__);





function formatTime(ms) {
  if (ms >= 359999000) return '99:59:59';
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60; // Pad minutes and seconds with leading zeros if below 10

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds; // Only display hours if it is not '00'

  const timeStr = hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
  return timeStr;
}

class SettingWidget {
  constructor(screenaBase, right = '10px', bottom = '10px') {
    // widget 초기화
    do {
      this.widgetId = `SettingWidget-${Math.random().toString(36).substr(2, 9)}`;
    } while (document.getElementById(this.widgetId)); // unique ID 생성


    this.screenaBase = screenaBase;
    this.right = right;
    this.bottom = bottom;
    this.styles = {
      '.screenaWidgetToggleButton': {
        position: 'fixed',
        right: this.right,
        bottom: this.bottom,
        zIndex: '99999',
        width: '60px',
        height: '60px',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        background: 'transparent',
        opacity: '1',
        transition: 'none' // Add transition for opacity

      },
      '.screenaWidgetToggleButton.off': {
        opacity: '0.2',
        transition: 'opacity 10s' // Add transition for opacity

      },
      '.screenaWidgetToggleButton.off:hover': {
        opacity: '1',
        transition: 'none' // Add transition for opacity

      },
      '.screenaWidget': {
        position: 'fixed',
        right: `calc(${this.right} + 2px)`,
        bottom: `calc(${this.bottom} + 50px)`,
        background: '#171717',
        zIndex: '99998',
        color: 'white',
        padding: '20px',
        width: '360px',
        fontFamily: 'Spoqa Han Sans Neo'
      },
      '.screenaWidgetTitleContainer': {
        display: 'grid',
        columnGap: '16px',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center'
      },
      '.screenaWidgetCurrentService': {
        padding: '2px 6px',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: '0em',
        lineHeight: '18px',
        textAlign: 'left',
        textTransform: 'uppercase',
        background: '#333333',
        color: 'white'
      },
      '.screenaWidgetCurrentTitle': {
        padding: '4px',
        fontSize: '16px',
        lineHeight: '20px',
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: '0.03em',
        textAlign: 'left',
        color: 'white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      '.screenaWidgetTimerContainer': {
        marginTop: '14px',
        display: 'flex',
        alignItems: 'center',
        columnGap: '2px'
      },
      '.screenaWidgetTimerCurrent': {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '28px',
        lineHeight: '100%',
        letterSpacing: '1.4px',
        color: '#FBFBFB'
      },
      '.screenaWidgetTimerDuration': {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '100%',
        letterSpacing: '1.4px',
        color: '#A5A5A5'
      },
      '.screenaWidgetSyncContainer': {
        marginTop: '8px',
        padding: '12px 10px',
        border: '1px solid #8B8B8B',
        borderRadius: '4px'
      },
      '.screenaWidgetSyncDiffrence': {
        fontSize: '12px'
      },
      '.screenaWidgetSyncButtonContainer': {
        display: 'flex',
        marginTop: '8px',
        justifyContent: 'space-between'
      },
      '.screenaWidgetSyncButton': {
        position: 'relative',
        width: '36px',
        height: '36px',
        alignItems: 'center',
        fontFamily: 'Gilroy',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '36px',
        textAlign: 'center',
        letterSpacing: '0.4px',
        color: '#C1C1C1',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '0'
      },
      '.screenaWidgetSyncButton > svg': {
        position: 'absolute',
        display: 'block',
        left: '0',
        top: '0',
        bottom: '0',
        right: '0'
      },
      '.screenaWidgetSyncButton.reset': {
        border: '2px solid #C1C1C1',
        borderRadius: '999px',
        width: '96px',
        height: '36px',
        lineHeight: '36px'
      }
    };
    this.widgetHtml = `
    <div id="${this.widgetId}">
      <button class="screenaWidgetToggleButton">${(_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_3___default())}</button>
      <div class="screenaWidget" style="display: none;">
        <div class="screenaWidgetTitleContainer">
          <div class="screenaWidgetCurrentService">service</div>
          <div class="screenaWidgetCurrentTitle">
            Unknown
          </div>
        </div>
        <div class="screenaWidgetTimerContainer">
          <span class="screenaWidgetTimerCurrent">00:00:00</span>
          <span class="screenaWidgetTimerDuration">/00:00:00</span>
        </div>
        <div class="screenaWidgetSyncContainer">
          <div class="screenaWidgetSyncDiffrence">Sync Diffrence : +1.7s</div>
          <div class="screenaWidgetSyncButtonContainer">
            <button class="screenaWidgetSyncButton">
              <span>1</span>
              ${(_svg_rewind_svg__WEBPACK_IMPORTED_MODULE_0___default())}
            <button class="screenaWidgetSyncButton">
              <span>0.1</span>
              ${(_svg_rewind_svg__WEBPACK_IMPORTED_MODULE_0___default())}
            </button>
            <button class="screenaWidgetSyncButton reset">Reset</button>
            <button class="screenaWidgetSyncButton">
              <span>0.1</span>
              ${(_svg_fastforward_svg__WEBPACK_IMPORTED_MODULE_1___default())}
            </button>
            <button class="screenaWidgetSyncButton">
              <span>1</span>
              ${(_svg_fastforward_svg__WEBPACK_IMPORTED_MODULE_1___default())}
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
    this.accumulatedDiff = 0; // 누적 sync difference를 저장할 변수 추가

    this.debounceTimeout = null; // debounce를 위한 timeout id를 저장할 변수 추가

    this.intervalId = null; // setInterval을 clear하기 위한 interval id를 저장할 변수 추가

    this.lastDisplayedTime = null; // 마지막으로 표시된 시간을 저장할 변수 추가

    this.syncDifference = 0; // sync difference를 저장할 변수 추가

    this.currentTime = 0;
  } // 위젯을 페이지에 렌더링


  render() {
    document.body.insertAdjacentHTML('beforeend', this.widgetHtml); // camelCase를 snake_case로 변경하는 함수

    const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`); // 스타일 적용


    let css = '';

    for (const selector in this.styles) {
      let rules = '';

      for (const property in this.styles[selector]) {
        const snakeCaseProperty = camelToSnakeCase(property);
        rules += `${snakeCaseProperty}: ${this.styles[selector][property]};`;
      }

      css += `#${this.widgetId} ${selector} { ${rules} }\n`;
    }

    const styleTag = document.createElement('style');
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
    const toggleButton = document.querySelector(`#${this.widgetId} .screenaWidgetToggleButton`);
    toggleButton.addEventListener('click', () => this.toggleWidget()); // 버튼 클릭 이벤트 추가

    const buttons = document.querySelectorAll(`#${this.widgetId} .screenaWidgetSyncButton`);
    buttons.forEach((button, index) => {
      button.addEventListener('click', event => {
        this.handleButtonClick(event, index);
      });
    });

    if (!toggleButton.classList.contains('off')) {
      toggleButton.classList.add('off');
    }
  }

  toggleWidget() {
    const widgetElement = document.querySelector(`#${this.widgetId} .screenaWidget`);
    const toggleButton = document.querySelector(`#${this.widgetId} .screenaWidgetToggleButton`);

    if (widgetElement.style.display !== 'none') {
      widgetElement.style.display = 'none';
      toggleButton.innerHTML = (_svg_oknim_button_off_svg__WEBPACK_IMPORTED_MODULE_3___default());

      if (!toggleButton.classList.contains('off')) {
        toggleButton.classList.add('off');
      }
    } else {
      widgetElement.style.display = 'block';
      toggleButton.innerHTML = (_svg_oknim_button_on_svg__WEBPACK_IMPORTED_MODULE_2___default());

      if (toggleButton.classList.contains('off')) {
        toggleButton.classList.remove('off'); // turn on other buttons
      }
    }
  } // 버튼 클릭 핸들러 함수


  handleButtonClick(event, index) {
    console.log(`Button ${index + 1} clicked!`); // diff 값 배열

    const diffs = [-1000, -100, 0, 100, 1000]; // 인덱스를 사용해 diff 값 선택

    const diff = diffs[index]; // 누적 diff 저장

    this.accumulatedDiff = (this.accumulatedDiff || 0) + diff; // index가 2인 경우 즉시 메시지 전송 및 debounce 취소

    if (index === 2) {
      this.screenaBase.sendMessageToExtensionWithoutDebounce('setSyncDifference', {
        reset: true,
        syncDifference: 0
      }); // 이미 실행중인 debounce가 있다면 클리어

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = null;
        this.accumulatedDiff = 0;
      }
    } else {
      // 첫 번째 클릭 이벤트 처리
      if (!this.debounceTimeout) {
        this.screenaBase.sendMessageToExtensionWithoutDebounce('setSyncDifference', {
          reset: false,
          syncDifference: this.syncDifference + this.accumulatedDiff
        });
        this.accumulatedDiff = 0; // 첫 번째 클릭 처리 후 누적 diff 초기화
      } // 이미 실행중인 debounce가 있다면 클리어


      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      } // 새로운 debounce 설정


      this.debounceTimeout = setTimeout(() => {
        // 누적 diff가 0이 아닌 경우만 메시지 전송
        if (this.accumulatedDiff !== 0) {
          this.screenaBase.sendMessageToExtensionWithoutDebounce('setSyncDifference', {
            reset: false,
            syncDifference: this.syncDifference + this.accumulatedDiff
          });
        } // debounce와 누적 diff 초기화


        this.debounceTimeout = null;
        this.accumulatedDiff = 0;
      }, 300); // 500ms 동안 아무런 이벤트가 없을 때 실행
    }
  } // 새로운 설정을 적용


  updateSettings(data) {
    console.log('updateSettings', data);

    if (data.serviceName || data.service) {
      const serviceElement = document.querySelector(`#${this.widgetId} .screenaWidgetCurrentService`);
      serviceElement.textContent = data.serviceName || data.service;
    }

    if (data.title) {
      const titleElement = document.querySelector(`#${this.widgetId} .screenaWidgetCurrentTitle`);
      titleElement.textContent = data.title;
    }

    if (data.duration) {
      const timerDurationElement = document.querySelector(`#${this.widgetId} .screenaWidgetTimerDuration`);
      timerDurationElement.textContent = '/' + formatTime(data.duration);
    }

    if (data.syncDifference !== undefined) {
      const syncDifferenceElement = document.querySelector(`#${this.widgetId} .screenaWidgetSyncDiffrence`);
      this.syncDifference = data.syncDifference;
      const sign = this.syncDifference >= 0 ? '+' : '';
      syncDifferenceElement.textContent = 'Sync Difference: ' + sign + (this.syncDifference / 1000).toFixed(1) + 's';
    }

    if (data.currentTime) {
      const timerCurrentElement = document.querySelector(`#${this.widgetId} .screenaWidgetTimerCurrent`);
      timerCurrentElement.textContent = formatTime(data.currentTime);
      this.currentTime = data.currentTime;
      this.lastDisplayedTime = data.currentTime; // State가 playing인 경우

      if (data.state === 'playing') {
        // 이미 setInterval이 동작 중이면 먼저 제거
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        } // setInterval로 250ms마다 currentTime 업데이트


        this.intervalId = setInterval(() => {
          // console.log('setInterval',this)
          this.currentTime += 250; // currentTime의 값이 바뀌면 DOM 업데이트

          if (Math.floor(this.currentTime / 1000) > Math.floor(this.lastDisplayedTime / 1000) || !this.lastDisplayedTime) {
            const timerCurrentElement = document.querySelector(`#${this.widgetId} .screenaWidgetTimerCurrent`);
            timerCurrentElement.textContent = formatTime(this.currentTime);
            this.lastDisplayedTime = this.currentTime;
          }
        }, 250);
      } // State가 paused나 stopped인 경우
      else if (data.state !== 'playing') {
          // setInterval 제거
          if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
          }
        }
    }
  }

  destroy() {
    // widget element 제거
    const widgetElement = document.querySelector(`#${this.widgetId} .screenaWidget`);

    if (widgetElement) {
      widgetElement.remove();
    } // setInterval 제거


    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    } // debounce timeout 제거


    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

}

/***/ }),

/***/ 7556:
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.75861 7.59971C9.62527 4.52397 13.7338 2.59668 18.3017 2.59668C22.3983 2.59668 26.1253 4.14672 28.9186 6.68507L24.6035 11.0002H34.6035L34.6032 1.00024L30.3342 5.26942C27.1775 2.3697 22.9474 0.59668 18.3017 0.59668C13.16 0.59668 8.52736 2.76857 5.29554 6.23609C2.39187 9.35154 0.615234 13.5171 0.615234 18.0925C0.615234 22.6678 2.39187 26.8334 5.29554 29.9488C8.52736 33.4164 13.16 35.5883 18.3017 35.5883C23.4435 35.5883 28.0761 33.4164 31.3079 29.9488C34.2116 26.8334 35.9882 22.6678 35.9882 18.0925H33.9882C33.9882 22.1392 32.4192 25.8232 29.8448 28.5852C26.9782 31.661 22.8696 33.5883 18.3017 33.5883C13.7338 33.5883 9.62527 31.661 6.75861 28.5852C4.1843 25.8232 2.61523 22.1392 2.61523 18.0925C2.61523 14.0458 4.1843 10.3618 6.75861 7.59971Z\" fill=\"#C1C1C1\"></path></svg>"

/***/ }),

/***/ 3415:
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 60 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><mask id=\"mask0_1391_18598\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"60\" height=\"60\"><circle cx=\"30\" cy=\"30\" r=\"30\" fill=\"#D9D9D9\"></circle></mask><g mask=\"url(#mask0_1391_18598)\"><circle cx=\"30\" cy=\"30\" r=\"30\" fill=\"#052C65\"></circle><path d=\"M15.8339 18.0943C5.82757 20.103 1.73197 51.1205 3.51484 64.8981H58.6253C58.6253 50.4722 54.7354 18.0943 42.5787 12.7453C33.1777 8.60885 28.2832 14.9941 25.3972 21.1739C25.3972 21.1739 23.3403 16.5873 15.8339 18.0943Z\" fill=\"url(#paint0_radial_1391_18598)\"></path><ellipse cx=\"19.3876\" cy=\"42.4492\" rx=\"5.91837\" ry=\"9.79592\" fill=\"#F6F4EE\"></ellipse><ellipse cx=\"20.6735\" cy=\"41.5102\" rx=\"3.67347\" ry=\"5.5102\" fill=\"#242424\"></ellipse><ellipse cx=\"33.6732\" cy=\"42.4492\" rx=\"5.91837\" ry=\"9.79592\" fill=\"#F6F4EE\"></ellipse><ellipse cx=\"34.5509\" cy=\"41.5102\" rx=\"3.67347\" ry=\"5.5102\" fill=\"#242424\"></ellipse></g><defs><radialGradient id=\"paint0_radial_1391_18598\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(25.2356 21.3361) rotate(81.5888) scale(38.5052 44.5358)\"><stop stop-color=\"#FFEEAE\"></stop><stop offset=\"0.572325\" stop-color=\"#FFC01F\"></stop></radialGradient></defs></svg>"

/***/ }),

/***/ 1599:
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 60 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><mask id=\"mask0_1391_18597\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"60\" height=\"60\"><circle cx=\"30\" cy=\"30\" r=\"30\" fill=\"#D9D9D9\"></circle></mask><g mask=\"url(#mask0_1391_18597)\"><circle cx=\"30\" cy=\"30\" r=\"30\" fill=\"#031633\"></circle><path d=\"M15.8339 18.0943C5.82757 20.103 1.73197 51.1205 3.51484 64.8981H58.6253C58.6253 50.4722 54.7354 18.0943 42.5787 12.7453C33.1777 8.60885 28.2832 14.9941 25.3972 21.1739C25.3972 21.1739 23.3403 16.5873 15.8339 18.0943Z\" fill=\"url(#paint0_radial_1391_18597)\"></path><ellipse cx=\"19.3876\" cy=\"42.4492\" rx=\"5.91837\" ry=\"9.79592\" fill=\"#F6F4EE\"></ellipse><ellipse cx=\"19.1837\" cy=\"38.9799\" rx=\"3.67347\" ry=\"5.5102\" fill=\"#242424\"></ellipse><ellipse cx=\"33.6732\" cy=\"42.4492\" rx=\"5.91837\" ry=\"9.79592\" fill=\"#F6F4EE\"></ellipse><ellipse cx=\"33.0612\" cy=\"38.9799\" rx=\"3.67347\" ry=\"5.5102\" fill=\"#242424\"></ellipse></g><defs><radialGradient id=\"paint0_radial_1391_18597\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(25.2356 21.3361) rotate(81.5888) scale(38.5052 44.5358)\"><stop stop-color=\"#FFEEAE\"></stop><stop offset=\"0.572325\" stop-color=\"#FFC01F\"></stop></radialGradient></defs></svg>"

/***/ }),

/***/ 7614:
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 36 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M29.8449 7.59971C26.9782 4.52397 22.8697 2.59668 18.3018 2.59668C14.2053 2.59668 10.4782 4.14672 7.68494 6.68507L12 11.0002H2L2.00027 1.00024L6.26933 5.26942C9.42607 2.3697 13.6561 0.59668 18.3018 0.59668C23.4435 0.59668 28.0762 2.76857 31.308 6.23609C34.2116 9.35154 35.9883 13.5171 35.9883 18.0925C35.9883 22.6678 34.2116 26.8334 31.308 29.9488C28.0762 33.4164 23.4435 35.5883 18.3018 35.5883C13.16 35.5883 8.52742 33.4164 5.2956 29.9488C2.39193 26.8334 0.615299 22.6678 0.615299 18.0925H2.6153C2.6153 22.1392 4.18436 25.8232 6.75867 28.5852C9.62533 31.661 13.7339 33.5883 18.3018 33.5883C22.8697 33.5883 26.9782 31.661 29.8449 28.5852C32.4192 25.8232 33.9883 22.1392 33.9883 18.0925C33.9883 14.0458 32.4192 10.3618 29.8449 7.59971Z\" fill=\"#C1C1C1\"></path></svg>"

/***/ }),

/***/ 9038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./abema/abema.json": 6310,
	"./amazon/amazon.json": 9423,
	"./coupangplay/coupangplay.json": 9011,
	"./danet/danet.json": 6480,
	"./disneyplus/disneyplus.json": 1492,
	"./dorama/dorama.json": 5781,
	"./gamer/gamer.json": 3599,
	"./hbogo/hbogo.json": 2354,
	"./hotstar/hotstar.json": 3979,
	"./iq/iq.json": 4234,
	"./kktv/kktv.json": 6785,
	"./laftel/laftel.json": 1816,
	"./linetv/linetv.json": 5943,
	"./m-78/m-78.json": 7825,
	"./mubi/mubi.json": 1713,
	"./netflix/netflix.json": 1187,
	"./paramountplus/paramountplus.json": 4122,
	"./pops/pops.json": 224,
	"./serieson/serieson.json": 5284,
	"./tokusatsu-fc/tokusatsu-fc.json": 7893,
	"./tver/tver.json": 9144,
	"./tving/tving.json": 9324,
	"./twitch/twitch.json": 9836,
	"./unext/unext.json": 9406,
	"./vidio/vidio.json": 4946,
	"./vimeo/vimeo.json": 513,
	"./viu/viu.json": 4192,
	"./watcha/watcha.json": 3752,
	"./wavve/wavve.json": 1747,
	"./wetv/wetv.json": 8348,
	"./youtube/youtube.json": 6605,
	"./zee5/zee5.json": 4989
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 9038;

/***/ }),

/***/ 6310:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"abema","serviceName":"AbemaTV","shortcode":"ab","url":"https://abema.tv/","origins":["https://abema.tv/"],"contentScripts":[{"id":"abema-content","matches":["https://abema.tv/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/abema/abema-inject.js"]}');

/***/ }),

/***/ 9423:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"amazon","serviceName":"Amazon Prime Video","shortcode":"am","url":"https://www.amazon.co.jp/Amazon-Video/b?ie=UTF8&node=2351649051","origins":["https://www.amazon.co.jp/"],"contentScripts":[{"id":"amazon-content","matches":["https://www.amazon.co.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/amazon/amazon-inject.js"]}');

/***/ }),

/***/ 9011:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"coupangplay","serviceName":"coupang play","shortcode":"co","url":"https://www.coupangplay.com/","origins":["https://www.coupangplay.com/"],"contentScripts":[{"id":"coupangplay-content","matches":["https://www.coupangplay.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/coupangplay/coupangplay-inject.js"]}');

/***/ }),

/***/ 6480:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"danet","serviceName":"DANET","shortcode":"da","url":"https://danet.vn/","origins":["https://danet.vn/"],"contentScripts":[{"id":"danet-content","matches":["https://danet.vn/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/danet/danet-inject.js"]}');

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"disneyplus","serviceName":"Disney+","shortcode":"di","url":"https://www.disneyplus.com/","origins":["https://www.disneyplus.com/"],"contentScripts":[{"id":"disneyplus-content","matches":["https://www.disneyplus.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/disneyplus/disneyplus-inject.js"]}');

/***/ }),

/***/ 5781:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"dorama","serviceName":"dorama korea","shortcode":"do","url":"https://www.dorama.kr/","origins":["https://www.dorama.kr/"],"contentScripts":[{"id":"dorama-content","matches":["https://www.dorama.kr/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/dorama/dorama-inject.js"]}');

/***/ }),

/***/ 3599:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"gamer","serviceName":"動畫瘋","shortcode":"ga","url":"https://ani.gamer.com.tw/","origins":["https://ani.gamer.com.tw/"],"contentScripts":[{"id":"gamer-content","matches":["https://ani.gamer.com.tw/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/gamer/gamer-inject.js"]}');

/***/ }),

/***/ 2354:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"hbogo","serviceName":"HBO GO","shortcode":"hb","url":"https://www.hbogo.co.th/","origins":["https://www.hbogo.co.th/"],"contentScripts":[{"id":"hbogo-content","matches":["https://www.hbogo.co.th/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/hbogo/hbogo-inject.js"]}');

/***/ }),

/***/ 3979:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"hotstar","serviceName":"Disney+ hotstar","shortcode":"ho","url":"https://www.hotstar.com/","origins":["https://www.hotstar.com/"],"contentScripts":[{"id":"hotstar-content","matches":["https://www.hotstar.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/hotstar/hotstar-inject.js"]}');

/***/ }),

/***/ 4234:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"iq","serviceName":"iQIYI","shortcode":"iq","url":"https://www.iq.com/","origins":["https://www.iq.com/"],"contentScripts":[{"id":"iq-content","matches":["https://www.iq.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/iq/iq-inject.js"]}');

/***/ }),

/***/ 6785:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"kktv","serviceName":"KKTV","shortcode":"kk","url":"https://www.kktv.me/","origins":["https://kktv.me/","https://www.kktv.me/"],"contentScripts":[{"id":"kktv-content","matches":["https://www.kktv.me/*","https://kktv.me/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/kktv/kktv-inject.js"]}');

/***/ }),

/***/ 1816:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"laftel","serviceName":"LAFTEL","shortcode":"la","url":"https://laftel.net/","origins":["https://laftel.net/","https://www.laftel.net/"],"contentScripts":[{"id":"laftel-content","matches":["https://laftel.net/*","https://www.laftel.net/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/laftel/laftel-inject.js"]}');

/***/ }),

/***/ 5943:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"linetv","serviceName":"LineTV","shortcode":"li","url":"https://www.linetv.tw","origins":["https://www.linetv.tw/","https://access.line.me/"],"contentScripts":[{"id":"linetv-content","matches":["https://www.linetv.tw/*","https://access.line.me/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/linetv/linetv-inject.js"]}');

/***/ }),

/***/ 7825:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"m-78","serviceName":"TSUBURAYA IMAGINATION","shortcode":"m-","url":"https://imagination.m-78.jp/","origins":["https://imagination.m-78.jp/","https://account.m-78.jp/"],"contentScripts":[{"id":"m-78-content","matches":["https://imagination.m-78.jp/*","https://account.m-78.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/m-78/m-78-inject.js"]}');

/***/ }),

/***/ 1713:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"mubi","serviceName":"MUBI","shortcode":"mu","url":"https://mubi.com/","origins":["https://mubi.com/","https://www.mubi.com/"],"contentScripts":[{"id":"mubi-content","matches":["https://mubi.com/*","https://www.mubi.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/mubi/mubi-inject.js"]}');

/***/ }),

/***/ 1187:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"netflix","serviceName":"NETFLIX","shortcode":"ne","url":"https://www.netflix.com/","origins":["https://www.netflix.com/"],"contentScripts":[{"id":"netflix-content","matches":["https://www.netflix.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/netflix/netflix-inject.js"]}');

/***/ }),

/***/ 4122:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"paramountplus","serviceName":"Paramount+","shortcode":"pa","url":"https://www.paramountplus.com/","origins":["https://www.paramountplus.com/"],"contentScripts":[{"id":"paramountplus-content","matches":["https://www.paramountplus.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/paramountplus/paramountplus-inject.js"]}');

/***/ }),

/***/ 224:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"pops","serviceName":"pops","shortcode":"po","url":"https://pops.tv/","origins":["https://pops.tv/"],"contentScripts":[{"id":"pops-content","matches":["https://pops.tv/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/pops/pops-inject.js"]}');

/***/ }),

/***/ 5284:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"serieson","serviceName":"SERIES ON","shortcode":"se","url":"https://serieson.naver.com/","origins":["https://serieson.naver.com/"],"contentScripts":[{"id":"serieson-content","matches":["https://serieson.naver.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/serieson/serieson-inject.js"]}');

/***/ }),

/***/ 7893:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"tokusatsu-fc","serviceName":"東映特撮ファンクラブ","shortcode":"to","url":"https://tokusatsu-fc.jp/","origins":["https://tokusatsu-fc.jp/","https://pc.tokusatsu-fc.jp/","https://account.bandainamcoid.com/"],"contentScripts":[{"id":"tokusatsu-fc-content","matches":["https://tokusatsu-fc.jp/*","https://pc.tokusatsu-fc.jp/*","https://account.bandainamcoid.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/tokusatsu-fc/tokusatsu-fc-inject.js"]}');

/***/ }),

/***/ 9144:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"tver","serviceName":"TVer","shortcode":"tV","url":"https://tver.jp/","origins":["https://tver.jp/","https://www.tver.jp/"],"contentScripts":[{"id":"tver-content","matches":["https://tver.jp/*","https://www.tver.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/tver/tver-inject.js"]}');

/***/ }),

/***/ 9324:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"tving","serviceName":"TVING","shortcode":"tv","url":"https://www.tving.com/","origins":["https://www.tving.com/"],"contentScripts":[{"id":"tving-content","matches":["https://www.tving.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/tving/tving-inject.js"]}');

/***/ }),

/***/ 9836:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"twitch","serviceName":"Twitch","shortcode":"tw","url":"https://www.twitch.tv/","origins":["https://www.twitch.tv/"],"contentScripts":[{"id":"twitch-content","matches":["https://www.twitch.tv/*"],"js":["ott/twitch/twitch-content.js"]}],"injectScripts":["ott/twitch/twitch-inject.js"]}');

/***/ }),

/***/ 9406:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"unext","serviceName":"U-NEXT","shortcode":"un","url":"https://video.unext.jp/","origins":["https://video.unext.jp/","https://www.video.unext.jp/"],"contentScripts":[{"id":"unext-content","matches":["https://video.unext.jp/*","https://www.video.unext.jp/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/unext/unext-inject.js"]}');

/***/ }),

/***/ 4946:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"vidio","serviceName":"Vidio","shortcode":"vJ","url":"https://www.vidio.com/","origins":["https://www.vidio.com/"],"contentScripts":[{"id":"vidio-content","matches":["https://www.vidio.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/vidio/vidio-inject.js"]}');

/***/ }),

/***/ 513:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"vimeo","serviceName":"Vimeo","shortcode":"vI","url":"https://vimeo.com/","origins":["https://vimeo.com/","https://www.vimeo.com/","https://player.vimeo.com/"],"contentScripts":[{"id":"vimeo-content","matches":["https://vimeo.com/*","https://www.vimeo.com/*","https://player.vimeo.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/vimeo/vimeo-inject.js"]}');

/***/ }),

/***/ 4192:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"viu","serviceName":"Viu","shortcode":"vi","url":"https://www.viu.com/","origins":["https://www.viu.com/"],"contentScripts":[{"id":"viu-content","matches":["https://www.viu.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/viu/viu-inject.js"]}');

/***/ }),

/***/ 3752:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"watcha","serviceName":"WATCHA","shortcode":"wA","url":"https://watcha.com/","origins":["https://watcha.com/","https://www.watcha.com/"],"contentScripts":[{"id":"watcha-content","matches":["https://watcha.com/*","https://www.watcha.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/watcha/watcha-inject.js"]}');

/***/ }),

/***/ 1747:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"wavve","serviceName":"Wavve","shortcode":"wa","url":"https://www.wavve.com/","origins":["https://www.wavve.com/"],"contentScripts":[{"id":"wavve-content","matches":["https://www.wavve.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/wavve/wavve-inject.js"]}');

/***/ }),

/***/ 8348:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"wetv","serviceName":"WeTV","shortcode":"we","url":"https://wetv.vip/","origins":["https://wetv.vip/","https://www.wetv.vip/"],"contentScripts":[{"id":"wetv-content","matches":["https://wetv.vip/*","https://www.wetv.vip/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/wetv/wetv-inject.js"]}');

/***/ }),

/***/ 6605:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"youtube","serviceName":"YouTube","shortcode":"yo","url":"https://www.youtube.com/","origins":["https://www.youtube.com/"],"contentScripts":[{"id":"youtube-content","matches":["https://www.youtube.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/youtube/youtube-inject.js"]}');

/***/ }),

/***/ 4989:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"zee5","serviceName":"ZEE5","shortcode":"ze","url":"https://www.zee5.com/","origins":["https://www.zee5.com/"],"contentScripts":[{"id":"zee5-content","matches":["https://www.zee5.com/*"],"js":["ott/ott-content.js"]}],"injectScripts":["ott/zee5/zee5-inject.js"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./screena/setting-widget.js
var setting_widget = __webpack_require__(580);
;// CONCATENATED MODULE: ./lib/ott.js
/* eslint-disable no-undef */
const data = {};

function importAll(r) {
  r.keys().forEach(key => {
    const {
      name,
      serviceName,
      url,
      origins,
      contentScripts,
      injectScripts,
      shortcode
    } = r(key);
    data[name] = {
      name,
      serviceName,
      url,
      origins,
      contentScripts,
      injectScripts,
      shortcode
    };
  });
}
/* function importAll(r) {
  const dataEntries = r.keys().sort().map((key) => {
    const { index, name, url, origins, contentScripts, injectScripts } = r(key)
    return [name, {
      index,
      name,
      url,
      origins,
      contentScripts,
      injectScripts
    }];
  });

  // index에 따라 dataEntries를 정렬
  dataEntries.sort((a, b) => a[1].index - b[1].index);

  // 정렬된 dataEntries를 data 객체에 추가
  for (const [name, dataEntry] of dataEntries) {
    data[name] = dataEntry;
  }
}
 */


function removeAllSearchParams(url) {
  const urlObj = new URL(url);
  urlObj.search = '';
  return urlObj.toString();
}

importAll(__webpack_require__(9038));
/* harmony default export */ const ott = ({
  data: Object.values(data),
  get: service => data[service],
  matchingOTT: str => {
    if (data[str]) return [data[str]];
    const result = {};
    const url = removeAllSearchParams(str);

    for (const [name, ott] of Object.entries(data)) {
      for (const contentScript of ott.contentScripts) {
        for (const matchPattern of contentScript.matches) {
          if (new URLPattern(matchPattern).test(url)) {
            result[name] = ott;
            break;
          }
        }

        if (result[name]) break;
      }
    }

    return Object.values(result);
  },
  matchingContentScripts: str => {
    const result = [];
    const url = removeAllSearchParams(str);

    for (const ott of Object.values(data)) {
      for (const contentScript of ott.contentScripts) {
        for (const matchPattern of contentScript.matches) {
          if (new URLPattern(matchPattern).test(url)) {
            result.push(contentScript);
          }
        }
      }
    }

    return result;
  }
});
;// CONCATENATED MODULE: ./lib/utils.js

function debounce(func, wait) {
  let timeout;

  let _args;

  return function executedFunction(...args) {
    _args = args;

    const later = () => {
      clearTimeout(timeout);
      timeout = null;
      func(..._args);
    };

    if (timeout) return;
    timeout = setTimeout(later, wait);
  };
}
/* export function debounceAsync(func, wait) {
  let timeout
  let _args
  return function executedFunction(...args) {
    _args = args
    return new Promise((resolve, reject) => {
      const later = async () => {
        clearTimeout(timeout)
        timeout = null
        try {
          const result = await func(..._args)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }
      if (timeout) return reject(new Error('Function call was debounced'))
      timeout = setTimeout(later, wait)
    })
  }
} */

function debounceAsync(func, wait) {
  let timeout;

  let _args;

  let resolves = [];
  let rejects = [];

  const later = async () => {
    clearTimeout(timeout);
    timeout = null;

    try {
      const result = await func(..._args);
      resolves.forEach(resolve => resolve(result));
    } catch (error) {
      rejects.forEach(reject => reject(error));
    } finally {
      resolves = [];
      rejects = [];
    }
  };

  return function executedFunction(...args) {
    _args = args;
    return new Promise((resolve, reject) => {
      resolves.push(resolve);
      rejects.push(reject);
      if (timeout) return;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    });
  };
}
function getLocalStorage(keys) {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, result => {
      resolve(result);
    });
  });
}
function setLocalStorage(keyValueObj) {
  return chrome.storage.loca.set(keyValueObj);
}
function findTabs(match) {
  return new Promise(resolve => {
    chrome.tabs.query(match, function (tabs) {
      resolve(tabs);
    });
  });
}
function updateServiceNameInUrl(serviceSelectUrl) {
  let _serviceSelectUrl = serviceSelectUrl;
  if (!_serviceSelectUrl) return _serviceSelectUrl;

  try {
    const urlObject = new URL(_serviceSelectUrl);
    const ottService = urlObject.searchParams.get('service');

    if (ottService) {
      const ottServiceList = String(ottService).split(',');
      const serviceNameList = ottServiceList.map(ottService => {
        return encodeURIComponent(OTT.get(ottService).serviceName);
      });
      const separator = urlObject.searchParams.size > 0 ? '&' : '?';
      _serviceSelectUrl += separator + 'serviceName=' + serviceNameList.join(',');
    }
  } catch (e) {
    console.error('updateServiceNameInUrl Error:', e);
  }

  return _serviceSelectUrl;
}
;// CONCATENATED MODULE: ./lib/playlistToBase64.js

const stateToNumber = {
  playing: '1',
  paused: '2',
  browsing: '3',
  'something else': '4',
  ads: '5'
};
const numberToState = {
  1: 'playing',
  2: 'paused',
  3: 'browsing',
  4: 'something else',
  5: 'ads'
};

function toBase64(num) {
  num = Math.round(num); // 숫자를 반올림하여 정수로 변환

  const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let str = '';
  let r;

  while (num > 0) {
    r = num % 64;
    str = digits[r] + str;
    num = Math.floor(num / 64);
  }

  return str;
}

function fromBase64(str) {
  const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let num = 0;
  const len = str.length;

  for (let i = 0; i < len; i++) {
    num = num * 64 + digits.indexOf(str[i]);
  }

  return num;
}

const urlShortCodeMap = new Map();
const shortCodeUrlMap = new Map();
const websiteNameShortcodeMap = new Map();
console.log('ottsdata', ott.data); // 첫 번째 패스: 모든 고유한 OTT 이름에 대한 단축코드 불러오기

ott.data.forEach(ott => {
  if (!websiteNameShortcodeMap.has(ott.name)) {
    const shortcode = ott.shortcode;
    websiteNameShortcodeMap.set(ott.name, shortcode);
  }
}); // 두 번째 패스: 각 OTT의 오리진에 대한 단축코드 생성

ott.data.forEach(ott => {
  const shortCodeName = websiteNameShortcodeMap.get(ott.name);
  ott.origins.forEach((origin, index) => {
    if (origin.endsWith('/')) {
      origin = origin.slice(0, -1); // 마지막 문자가 '/'인지 확인하고 삭제
    }

    const shortCode = shortCodeName + index.toString();
    urlShortCodeMap.set(origin, shortCode);
    shortCodeUrlMap.set(shortCode, origin);
  });
}); // Additional hard-coded mappings
// 영문 대소문자 + 한자리 숫자조합. 대문자를 우선시 한다

const additionalMappings = [{
  url: 'https://www.netflix.com/watch',
  shortCode: 'N1'
}, {
  url: 'https://www.youtube.com/watch',
  shortCode: 'Y1'
}, {
  url: 'https://www.youtube.com/watch?v=',
  shortCode: 'Y2'
} // More mappings can be added here...
];
additionalMappings.forEach(({
  url,
  shortCode
}) => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1); // 마지막 문자가 '/'인지 확인하고 삭제
  }

  if (shortCode.startsWith('ht')) {
    console.warn(`shortCode could not starts with 'ht': ${shortCode}. Skipping...`);
    return;
  } // Check for potential collisions


  if (urlShortCodeMap.has(url)) {
    console.warn(`Collision detected for URL: ${url}. Skipping...`);
    return;
  }

  if (shortCodeUrlMap.has(shortCode)) {
    console.warn(`Collision detected for short code: ${shortCode}. Skipping...`);
    return;
  }

  urlShortCodeMap.set(url, shortCode);
  shortCodeUrlMap.set(shortCode, url);
});

function urlToShortCode(url) {
  // map의 keys를 배열로 가져와서 길이에 따라 내림차순으로 정렬합니다.
  const sortedKeys = Array.from(urlShortCodeMap.keys()).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (url.startsWith(key)) {
      return url.replace(key, urlShortCodeMap.get(key));
    }
  }

  return url; // 변환할 수 없는 경우 원래 URL 반환
}

function shortCodeToUrl(shortUrl) {
  for (const [key, value] of urlShortCodeMap.entries()) {
    if (shortUrl.startsWith(value)) {
      return shortUrl.replace(value, key);
    }
  }

  return shortUrl; // 변환할 수 없는 경우 원래 URL 반환
}

function toHourElapsedTime(unixTimeMs) {
  const now = new Date();
  const thisHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
  return unixTimeMs - thisHour.getTime();
}

function fromHourElapsedTime(elapsedTimeMs) {
  const now = new Date();
  const thisHour = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours()));
  let result = thisHour.getTime() + elapsedTimeMs;

  if (result > now.getTime()) {
    const differenceInMs = result - now.getTime();
    const differenceInHours = Math.ceil(differenceInMs / (1000 * 60 * 60));
    const previousHour = new Date(result);
    previousHour.setHours(previousHour.getHours() - differenceInHours);
    result = previousHour.getTime() + elapsedTimeMs;
  }

  return result;
}

function convertToCondensedPlaylistTuple(playlist) {
  const shortUrl = urlToShortCode(playlist.url);
  return [shortUrl, stateToNumber[playlist.state] || playlist.state, toBase64(playlist.lastPlayTime), toBase64(toHourElapsedTime(playlist.lastVideoEventTime || playlist.lastMsgReceived)) // lastMsgReceived만 있을경우 이를 사용합니다.
  ];
}

function convertToPlayList(condensedPlaylistTuple) {
  const fullUrl = shortCodeToUrl(condensedPlaylistTuple[0]);
  return {
    url: fullUrl,
    state: numberToState[condensedPlaylistTuple[1]] || condensedPlaylistTuple[1],
    lastPlayTime: fromBase64(condensedPlaylistTuple[2]),
    lastVideoEventTime: fromHourElapsedTime(fromBase64(condensedPlaylistTuple[3]))
  };
}

function playlistToBase64_encode(playlist) {
  const filteredPlaylist = convertToCondensedPlaylistTuple(playlist);
  const pipeString = filteredPlaylist.join('|');
  const base64String = btoa(pipeString);
  return base64String;
}
function decode(base64String) {
  const pipeString = atob(base64String).split('|');

  if (pipeString.length < 4) {
    const andString = atob(base64String).split('&');
    const playlist = convertToPlayList(andString);
    return playlist;
  }

  const playlist = convertToPlayList(pipeString);
  return playlist;
}
/* harmony default export */ const playlistToBase64 = ({
  encode: playlistToBase64_encode,
  decode
});
;// CONCATENATED MODULE: ./lib/screenaAPI.js



async function isRecording(screenaUser, state, callback) {
  try {
    const response = await fetch(screenaUser.apiEndPoint + '/event/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        userid: screenaUser.uid,
        platform: state.service,
        videoid: state.videoId
      })
    });
    const result = await response.json();
    if (result?.isEvents) callback(true);else callback(false);
  } catch (e) {
    sendErrorLog(e, 'screenaAPI isRecording');
    console.error(e);
  }
}
async function sendRecords(screenaUser, state) {
  console.log('sendRecords', screenaUser, state);

  try {
    const response = await fetch(screenaUser.apiEndPoint + '/event/stamp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        userid: screenaUser.uid,
        platform: state.service,
        videoid: state.videoId,
        playtime: state.currentTime,
        duration: state.duration
      })
    });
    const result = await response.json();
  } catch (e) {
    sendErrorLog(e, 'screenaAPI sendRecords');
    console.error(e);
  }

  return true;
}
async function createAnonymousRoom(apiEndPoint = 'https://api.screena.com') {
  try {
    const response = await fetch(apiEndPoint + '/anonymous/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        room_name: 'anonymous room',
        is_private: false,
        is_show_contents: true
      })
    });
    const result = await response.json();
    console.log('createAnonymousRoom', result);
    return {
      roomId: result.data.room_id,
      uid: result.data.uid
    };
  } catch (e) {
    sendErrorLog(e, 'screenaAPI createAnonymousRoom');
    console.error(e);
  }
}
async function updateAnonymousRoom(uid, roomId, {
  state,
  currentTime,
  duration,
  embedUrl,
  interaction,
  service,
  serviceName,
  title,
  url,
  videoId,
  metadata,
  lastVideoEventTime
}, apiEndPoint = 'https://api.screena.com') {
  try {
    const playlist = {
      url,
      embedUrl,
      state,
      service,
      serviceName,
      title,
      duration,
      lastMsgReceived: lastVideoEventTime,
      lastInteraction: interaction,
      videoId,
      metadata: metadata || {},
      lastPlayTime: currentTime
    }; // Modify the origin based on the original origin

    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        uid,
        play_list: playlist
      })
    });
    if (response.status === 404) return 'invalid_room';
    const result = await response.json();
    console.log('updateAnonymousRoom result', result);
    return result.success ? 'success' : 'failed';
  } catch (e) {
    throw new Error(e);
  }
}
async function sendSyncMessageToChat(uid, roomId, {
  state,
  currentTime,
  duration,
  embedUrl,
  interaction,
  service,
  title,
  url,
  videoId,
  metadata,
  lastVideoEventTime
}, apiEndPoint = 'https://api.screena.com', origin = 'https://www.screena.com') {
  try {
    const playlist = {
      url,
      embedUrl,
      state,
      service,
      title,
      duration,
      lastMsgReceived: lastVideoEventTime,
      lastInteraction: interaction,
      videoId,
      metadata: metadata || {},
      lastPlayTime: currentTime
    };
    const code = encode(playlist);
    let search = code; // Modify the origin based on the original origin

    let newOrigin;

    if (origin.startsWith('https://www.screena.com') || origin.startsWith('https://screena.com')) {
      newOrigin = 'https://t.screena.com/';
    } else if (origin.startsWith('https://stg.screena.com')) {
      newOrigin = 'https://t.screena.com/'; // Add dev=1 to the search parameters

      search += '&dev=1';
    } else {
      newOrigin = origin.startsWith('https://') ? origin.substring(8) : origin;
    }

    const urlMsg = newOrigin + (newOrigin.includes('t.screena.com') ? '?' : '/watchparty/join-anonymous?') + search;
    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/twitch/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        uid,
        url_msg: urlMsg
      })
    });
    if (response.status === 404) return 'invalid_room';
    const result = await response.json();
    console.log('sendSyncMessageToChat result', result);
    return result.success ? 'success' : 'failed';
  } catch (e) {
    throw new Error(e);
  }
}
async function connentWithTwitch(uid, roomId, code, redirectUrl, apiEndPoint = 'https://api.screena.com') {
  try {
    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/twitch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        uid,
        data: {
          code,
          redirect_uri: redirectUrl
        }
      })
    });
    if (response.status === 404) return false;
    if (response.status >= 200 && response.status < 300) return true;
    throw new Error(`connentWithTwitch error ${response.status}:${response}`);
  } catch (e) {
    throw new Error(e);
  }
}
async function disconnectWithTwitch(uid, roomId, apiEndPoint = 'https://api.screena.com') {
  try {
    const response = await fetch(`${apiEndPoint}/anonymous/rooms/${roomId}/twitch`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        rui: uuidv4()
      },
      body: JSON.stringify({
        uid
      })
    });
    if (response.status === 404) return false;
    if (response.status >= 200 && response.status < 300) return true;
    throw new Error(`disconnectWithTwitch error ${response.status}:${response}`);
  } catch (e) {
    throw new Error(e);
  }
} // error log check api

async function sendErrorLog(error, hint, service) {
  try {
    console.log('sendErrorLog', error, hint, service);
    /* 
    const { anonymousRoomId, anonymousUserId, screenaUser } = await getLocalStorage(['anonymousRoomId','anonymousUserId','screenaUser'])
    const uid = screenaUser?.uid || undefined
    const apiEndPoint = screenaUser?.apiEndPoint || 'https://api.screena.com'
     const response = fetch(
      `${apiEndPoint}/logs/extension`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          rui: uuidv4()
      },
      body: JSON.stringify({
        error_log: String(error),
        error_name: String(error?.name),
        error_msg: String(error?.message),
        hint,
        uid,
        platform: service,
        anonymous_uid: anonymousUserId,
        anonymous_room_id: anonymousRoomId,
        extension_ver: chrome.runtime.getManifest().version
      })
    })
    */
  } catch (e) {
    console.error(e);
  }
}
// EXTERNAL MODULE: ./screena/drawer.js
var drawer = __webpack_require__(3355);
;// CONCATENATED MODULE: ./lib/screena-base.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class ScreenaBase {
  constructor(_service) {
    _defineProperty(this, "sendMessageToExtensionWithoutDebounce", async (type, data = null) => {
      // console.log('sendMessageToExtensionWithoutDebounce', type, data)
      return new Promise(resolve => {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage(this.ExtensionID, {
          id: this.id,
          mui: Math.random().toString(36).substr(2, 9),
          from: 'content',
          service: this.service,
          serviceName: this.serviceName,
          type,
          data
        }, function (response) {
          resolve(response);
        });
      });
    });

    _defineProperty(this, "sendMessageToExtension", debounce(async (type, data = null) => {
      // console.log('sendMessageToExtension', type, data)
      return new Promise(resolve => {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage(this.ExtensionID, {
          id: this.id,
          mui: Math.random().toString(36).substr(2, 9),
          from: 'content',
          service: this.service,
          serviceName: this.serviceName,
          type,
          data
        }, function (response) {
          // console.log('sendMessage response', response)
          resolve(response);
        });
      });
    }, 200));

    _defineProperty(this, "requestUpdateTimer", debounce(data => {
      // console.log('requestUpdateTimer', data)
      return new Promise(resolve => {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage(this.ExtensionID, {
          id: this.id,
          mui: Math.random().toString(36).substr(2, 9),
          from: 'content',
          service: this.service,
          serviceName: this.serviceName,
          type: 'requestUpdateTimer',
          data
        }, function (response) {
          resolve(response);
        });
      });
    }, 200));

    _defineProperty(this, "onMessage", msg => {
      /*
      msg.data는 다음과 같은 구조를 가집니다:
      {
        "type": "state",  // 메시지의 유형을 나타냅니다. 이 경우에는 "state"이므로 상태 정보를 전달합니다.
        "data": {  // 실제 메시지 데이터가 포함됩니다.
            "url": "https://www.netflix.com/watch/80138256",  // 현재 시청 중인 콘텐츠의 URL입니다.
            "service": "netflix",  // 사용 중인 서비스를 나타냅니다.
            "state": "paused",  // 현재 콘텐츠의 재생 상태를 나타냅니다. 
            "currentTime": 133751,  // 현재 콘텐츠의 재생 시점을 나타냅니다. 단위는 보통 밀리초입니다.
            "interaction": "paused"  // 최근 사용자와의 상호작용을 나타냅니다.
        },
        "settingWidget": true,  // SettingWidget이 활성화되어야 하는지를 나타냅니다. 
        "syncDifference": 5000,  // 동기화 차이를 나타냅니다. 
        "origin": "http://localhost:3000"  // 메시지의 출처를 나타냅니다.
      }
      */
      if (typeof msg.data.type === 'string') // console.log('receive message', msg.data.type, msg)
        switch (msg.data.type) {
          case 'startBroadcast':
            this.startBroadcast();
            break;

          case 'state':
            /* this.sendMessageToExtensionWithoutDebounce('checkVideoSync', this.getVideoSyncData(msg.data)) */
            this.processMessage(msg.data);

            if (msg.data.settingWidget) {
              if (!this.settingWidget) {
                this.settingWidget = new setting_widget/* default */.Z(this, this.settingWidgetPosition.right, this.settingWidgetPosition.bottom);
                this.settingWidget.render();
              }

              this.settingWidget.updateSettings({
                service: msg.data.data.service,
                serviceName: msg.data.data.serviceName,
                title: this.getTitle(),
                state: msg.data.data.state,
                currentTime: this.getCurrentTime(),
                duration: this.getDuration(),
                syncDifference: msg.data.syncDifference
              });
            } else {
              this.settingWidget && this.settingWidget.destroy();
              this.settingWidget = null;
            }

            break;

          case 'stopBroadcast':
            this.stopBroadcast();
            break;

          case 'openTimer':
            if (!this.timerWidget) {
              this.timerWidget = new drawer/* default */.Z(this.timerWidgetPosition.right, this.timerWidgetPosition.bottom);
              this.timerWidget.render();
            }

            this.startBroadcast('timer');
            break;

          case 'closeTimer':
            if (this.timerWidget) {
              this.timerWidget.destroy();
              this.timerWidget = null;
            }

            break;

          case 'updateTimerWidget':
            this.timerWidget.update(msg);
            this.startBroadcast('timer');
            break;

          default: // pass

        }
    });

    _defineProperty(this, "getVideoSyncData", msg => {
      let data = {};

      try {
        data = {
          host: {
            url: msg.data.embedUrl || msg.data.url,
            service: msg.service || msg.data.service,
            contentId: this.getContentId(msg.data.embedUrl || msg.data.url, msg.data.url),
            state: msg.data.state,
            currentTime: msg.data.currentTime,
            interaction: msg.data.interaction
          },
          guest: {
            url: window.location.href,
            service: this.service,
            contentId: this.getContentId(window.location.href),
            state: this.getMediaState(),
            currentTime: this.getCurrentTime()
          }
        };
      } catch (e) {
        sendErrorLog(e, 'screena-base getVideoSyncData', this.service);
        console.error(e);
      }

      return data;
    });

    _defineProperty(this, "startBroadcast", (type = null) => {
      // console.log('startBroadcast')
      this.broadcasting = true;
      this.onVideoEvent({
        type: type || 'periodic'
      }); // Clear any existing intervals

      if (this.addVideoEventsRetryIntervalId) {
        clearInterval(this.addVideoEventsRetryIntervalId);
        this.addVideoEventsRetryIntervalId = null;
      }

      const retryInterval = 3000; // in milliseconds

      this.addVideoEventsRetryIntervalId = setInterval(() => {
        this.addVideoEvents();

        if (this.broadcasting === false) {
          clearInterval(this.addVideoEventsRetryIntervalId);
          this.addVideoEventsRetryIntervalId = null;
        }
      }, retryInterval);
    });

    _defineProperty(this, "stopBrodadcast", () => {
      this.broadcasting = false;
      clearInterval(this.addVideoEventsRetryIntervalId);
      this.addVideoEventsRetryIntervalId = null;
      this.removeVideoEvents();
    });

    _defineProperty(this, "processMessage", msg => {
      const mediaState = this.getMediaState();
      const service = msg.service || msg.data.service;

      if (msg.data.state === 'browsing' || msg.data.state === 'something else' || service === this.service && mediaState === 'something else') {
        return;
      }

      if (this.setLocation(msg.data.embedUrl || msg.data.url, msg.data.url)) {
        return;
      }

      if (msg.data.state === 'ads') return;
      const timegap = msg.data.currentTime - this.getCurrentTime();
      const timegapAllowed = msg.data.interaction === 'periodic' ? 3000 : 500;

      switch (mediaState) {
        case 'playing':
          if (msg.data.state === 'paused') {
            this.pause();
          }

          if (timegap > timegapAllowed || timegap < -timegapAllowed) {
            this.setCurrentTime(msg.data.currentTime);
          }

          break;

        case 'paused':
          if (msg.data.state === 'playing') {
            this.play();
          }

          if (timegap > timegapAllowed || timegap < -timegapAllowed) {
            this.setCurrentTime(msg.data.currentTime);
          }

          break;

        default:
          {// pass
          }
      }
    });

    _defineProperty(this, "setLocation", url => {
      if (this.getContentId(url) !== '' && this.getContentId(url) === this.getContentId(window.location.href)) {
        return false;
      }

      if (url === window.location.href) return false;
      window.location.href = url;
      return true;
    });

    _defineProperty(this, "VideoPlayer", () => {
      const video = document.querySelector('video');
      return video || null;
      /*     const video = document.querySelectorAll('video')
      if (video.length===1) return video[0]
      else return Object.values(video).sort((a,b)=>b.duration-a.duration)[0] */
    });

    _defineProperty(this, "play", () => {
      // console.log('play')
      this.VideoPlayer() && this.VideoPlayer().play();
    });

    _defineProperty(this, "pause", () => {
      // console.log('pause')
      this.VideoPlayer() && this.VideoPlayer().pause();
    });

    _defineProperty(this, "getMediaState", _url => {
      // you'd better implement this method for each ott services in child class
      if (this.VideoPlayer()) {
        if (this.VideoPlayer().paused) {
          return 'paused';
        } else {
          return 'playing';
        }
      }

      return 'browsing'; // return "something else"
    });

    _defineProperty(this, "getCurrentState", () => {
      let url, embedUrl;

      try {
        url = this.getUrl();
        if (typeof url === 'object') [url, embedUrl] = url;
      } catch (e) {
        sendErrorLog(e, 'screena-base getCurrentState', this.service);
        console.error(e);
        return undefined;
      }

      const result = {
        type: 'state',
        service: this.service,
        serviceName: this.serviceName,
        url,
        embedUrl,
        state: this.getMediaState(url),
        currentTime: this.getCurrentTime() || 0,
        duration: this.getDuration(),
        lastVideoEventTime: Date.now(),
        videoId: this.getContentId(url)
      };
      if (typeof result.state === 'undefined' || typeof result.url === 'undefined') return undefined;

      if (result.state === 'paused' || result.state === 'playing') {
        try {
          const _title = this.getTitle();

          if (_title) this.title[result.videoId] = _title;
          result.title = this.title[result.videoId];
        } catch (e) {
          sendErrorLog(e, 'screena-base getCurrentState getTitle', this.service);
          console.error('getTitleError', e);
        }
      }

      if (typeof this?.getMetadata === 'function' && !!result.videoId) {
        try {
          result.metadata = this.getMetadata(result.videoId);
        } catch (e) {
          sendErrorLog(e, 'screena-base getCurrentState getMetadata', this.service);
          console.error('getMetadata Error', e);
        }
      }

      if (!result.metadata && typeof this.getMetadataAsync === 'function') {
        if (this.metadata[url]) {
          result.metadata = this.metadata[url];
        } else {
          this.getMetadataAsync(result.videoId).then(res => {
            this.metadata[url] = res;
          });
        }
      }

      return result;
    });

    _defineProperty(this, "getUrl", () => {
      // you'd better implement this method for each ott services in child class
      return [location.href, null];
    });

    _defineProperty(this, "setCurrentTime", time => {
      if (this.VideoPlayer()) {
        this.VideoPlayer().currentTime = time / 1000;
      }
    });

    _defineProperty(this, "getCurrentTime", () => {
      if (this.VideoPlayer()) {
        return this.VideoPlayer().currentTime * 1000;
      }
    });

    _defineProperty(this, "getDuration", () => {
      if (this.VideoPlayer()) {
        return this.VideoPlayer().duration * 1000;
      }
    });

    _defineProperty(this, "getContentId", _url => {
      throw new Error('You have to implement the getContentId method in child class');
    });

    _defineProperty(this, "getTitle", _url => {
      // you'd better implement this method for each ott services in child class
      return document.head.querySelector("meta[property='og:title']")?.content || document.querySelector('title')?.textContent?.trim();
    });

    _defineProperty(this, "addVideoEvents", (eventList = ['play', 'pause', 'seeking']) => {
      const videoPlayer = this.VideoPlayer();
      if (!videoPlayer) return false;
      if (videoPlayer.screenaEvents) return true;
      videoPlayer.screenaEvents = {};
      eventList.forEach(type => {
        const eventHandler = event => {
          this.onVideoEvent(event);
        };

        videoPlayer.screenaEvents[type] = eventHandler;
        videoPlayer.addEventListener(type, eventHandler);
      });
      return true;
    });

    _defineProperty(this, "removeVideoEvents", () => {
      const videoPlayer = this.VideoPlayer();
      if (!videoPlayer || !videoPlayer.screenaEvents) return false;

      for (const [type, handler] of Object.entries(videoPlayer.screenaEvents)) {
        videoPlayer.removeEventListener(type, handler);
      }

      videoPlayer.screenaEvents = null;
      return true;
    });

    _defineProperty(this, "onVideoEvent", event => {
      const state = this.getCurrentState();
      if (typeof state === 'undefined') return false;

      switch (event.type) {
        case 'play':
          state.interaction = 'play';
          if (state.state === 'paused') state.state = 'playing';
          break;

        case 'pause':
          state.interaction = 'pause';
          if (state.state === 'playing') state.state = 'paused';
          break;

        case 'seeking':
          state.interaction = 'seeking';
          break;

        case 'periodic':
        case 'update':
        case 'timer':
          state.interaction = 'periodic';
          break;

        default:
          throw new Error('You have to implement the onVideoEvent method in child class to handle another event');
      }

      if (this.timerWidget && (state.state === 'paused' || state.state === 'playing')) {
        this.requestUpdateTimer(state);
      }

      this.sendMessageToExtension('state', state);
      return true;
    });

    _defineProperty(this, "isRecording", async callback => {
      const state = this.getCurrentState();

      if (this.recording[state.videoId] === undefined) {
        const response = await this.sendMessageToExtensionWithoutDebounce('isRecording', state);
        if (response === undefined) return;
        this.recording[state.videoId] = response;
        callback(response);
      } else {
        callback(this.recording[state.videoId]);
      }
    });

    _defineProperty(this, "sendRecords", async callback => {
      const state = this.getCurrentState();
      if (!['playing', 'paused'].includes(state.state)) return;
      await this.isRecording(async result => {
        if (!result) return;
        const response = await this.sendMessageToExtensionWithoutDebounce('records', state);
        callback && callback(response);
      });
    });

    _defineProperty(this, "startRecording", () => {
      if (this.recordingTimer) clearInterval(this.recordingTimer);
      this.sendRecords();
      this.recordingTimer = setInterval(this.sendRecords, 10000);
      document.addEventListener('unload', () => {
        this.sendRecords();
        clearInterval(this.recordingTimer);
      });
    });

    this.id = `ScreenaBase-${Math.random().toString(36).substr(2, 9)}`;
    this.service = _service;
    this.serviceName = ott.get(_service).serviceName;
    this.ExtensionID = 'hhoapolbeidlfbkkmieijgnfigijlimm';
    window.addEventListener('message', msg => {
      this.onMessage(msg);
    }, false);
    this.metadata = {};
    this.recording = {};
    this.settingWidget = null;
    this.settingWidgetPosition = {
      right: '2px',
      bottom: '13%'
    };
    this.timerWidget = null;
    this.timerWidgetPosition = {
      right: '2px',
      bottom: '25%'
    };
    this.broadcasting = false;
    this.title = {};
  } // Add a new method without debounce


}
;// CONCATENATED MODULE: ./ott/viu/viu-inject.js
function viu_inject_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


console.log('injected!');

class ScreenaVIU extends ScreenaBase {
  constructor() {
    super('viu');

    viu_inject_defineProperty(this, "getMediaState", (url = null) => {
      const _url = new URL(url || window.location.href);

      const path = _url.pathname.split(/[/?.]/);

      if (path[4] === 'vod' && document.querySelector('video')) {
        if (document.querySelector('.videoAdUi')) return 'ads';

        if (this.VideoPlayer().paused) {
          return 'paused';
        } else {
          return 'playing';
        }
      }

      if (['no-service'].includes(path[2])) return 'something else';

      if (['', 'category', 'vod'].includes(path[4]) || [''].includes(path[3])) {
        return 'browsing';
      }

      return 'something else';
    });

    viu_inject_defineProperty(this, "getUrl", () => {
      return [location.origin, ...new URL(window.location.href).pathname.split(/[/?.]/).slice(1, 6), ''].join('/');
    });

    viu_inject_defineProperty(this, "getDuration", () => {
      if (this.VideoPlayer()) {
        return this.VideoPlayer().duration * 1000;
      }

      return null;
    });

    viu_inject_defineProperty(this, "processMessage", msg => {
      const mediaState = this.getMediaState();
      console.log('processMessage', msg, mediaState);

      if (msg.data.state === 'browsing' || msg.data.state === 'something else' || msg.service === this.service && mediaState === 'something else') {
        return;
      }

      if (this.getDuration() !== msg.data.duration) {
        if (this.setLocation(msg.data.embedUrl || msg.data.url, msg.data.url)) {
          return;
        }
      }

      if (msg.data.state === 'ads') return;

      switch (mediaState) {
        case 'playing':
          {
            if (msg.data.state === 'paused') {
              this.pause();
            }

            const timegap = msg.data.currentTime - this.getCurrentTime();
            const timegapAllowed = msg.data.interaction === 'periodic' ? 3000 : 500;

            if (timegap > timegapAllowed || timegap < -timegapAllowed) {
              this.setCurrentTime(msg.data.currentTime);
            }

            break;
          }

        case 'paused':
          if (msg.data.state === 'playing') {
            this.play();
          }

          this.setCurrentTime(msg.data.currentTime);
          break;

        default:
          {// pass
          }
      }
    });

    viu_inject_defineProperty(this, "setLocation", url => {
      /*     if (!(new URL(url)).hostname.includes('viu.com')) {
        window.location.href = url
        return true
      } */
      if (this.getContentId(url) !== '' && this.getContentId(url) === this.getContentId(window.location.href)) {
        return false;
      }

      if (url === window.location.href) return false;
      /*  const cur = (new URL(location.href)).pathname.split(/[/?.]/)
      const next = (new URL(url)).pathname.split(/[/?.]/)
      const pathname = [next[1],cur[2],cur[3],next[4],next[5]]
      const _url = [(new URL(url)).origin,...pathname,""].join('/')
      console.log(_url) */

      window.location.href = url;
      return true;
    });

    viu_inject_defineProperty(this, "getContentId", url => {
      const _url = new URL(url || window.location.href);

      const path = _url.pathname.split(/[/?.]/);

      return path[5] || '';
    });
  } // get current state from dom


}

const screena = new ScreenaVIU();
screena.sendMessageToExtensionWithoutDebounce('playerReady');
screena.startRecording();
})();

/******/ })()
;