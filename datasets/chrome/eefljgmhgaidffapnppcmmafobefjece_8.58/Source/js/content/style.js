function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
var stylePrefix = chrome.runtime.id + "-" + generateUUID();
const style = document.createElement("style");
style.id = stylePrefix + "-style";
const styleText = `
.${stylePrefix}-modal {
  display: block;
  background-color: rgba(0, 0, 0, 0);
  align-items: center;
  justify-content: center;
  z-index: 90000;
}

.${stylePrefix}-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* The Modal (background) */
.${stylePrefix}-modal-2 {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 9999; /* Sit on top */
  left: 0;
  top: 0;
  padding-top: 5%; /* Location of the box */
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}


/* Help Icon Styles */
.${stylePrefix}-bsr-help-icon {
  width: 25px;
  height: 25px;
  border-radius: 100px;
  margin: 5px;
  line-height: 1.2;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(130, 87, 254);
}

.${stylePrefix}-circle-icon {
  width: 25px;
  height: 25px;
  border-radius: 100px;
  margin: 5px;
  line-height: 1.2;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
}

.${stylePrefix}-show {
  display: block;
}

.${stylePrefix}-hide {
  display: none;
}
.${stylePrefix}-close-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  line-height: 1.2;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.${stylePrefix}-close-icon:hover {
  background-color: #e32b2b;
  color: white;
}

.${stylePrefix}-kdplogoword {
  color: rgb(130, 87, 254);
}

.${stylePrefix}-bsr-td {
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 3px;
  margin-right: 3px;
  text-align: start;
  color: #000;
  border: 2px solid #E0D6FF;
}

.${stylePrefix}-main-table {
  height: 170px;
  width: 100%;
  border-collapse: collapse;
  border: 2px solid white;
  color: white;
  text-align: center;
  font-size: 16px;
}

.${stylePrefix}-box-wrapper {
  background: white;
  color: black;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
    border-radius: 10px;
}

.${stylePrefix}-top-box {
  display: flex;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 2px solid rgb(130, 87, 254);
  border-bottom: 1px solid rgb(130, 87, 254);
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: start;
}

.${stylePrefix}-bottom-box {
  display: flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid rgb(130, 87, 254);
  border-top: 1px solid rgb(130, 87, 254);
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: start;
}

.${stylePrefix}-inner-box {
  display: flex;
  border: 2px solid rgb(130, 87, 254);
  border-bottom: 1px solid rgb(130, 87, 254);
  border-top: 1px solid rgb(130, 87, 254);
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: start;
}

.${stylePrefix}-left-box {
  width: 80px;
  border-right: 2px solid rgb(130, 87, 254);
  margin: 0px 6px 0px 6px;
}

.${stylePrefix}-card {
  perspective: 600px;
  position: relative;
}
.${stylePrefix}-card.${stylePrefix}-is-switched .${stylePrefix}-card__wrapper {
  animation: ${stylePrefix}-rotate 0.5s linear both;
}
.${stylePrefix}-card__wrapper {
  transform-style: preserve-3d;
  animation: ${stylePrefix}-rotate-inverse 0.5s linear both;
}
.${stylePrefix}-card__side {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.${stylePrefix}-card__side.${stylePrefix}-is-active {
  position: static;
}
.${stylePrefix}-card__side--back {
  transform: rotateY(180deg);
}
@keyframes ${stylePrefix}-rotate {
  0% {
    transform: rotateY(0);
  }
  70% {
    transform: rotateY(200deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes ${stylePrefix}-rotate-inverse {
  0% {
    transform: rotateY(180deg);
  }
  70% {
    transform: rotateY(-20deg);
  }
  100% {
    transform: rotateY(0);
  }
}

.${stylePrefix}-card {
}
.${stylePrefix}-card__side {
}
.${stylePrefix}-card__side--back {
}


.${stylePrefix}-tooltip {
  position: relative;
  display: inline-block;
}

.${stylePrefix}-tooltip .${stylePrefix}-tooltiptext {
  visibility: hidden;
  min-width: max-content;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 8px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.${stylePrefix}-tooltip:hover .${stylePrefix}-tooltiptext {
  visibility: visible;
}

.${stylePrefix}-text-btn {
  border: none;
  background-color: inherit;
  margin: 0 8px;
  padding: 0;
  font-size: 16px;
  font-wight: 600;
  cursor: pointer;
  display: inline-block;
  text-decoration: underline;
}
.${stylePrefix}-text-btn:hover {
  background-image: linear-gradient( 270.09deg, #6b49fc -13.64%, #de85ff 86.14%, #e26ff1 106.56% );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration: none;
}
.${stylePrefix}-text-btn.active {
  background-image: linear-gradient( 270.09deg, #6b49fc -13.64%, #de85ff 86.14%, #e26ff1 106.56% );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration: none;
}



/* Safari */
@-webkit-keyframes ${stylePrefix}-spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes ${stylePrefix}-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

        .${stylePrefix}-loader {
            border: 16px solid #f3f3f3;
            /* Light grey */
            border-top: 16px solid #6b49fc;
            /* Dark Green */
            border-radius: 50%;
            width: 200px;
            height: 200px;
            animation: ${stylePrefix}-spinloader 2s linear infinite;
        }

        .${stylePrefix}-loader img {
            padding: 40px;
            animation: ${stylePrefix}-spinlogo 2s linear infinite;
            width: 200px;
            height: 168px;
        }

        @keyframes ${stylePrefix}-spinloader {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes ${stylePrefix}-spinlogo {
            0% {
                transform: rotate(360deg);
            }

            100% {
                transform: rotate(0deg);
            }
        }
  .${stylePrefix}-gradient-btn {
    background-image: linear-gradient( 270.09deg, #6b49fc -13.64%, #de85ff 86.14%, #e26ff1 106.56% );
    color: white;
    border: none;
    padding: 0;
    font-size: 16px;
    font-wight: 600;
    cursor: pointer;
    display: inline-block;
    width: fit-content;
    padding: 8px;
    border-radius: 8px;
  }

  .${stylePrefix}-gradient-btn:hover {
    background-position: right center;
  }

.${stylePrefix}-deep-view-modal-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.${stylePrefix}-deep-view-modal-nav-bar-search input {
    width: 20rem;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    padding: 0 10px;
    font-size: 14px;
}

.${stylePrefix}-deep-view-modal-nav-bar-search input:focus {
    outline: none;
}

.${stylePrefix}-rounded-btn {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
}

.${stylePrefix}-rounded-btn:hover {
    background-color: #ccc;
}

.${stylePrefix}-rounded-btn:active {
    background-color: #aaa;
}
.${stylePrefix}-deep-icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
}

.${stylePrefix}-icon-text {
      color: rgb(130, 87, 254);
  }

  #${stylePrefix}-scrollable-list {
    max-height: 50vh;
    min-height: 50vh;
    overflow: auto;
}

  .${stylePrefix}-deep-view-modal-nav-bar-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

  .${stylePrefix}-tablinks {
    background-color: #f2f2f2;
    color: black;
    padding: 8px 16px;
    width: 100%;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: 0.3s;
  }

  .${stylePrefix}-tablinks:hover {
    background-color: #ddd;
  }

  .${stylePrefix}-tablinks.active {
    background-color: #ccc;
  }

  .${stylePrefix}-productCard{
    border: 1px solid black;
    padding: 8px;
    margin-bottom: 8px;
    font-family: "Nunito Sans", "--apple-system", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: relative;
    border-radius: 4px;
    border: 1px solid rgb(217, 224, 232);
    background-color: rgb(255, 255, 255);
    max-width: 400px;
    display: block;
    grid-template-columns: 207px 200px;
    gap: 8px;
    direction: ltr;
    display: flex!important;
    flex-direction: column!important;
    text-align: start;
}
.${stylePrefix}-cardAsinDiv{
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    margin: 0px;
    padding: 0px;
    text-transform: none;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    color: rgb(19, 25, 31);
    display: flex;
}
.${stylePrefix}-categoryDiv{
    font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    margin: 0px;
    padding: 0px;
    text-transform: none;
    font-size: 14px;
    line-height: 30px;
    /*color: rgb(43, 57, 72);*/
    white-space: nowrap;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 129, 255) !important;
}
.${stylePrefix}-restCardDataDiv{
    display: flex;
    flex-flow: wrap;
    gap: 8px;
    -webkit-box-pack: justify;
    justify-content: space-between;
}

.${stylePrefix}-sales{
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    gap: 4px;
    /*flex-direction: column;*/
}

.${stylePrefix}-salesVale{
    flex-direction: column;
}
 .${stylePrefix}-product-details-popup-card {
    position: fixed;
    display: none;
    z-index: 9999;
    background: white;
    width: fit-content;
    height: fit-content;
    top: 40px;
    right: 20px;
    padding: 8px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 8px;
 }

 .${stylePrefix}-action-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

  .${stylePrefix}-mui-white-btn {
    background-color: #fff !important;
    color: #047cfe !important;
    border: 1px solid #dde0e3;
    padding: 4px 8px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
  }

  .${stylePrefix}-mui-white-btn:hover {
    background-color: #f0f0f0;
  }

  .${stylePrefix}-mui-purple-btn {
    background-color: rgb(130, 87, 254);
    color: white !important;
    padding: 8px 28px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  }

  .${stylePrefix}-mui-purple-btn:hover {
    background-color: rgb(101 48 254);
  }

  .${stylePrefix}-mui-purple-btn:active {
    background-color: rgb(101 48 254);
  }

  .${stylePrefix}-mui-purple-btn:disabled {
    background-color: rgb(186 166 243);
    color: #9e9e9e;
    cursor: not-allowed;
  }

  .${stylePrefix}-prod-list-items {
        font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    margin: 0px;
    padding: 0px;
    text-transform: none;
    font-size: 14px;
    line-height: 18px;
    color: rgb(43, 57, 72);
    white-space: nowrap;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .${stylePrefix}-list-items-a {
    color: #047cfe !important;
    margin-right: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
  }

  .${stylePrefix}-floating-menu-icon {
    display: flex;
    position: fixed;
    bottom: 90px;
    right: 0px;
    z-index: 999;
    color: #212121;
    background: white;
    box-shadow: rgba(103, 132, 162, 0.08) 0px 2px 3px, rgba(103, 132, 162, 0.16) 0px 1px 8px;
    border-radius: 6px 0px 0px 6px;
    cursor: pointer;
}

  .${stylePrefix}-floating-menu-item {
        display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    text-transform: none;
    font-size: 16px;
    line-height: 24px;
    color: #212121 !important;
    fill: #212121;
    gap: 8px;
    border-radius: 6px;
    background-color: rgb(242, 245, 247);
    padding: 12px 16px;
    cursor: pointer;
  }

  .${stylePrefix}-floating-menu-item svg {
    width: 24px;
    height: 24px;
    fill: #212121;
  }

  .${stylePrefix}-floating-menu-item path {
    fill: #212121;
  }

  .${stylePrefix}-floating-menu-item a {
    color: #212121 !important;
  }

  .${stylePrefix}-floating-menu-item:hover {
    background-color: rgb(230, 236, 240);
  }

  .${stylePrefix}-title {
  font-size: 16px;
  font-weight: 600;
  color: #212121;
  margin: 16px 0px 16px 16px;
  padding: 0;
  margin: 0;
  width: max-content;
}

.${stylePrefix}-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #212121;
  padding: 0;
  margin: 0;
  width: max-content;
}



.${stylePrefix}-purple-btn {
      display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    padding: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: inherit;
    font-family: '__Roboto_42e952','__Roboto_Fallback_42e952';
    font-weight: 500;
    font-size: 0.9375rem;
    line-height: 1.75;
    text-transform: uppercase;
    min-width: 64px;
    padding: 8px 22px;
    border-radius: 4px;
    -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    color: #fff;
    background-color: #7449fb;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    width: 100%;
    text-transform: none;
    border-radius: 16px;
    margin-top: 24px;
    margin-bottom: 16px;
}

.${stylePrefix}-input-group {
  position: relative;
  margin-bottom: 16px;
}
.${stylePrefix}-input-group label {
  position: absolute;
  top: 9px;
  left: 10px;
  font-size: 16px;
  color: #cdcdcd;
  font-weight: normal;
  padding: 2px 5px;
  z-index: 5;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.${stylePrefix}-input-group input {
  outline: none;
  display: block;
  width: 100%;
  height: 40px;
  position: relative;
  z-index: 3;
  border: 1px solid #d9d9d9;
  padding: 10px 10px;
  background: #ffffff;
  box-sizing: border-box;
  font-wieght: 400;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
  border-radius: 4px;
}


.${stylePrefix}-input-group.focused label {
  background: #fff;
  font-size: 12px;
  top: -8px;
  left: 5px;
  color: #7449fb;
}
.${stylePrefix}-input-group span.validate-tooltip {
  margin-top: 0;
}
.${stylePrefix}-wrapper {
  width: 400px;
  background: #fff;
  margin: 20px auto;
  min-height: 200px;
  border: 1px solid #f3f3f3;
}
.${stylePrefix}-wrapper .${stylePrefix}-inner-warpper {
  padding: 50px 30px 60px;
  box-shadow: 1px 1.732px 10px 0px rgba(0, 0, 0, 0.063);
}
.${stylePrefix}-wrapper .${stylePrefix}-title {
  margin-top: 0;
}
.${stylePrefix}-wrapper .${stylePrefix}-supporter {
  margin-top: 10px;
  font-size: 14px;
  color: #8E8E8E;
  cursor: pointer;
}

.wrongpass {
  display: none;
  color: rgb(215, 71, 71);
  font-style: normal;
  font-weight: 600;
  font-size: 100%;
  line-height: 33px;
  margin: 0%;
}

.${stylePrefix}-loader-s {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${stylePrefix}-spin 2s linear infinite;
  display: none;
}

@keyframes ${stylePrefix}-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.hide-loader {
  display: none;
}
 .pricing-table td {
  padding: 8px;
 }
 .pricing-table th {
  padding: 8px !important;
 }
 .${stylePrefix}-svg-inline {
    height: 1em;
  }

  .price-popup {
    cursor: pointer;
  }

  .${stylePrefix}-white-rounded-box {
    background: white;
    color: black;
    padding: 8px;
    border-radius: 16px;
    border: 2px solid rgb(130, 87, 254);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
  }

  .${stylePrefix}-underline-text-hover:hover {
    text-decoration: underline;
  }

  .${stylePrefix}-product-summary-card {
            background: #fff;
            border: 2px solid #e0d6ff;
            border-radius: 18px;
            box-shadow: 0 4px 12px rgba(196, 193, 246, 0.2);
            padding: 16px;
            min-width: 220px;
            max-width: 320px;
            margin: 0 auto;
            width: 100%;
        }

        .${stylePrefix}-product-summary-card-header {
            font-size: 18px;
            font-weight: 600;
            color: #222;
            text-align: center;
            margin-bottom: 16px;
        }

        .${stylePrefix}-product-summary-card-content {
            font-size: 24px;
            font-weight: 700;
            color: #222;
            text-align: center;
            height: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .${stylePrefix}-product-summary-rounded-btn {
            border-radius: 24px;
            padding: 8px 24px;
            background-color: #ffffff;
            text-decoration: none;
            color: #047cfe !important;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            display: block;
            border: 1px solid #e0d6ff;
            box-shadow: 0 4px 16px 0 rgba(123, 97, 255, 0.07);
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }

        .${stylePrefix}-product-summary {
            display: block;
            background: radial-gradient(circle at 50% 50%, #F2F4FC, #DAD9FF);
            padding: 16px;
            border-radius: 24px;
        }



`;

style.textContent = styleText;
const head = document.head || document.getElementsByTagName("head")[0];
if (head) {
  head.appendChild(style);
}
