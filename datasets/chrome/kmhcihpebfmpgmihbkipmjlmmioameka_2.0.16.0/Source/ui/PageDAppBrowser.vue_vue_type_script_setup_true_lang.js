import { d as defineComponent, f as onMounted, l as useTheme, m as createElementBlock, o as openBlock, p as createBaseVNode, v as createStaticVNode, aK as normalizeStyle, u as unref, aj as api, aM as el, dj as getDappFavorites, D as computed, e as ref, j as isIosApp, h as isAndroidApp, N as nextTick, P as networkId, dk as isPwaApp, dl as isSPAApp, cX as getObjRef, bE as forceSetLS, aN as sl, ad as dispatchSignalSync, aC as dispatchSignal, i as isPWAApp, d2 as isBetaApp, d3 as isStagingApp, cI as isBexApp, g as isMobileApp, a5 as useDarkMode, G as watch, w as useTranslation, x as useScreenSize, z as resolveComponent, c as createBlock, U as withModifiers, V as normalizeClass, y as withCtx, n as createVNode, B as toDisplayString, t as createCommentVNode, H as createTextVNode, aO as withKeys, ae as isRef, F as Fragment, S as renderList, $ as createSlots } from './index.js';
import { d7 as doForceSyncImportantAccounts, d8 as doReloadAccount, a6 as getPendingTxList, W as getOwnedCred, d9 as getPubKeyStake, da as getPubKeyDRep, aS as generatePlateHex, u as useDappAccount$1 } from './app2.js';
import { a as IconInfo, I as IconGlobe } from './IconInfo.js';
import { _ as _sfc_main$7 } from './PageHeader.vue_vue_type_script_setup_true_lang.js';
import { g as gsapWithCSS } from './index2.js';
import { D as DrawSVGPlugin } from './DrawSVGPlugin.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper.js';
import { j as cip30_getConnectedNetworkId, k as cip30_getNetworkId, l as cip30_enable, m as autoGrantWithCIP30List, n as extCip30, M as METHOD, o as cip30_getForcedUnusedAddresses, p as cip30_getLockedUtxos, q as cip30_getCollateral, r as cip30_getUtxos, s as cip30_getAmount, t as cip30_getPaginate, v as cip30_getChangeAddress, w as cip30_getRewardAddress, x as cip30_getRewardAddresses, y as cip30_getUnusedAddresses, z as cip30_getUsedAddresses, A as cip30_getBalance, B as cip30_submitTx, C as cip30_getTx } from './useSubmitTx.js';
import { g as errorNoNetworkId, h as errorInvalidArgument, i as errorUnsupportedExtensions, j as errorNoAccount, k as errorInternal, l as errorNoChangeAddr, m as errorNoRewardAddr, n as errorNoNetworkMagic, o as errorConnectionRefused, s as setApiRequest, q as errorTxUserDeclined, r as errorDataUserDeclined, t as errorNoOrigin, u as errorNotConnected, v as errorAccountChanged, w as getApiRequest } from './parse.js';
import { i as isSyncLeader, u as useDappAccount } from './appState.js';
import { g as getTranslate } from './useFormatter.js';
import { k as getNetworkMagic } from './chain.js';
import { u as useNotifications } from './useNotification.js';
import { u as useBiometricsAction } from './useBiometricsAction.js';
import { n as noLogo } from './image.js';
import { _ as _sfc_main$6 } from './Badges.vue_vue_type_script_setup_true_lang.js';
import { I as IconDelete02 } from './IconDelete02.js';

const _hoisted_1$5 = {
  id: "fx_dapp_browser_wrap",
  class: ""
};
const _hoisted_2$4 = {
  id: "fx_dapp_browser_svg_wrap",
  class: "w-full"
};
const _hoisted_3$4 = {
  id: "svg_ani",
  xmlns: "http://www.w3.org/2000/svg",
  "xml:space": "preserve",
  viewBox: "0 0 1280 480"
};
const _hoisted_4$4 = { id: "fx_dapp_browser_main" };
const _hoisted_5$4 = { id: "fx_dapp_browser_tf_dapp_browser" };
const _hoisted_6$3 = {
  id: "SVGID_00000098919523241709949340000001158742516701244570_",
  gradientUnits: "userSpaceOnUse",
  x1: "593.611",
  y1: "836.7405",
  x2: "904.989",
  y2: "314.3734",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_7$2 = {
  id: "SVGID_00000031191884409293730200000002887483264732859789_",
  gradientUnits: "userSpaceOnUse",
  x1: "599.9874",
  y1: "840.5414",
  x2: "911.3654",
  y2: "318.1743",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_8 = {
  id: "SVGID_00000094593152557148415820000005585538185409890437_",
  gradientUnits: "userSpaceOnUse",
  x1: "603.225",
  y1: "842.4714",
  x2: "914.603",
  y2: "320.1042",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_9 = {
  id: "SVGID_00000017502865421802294480000012566304975715583390_",
  gradientUnits: "userSpaceOnUse",
  x1: "609.0594",
  y1: "845.9492",
  x2: "920.4375",
  y2: "323.5821",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_10 = {
  id: "SVGID_00000183220365162206346290000012126459140169950142_",
  gradientUnits: "userSpaceOnUse",
  x1: "620.7167",
  y1: "852.8979",
  x2: "932.0947",
  y2: "330.5308",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_11 = {
  id: "SVGID_00000113338316653925454380000010823234798455766916_",
  gradientUnits: "userSpaceOnUse",
  x1: "624.8808",
  y1: "855.3802",
  x2: "936.2589",
  y2: "333.013",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_12 = {
  id: "SVGID_00000147929308674861755040000018188386709901529263_",
  gradientUnits: "userSpaceOnUse",
  x1: "629.101",
  y1: "857.8958",
  x2: "940.4791",
  y2: "335.5287",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_13 = {
  id: "SVGID_00000026871979492526744500000002777481536437467324_",
  gradientUnits: "userSpaceOnUse",
  x1: "636.4404",
  y1: "862.2708",
  x2: "947.8184",
  y2: "339.9036",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_14 = {
  id: "SVGID_00000083769748643957566520000016669061206038060417_",
  gradientUnits: "userSpaceOnUse",
  x1: "642.2294",
  y1: "865.7215",
  x2: "953.6074",
  y2: "343.3543",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_15 = {
  id: "SVGID_00000097468324596462780090000004275056344599733922_",
  gradientUnits: "userSpaceOnUse",
  x1: "647.6108",
  y1: "868.9293",
  x2: "958.9888",
  y2: "346.5621",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_16 = {
  id: "SVGID_00000165939368807522932510000018228262345413604744_",
  gradientUnits: "userSpaceOnUse",
  x1: "652.4748",
  y1: "871.8287",
  x2: "963.8528",
  y2: "349.4615",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_17 = { id: "fx_dapp_browser_dapp_dapp_1" };
const _hoisted_18 = {
  id: "SVGID_00000183224868504261507150000018021179945817229502_",
  gradientUnits: "userSpaceOnUse",
  x1: "477.7796",
  y1: "506.4207",
  x2: "1006.7395",
  y2: "510.6697",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_19 = {
  id: "SVGID_00000047781551528017894250000006716240135245313436_",
  gradientUnits: "userSpaceOnUse",
  x1: "476.6623",
  y1: "532.3544",
  x2: "1007.9423",
  y2: "534.7883",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_20 = { id: "fx_dapp_browser_dapp_dapp_0" };
const _hoisted_21 = {
  id: "SVGID_00000015350167034248907200000016601351789973330821_",
  gradientUnits: "userSpaceOnUse",
  x1: "298.9339",
  y1: "530.2042",
  x2: "827.9179",
  y2: "532.2371",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_22 = {
  id: "SVGID_00000134251877830646342340000018232392137661184417_",
  gradientUnits: "userSpaceOnUse",
  x1: "297.7993",
  y1: "574.3558",
  x2: "829.0723",
  y2: "576.7908",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_23 = {
  id: "SVGID_00000127738595879309035300000010580535893607595446_",
  gradientUnits: "userSpaceOnUse",
  x1: "294.2869",
  y1: "371.9517",
  x2: "780.1729",
  y2: "739.1297",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_24 = { id: "fx_dapp_browser_figure_wrap" };
const _hoisted_25 = {
  id: "SVGID_00000157297783160239336900000003295424201658660747_",
  gradientUnits: "userSpaceOnUse",
  x1: "297.2725",
  y1: "640.8558",
  x2: "241.5296",
  y2: "594.5258",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_26 = {
  id: "SVGID_00000114787287445602050130000006878901134746141873_",
  gradientUnits: "userSpaceOnUse",
  x1: "280.958",
  y1: "621.4166",
  x2: "252.755",
  y2: "604.3486",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_27 = {
  id: "SVGID_00000070094880239754582840000004615843211519934612_",
  gradientUnits: "userSpaceOnUse",
  x1: "339.3543",
  y1: "563.973",
  x2: "158.7763",
  y2: "668.1938",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_28 = {
  id: "SVGID_00000057112094430072739880000013130406074361990071_",
  gradientUnits: "userSpaceOnUse",
  x1: "296.75",
  y1: "571.8624",
  x2: "253.968",
  y2: "629.1365",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_29 = {
  id: "SVGID_00000019665534143964730440000013896057272909222544_",
  gradientUnits: "userSpaceOnUse",
  x1: "285.5253",
  y1: "594.2371",
  x2: "262.4673",
  y2: "617.2221",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_30 = {
  id: "SVGID_00000023242371957623111430000004550394846978856346_",
  gradientUnits: "userSpaceOnUse",
  x1: "283.6127",
  y1: "471.1226",
  x2: "216.3547",
  y2: "523.9406",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_31 = {
  id: "SVGID_00000173151495301893299360000013904627514016062362_",
  gradientUnits: "userSpaceOnUse",
  x1: "262.7933",
  y1: "473.5193",
  x2: "197.6964",
  y2: "528.9793",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_32 = {
  id: "SVGID_00000057828003417688925160000018218471198252974269_",
  gradientUnits: "userSpaceOnUse",
  x1: "318.0202",
  y1: "581.0303",
  x2: "158.8647",
  y2: "620.22",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_33 = {
  id: "SVGID_00000041256437524692476480000016176626765141833647_",
  gradientUnits: "userSpaceOnUse",
  x1: "315.3628",
  y1: "516.2969",
  x2: "197.9998",
  y2: "688.6229",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_34 = {
  id: "SVGID_00000112598478673782764490000013678197662992251557_",
  gradientUnits: "userSpaceOnUse",
  x1: "298.198",
  y1: "626.6207",
  x2: "184.141",
  y2: "651.5609",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _hoisted_35 = {
  id: "SVGID_00000087398677422582921790000009501780250161999284_",
  gradientUnits: "userSpaceOnUse",
  x1: "237.3723",
  y1: "638.9162",
  x2: "247.8803",
  y2: "641.5795",
  gradientTransform: "matrix(1 0 0 -1 0 740)"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FxDappBrowserPageDark",
  setup(__props) {
    gsapWithCSS.registerPlugin(DrawSVGPlugin);
    const {
      gradientBlue,
      gradientViolet,
      gradientRed,
      gradientOrange,
      gradientPurple,
      gradientYellow,
      gradientGreen
    } = useTheme();
    let gtl = gsapWithCSS.timeline({ paused: true });
    let cl = "";
    const play = () => {
      gtl.play("fadein");
    };
    onMounted(() => {
      var fac = 1e3;
      gtl.addLabel("start", cl + "+=0.00");
      cl = "start";
      gtl.set("#fx_dapp_browser_dapp_empty_left", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_dapp_empty_2", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_dapp_empty_1", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_dapp_empty_0", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_dapp_dapp_1", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_dapp_dapp_0", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_figure_wrap", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_sign_0_wrap", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_blokk_1", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_blokk_0", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_blokk_2_back", { y: -500 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_phone_base_wrap", { x: -1 * fac, y: 0.5 * fac }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_press_to_connect", { opacity: 0 }, cl + "+=0.00");
      gtl.set("#fx_dapp_browser_tf_dapp_browser", { opacity: 0 }, cl + "+=0.00");
      gtl.set(".fx_dapp_browser_white_lines", { drawSVG: 0 }, cl + "+=0.00");
      gtl.set(".fx_dapp_browser_white_lines_glow", { drawSVG: 0 }, cl + "+=0.00");
      gtl.addLabel("fadein", cl + "+=0.01");
      cl = "fadein";
      gtl.to("#fx_dapp_browser_phone_base_wrap", { duration: 1, x: 0, y: 0, ease: "power2.out" }, cl + "+=0.1");
      gtl.addLabel("phase0", cl + "+=0.2");
      cl = "phase0";
      gtl.to("#fx_dapp_browser_dapp_empty_left", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.00");
      gtl.to("#fx_dapp_browser_blokk_1", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.2");
      gtl.to("#fx_dapp_browser_blokk_0", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.3");
      gtl.to("#fx_dapp_browser_blokk_2_back", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.5");
      gtl.to("#fx_dapp_browser_dapp_empty_1", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.34");
      gtl.to("#fx_dapp_browser_dapp_empty_0", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.46");
      gtl.to("#fx_dapp_browser_dapp_empty_2", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.55");
      gtl.to("#fx_dapp_browser_dapp_dapp_0", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.58");
      gtl.to("#fx_dapp_browser_dapp_dapp_1", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.7");
      gtl.to("#fx_dapp_browser_sign_0_wrap", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.56");
      gtl.to("#fx_dapp_browser_figure_wrap", { duration: 1, y: 0, ease: "power4.out" }, cl + "+=0.56");
      gtl.to("#fx_dapp_browser_press_to_connect", { duration: 1, opacity: 1, ease: "power4.out" }, cl + "+=0.8");
      gtl.addLabel("phase1", cl + "+=1");
      cl = "phase1";
      gtl.fromTo(".fx_dapp_browser_white_lines", { drawSVG: "100% 100%" }, { duration: 2, ease: "power2.inOut", drawSVG: "0% 100% " }, cl + "+=0.00");
      gtl.to("#fx_dapp_browser_tf_dapp_browser", { duration: 0.4, opacity: 1, yoyo: true, repeat: 2, ease: "sine.inOut" }, cl + "+=0.3");
      gtl.to(".fx_dapp_browser_btn_connect", { duration: 0.5, fill: gradientYellow.value, repeat: 3, repeatDelay: 0, yoyo: true, ease: "sine.inOut" }, cl + "+=1.3");
      gtl.addLabel("phase2", cl + "+=1");
      cl = "phase2";
      gtl.fromTo("#fx_dapp_browser_white_lines_glow_0", { drawSVG: "110% 120%" }, { duration: 2, repeat: 2, ease: "power2.inOut", drawSVG: "50 15%" }, cl + "+=0.4");
      gtl.addLabel("phase3", cl + "+=0.8");
      cl = "phase3";
      gtl.fromTo("#fx_dapp_browser_white_lines_glow_1", { drawSVG: "0% -5%" }, { duration: 2, repeat: 2, ease: "power2.inOut", drawSVG: "100% 100%" }, cl + "+=0.0");
      gtl.fromTo("#fx_dapp_browser_white_lines_glow_2", { drawSVG: "0% -5%" }, { duration: 2, repeat: 2, ease: "power2.inOut", drawSVG: "100% 100%" }, cl + "+=0.8");
      gtl.to(".fx_dapp_browser_btn_connect", { duration: 0.2, fill: gradientGreen.value, repeat: 6, repeatDelay: 0, yoyo: true, ease: "sine.inOut" }, cl + "+=2");
      gtl.addLabel("fadeout", cl + "+=3");
      cl = "fadeout";
      gtl.seek("fadein");
      play();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createBaseVNode("div", _hoisted_2$4, [
          (openBlock(), createElementBlock("svg", _hoisted_3$4, [
            createBaseVNode("g", _hoisted_4$4, [
              _cache[56] || (_cache[56] = createStaticVNode('<g id="fx_dapp_browser_blokk_2_back" data-v-7037ceca><path class="fx_dapp_browser_st1" d="M1021.44,65.3c0-3.08,3.33-5,5.99-3.47l25.07,14.42c4.95,2.85,8,8.12,8.02,13.83l0.04,16.71\n              c0.01,3.08-3.33,5.01-6,3.48l-25.1-14.45c-4.96-2.86-8.02-8.14-8.02-13.87V65.3z" data-v-7037ceca></path><path d="M989.9,65.3c0-3.08,3.33-5,6-3.47l44.94,25.86c4.95,2.85,8,8.12,8.02,13.83l0.08,33.44c0.01,3.08-3.32,5.01-5.99,3.48\n              l-45.03-25.91c-4.96-2.86-8.02-8.14-8.02-13.87V65.3z" data-v-7037ceca></path><linearGradient id="fx_dapp_browser_SVGID_1_" gradientUnits="userSpaceOnUse" x1="974.6503" y1="702.848" x2="1439.5802" y2="48.4231" gradientTransform="matrix(1 0 0 -1 0 740)" data-v-7037ceca><stop offset="0" style="stop-color:#FFFFFF;" data-v-7037ceca></stop><stop offset="1" style="stop-color:#878787;" data-v-7037ceca></stop></linearGradient><path class="fx_dapp_browser_st2" d="M989.9,65.3c0-3.08,3.33-5,6-3.47l44.94,25.86c4.95,2.85,8,8.12,8.02,13.83l0.08,33.44\n              c0.01,3.08-3.32,5.01-5.99,3.48l-45.03-25.91c-4.96-2.86-8.02-8.14-8.02-13.87V65.3z" data-v-7037ceca></path><path class="fx_dapp_browser_st3" d="M954.22,65.3c0-3.08,3.32-5,5.99-3.47l53.62,30.86c4.95,2.85,8.01,8.12,8.02,13.83l0.11,40.75\n              c0,3.08-3.33,5.01-6,3.48l-53.73-30.92c-4.96-2.85-8.01-8.14-8.01-13.87V65.3z" data-v-7037ceca></path><path class="fx_dapp_browser_st0" d="M1001.72,128.64l-27.53-15.9l-2.63-1.52c-2.1-1.21-3.33-4.65-2.13-5.95l5.76-6.2\n              c1.03-1.11,3.23,0.15,4.26,2.46l0.14,0.31c1.03,2.31,3.23,3.57,4.26,2.46l5.06-5.45c1.03-1.11,3.23,0.15,4.26,2.46l10.68,23.83\n              C1005.05,127.83,1003.82,129.85,1001.72,128.64z" data-v-7037ceca></path><ellipse transform="matrix(0.866 -0.5 0.5 0.866 86.125 498.6999)" class="fx_dapp_browser_st0" cx="973.65" cy="88.64" rx="2.46" ry="4.26" data-v-7037ceca></ellipse></g><g id="fx_dapp_browser_white_lines_wrap" data-v-7037ceca><path id="white_line_0" class="fx_dapp_browser_white_lines" d="M570.12,185.35l-115.63-62.96c-2.89-1.57-7.42-1.54-10.23,0.08l-98.2,56.52" data-v-7037ceca></path><path id="white_line_1" class="fx_dapp_browser_white_lines" d="M1122.72,209.55l-59.21-34.97c-2.9-1.71-7.68-1.7-10.55,0.03l-107.82,64.83\n              l-32.76,19.4c-2.85,1.69-7.54,1.71-10.44,0.05l-47.57-27.27" data-v-7037ceca></path><path class="fx_dapp_browser_white_lines" d="M945.14,239.43l56.95,35.29" data-v-7037ceca></path><path id="fx_dapp_browser_white_lines_glow_0" class="fx_dapp_browser_white_lines_glow" d="M570.12,185.35l-115.63-62.96c-2.89-1.57-7.42-1.54-10.23,0.08l-98.2,56.52" data-v-7037ceca></path><path id="fx_dapp_browser_white_lines_glow_1" class="fx_dapp_browser_white_lines_glow" d="M1122.72,209.55l-59.21-34.97c-2.9-1.71-7.68-1.7-10.55,0.03l-107.82,64.83\n              l-32.76,19.4c-2.85,1.69-7.54,1.71-10.44,0.05l-47.57-27.27" data-v-7037ceca></path><path id="fx_dapp_browser_white_lines_glow_2" class="fx_dapp_browser_white_lines_glow" d="M945.14,239.43l56.95,35.29" data-v-7037ceca></path></g><g id="fx_dapp_browser_phone_base_wrap" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M946.32,201.98c-2.94,4.41-7.56,8.63-13.91,12.29L537,442.46c-21.39,12.35-53.75,13.7-72.26,2.97\n    l-173.13-99.99c-7.82-4.53-11.88-10.47-12.41-16.76l-0.03-0.03c-1.94-10.38,1.03-22.29,1.03-22.29l11.51,0.66v0.03\n    c1.56-1.16,3.22-2.28,5.07-3.35L692.18,75.53c21.39-12.35,53.75-13.7,72.26-2.97l173.16,99.99l13.16-0.69\n    c0,0,5.04,14.26-3.62,28.89c-0.07,0.09-0.1,0.16-0.16,0.22c-0.19,0.31-0.41,0.62-0.59,0.91\n    C946.36,201.91,946.32,201.95,946.32,201.98z" data-v-7037ceca></path><path class="fx_dapp_browser_st17" d="M939.71,157.13L766.58,57.14c-18.51-10.69-50.87-9.35-72.26,2.97L298.91,288.3\n    c-21.39,12.35-23.73,31.02-5.19,41.71L466.84,430c18.51,10.69,50.87,9.35,72.26-2.97l395.42-228.19\n    C955.9,186.49,958.25,167.82,939.71,157.13z" data-v-7037ceca></path><path class="fx_dapp_browser_st0" d="M499.86,426c11.6,0,23.17-2.53,32.02-7.63l400.1-230.07c5.16-2.97,8.01-7.07,8.01-11.51\n    c0-4.47-2.82-8.57-7.97-11.54l-26.99-15.63c-4.78-2.78-12.29-2.78-17.1-0.03c-3.54,2.03-9.54,2.03-13.07-0.03l-96.31-55.81\n    c-1.34-0.78-2.09-1.72-2.09-2.63c0-0.88,0.78-1.84,2.12-2.63c2.63-1.5,4.13-3.72,4.13-6.1c0-2.38-1.5-4.6-4.09-6.1l-12.79-7.41\n    c-17.7-10.26-46.56-10.32-64.29-0.13L301.41,298.83c-5.16,2.97-8.01,7.07-8.01,11.51s2.81,8.57,7.97,11.54l166.22,96.34\n    C476.47,423.4,488.17,426,499.86,426z" data-v-7037ceca></path><path class="fx_dapp_browser_st18" d="M808.07,95.9c1.08-0.63,1.08-1.64,0-2.27c-1.08-0.63-2.85-0.63-3.93,0c-1.08,0.63-1.08,1.64,0,2.27\n    C805.22,96.53,806.98,96.53,808.07,95.9z" data-v-7037ceca></path><path class="fx_dapp_browser_st19" d="M816.72,101.27l50.19,28.99" data-v-7037ceca></path><path class="fx_dapp_browser_st20" d="M869.56,246.55L869.56,246.55c0.79-0.46,1.52-1.2,2.05-2.04c0.53-0.85,0.83-1.76,0.83-2.54v-0.42\n    c0-0.83-0.31-1.38-0.82-1.67l0,0v0c-0.56-0.32-1.41-0.3-2.37,0.24l-17,9.81v0c-0.8,0.46-1.52,1.2-2.05,2.04\n    c-0.53,0.85-0.83,1.76-0.83,2.54v0.42c0,0.83,0.31,1.38,0.81,1.67l0.02,0.01l0.01,0.01c0.21,0.13,0.48,0.21,0.83,0.21\n    c0.44,0,0.97-0.14,1.52-0.46c0,0,0,0,0,0L869.56,246.55z" data-v-7037ceca></path><path class="fx_dapp_browser_st20" d="M841.97,255.86l-17,9.81l0,0c-0.79,0.46-1.52,1.2-2.05,2.04c-0.53,0.85-0.83,1.76-0.83,2.54v0.42\n    c0,0.83,0.31,1.38,0.82,1.67l0.01,0.01l0.01,0.01c0.21,0.13,0.48,0.21,0.83,0.21c0.44,0,0.97-0.14,1.53-0.46l0,0l17-9.81l0,0\n    c0.79-0.46,1.52-1.2,2.04-2.04c0.53-0.85,0.84-1.76,0.84-2.54v-0.42c0-0.83-0.31-1.38-0.82-1.67\n    C843.76,255.29,842.93,255.32,841.97,255.86z" data-v-7037ceca></path><path class="fx_dapp_browser_st20" d="M938.36,196.9v12.88" data-v-7037ceca></path><path class="fx_dapp_browser_st20" d="M929.37,202.16v13.55" data-v-7037ceca></path></g>', 3)),
              createBaseVNode("g", _hoisted_5$4, [
                _cache[0] || (_cache[0] = createBaseVNode("path", { d: "M712.02,115.9l-4.91-2.84l13.86-8l4.95,2.86c1.39,0.81,2.32,1.66,2.77,2.56c0.46,0.9,0.44,1.8-0.05,2.71\nc-0.49,0.91-1.45,1.78-2.89,2.61c-1.44,0.83-2.96,1.39-4.54,1.68c-1.58,0.29-3.15,0.3-4.72,0.03\nC714.91,117.25,713.43,116.71,712.02,115.9z M712.55,113.3l1.86,1.07c0.87,0.5,1.75,0.83,2.65,1c0.91,0.16,1.83,0.14,2.78-0.06\nc0.96-0.2,1.95-0.6,2.98-1.2c1.02-0.59,1.71-1.16,2.06-1.71c0.35-0.55,0.39-1.08,0.1-1.6c-0.28-0.52-0.86-1.03-1.72-1.53\nl-1.87-1.08L712.55,113.3z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_6$3, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[1] || (_cache[1] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000098919523241709949340000001158742516701244570_)" },
                  d: "M712.02,115.9l-4.91-2.84l13.86-8\nl4.95,2.86c1.39,0.81,2.32,1.66,2.77,2.56c0.46,0.9,0.44,1.8-0.05,2.71c-0.49,0.91-1.45,1.78-2.89,2.61\nc-1.44,0.83-2.96,1.39-4.54,1.68c-1.58,0.29-3.15,0.3-4.72,0.03C714.91,117.25,713.43,116.71,712.02,115.9z M712.55,113.3\nl1.86,1.07c0.87,0.5,1.75,0.83,2.65,1c0.91,0.16,1.83,0.14,2.78-0.06c0.96-0.2,1.95-0.6,2.98-1.2c1.02-0.59,1.71-1.16,2.06-1.71\nc0.35-0.55,0.39-1.08,0.1-1.6c-0.28-0.52-0.86-1.03-1.72-1.53l-1.87-1.08L712.55,113.3z"
                }, null, -1)),
                _cache[2] || (_cache[2] = createBaseVNode("path", { d: "M722.58,121.99l-3.14-1.81l18.64-5.24l3.78,2.18l-9.08,10.76l-3.14-1.81l7.22-8.18l-0.11-0.06L722.58,121.99z\nM727.83,118.73l7.41,4.28l-2.29,1.32l-7.42-4.28L727.83,118.73z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_7$2, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[3] || (_cache[3] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000031191884409293730200000002887483264732859789_)" },
                  d: "M722.58,121.99l-3.14-1.81l18.64-5.24\nl3.78,2.18l-9.08,10.76l-3.14-1.81l7.22-8.18l-0.11-0.06L722.58,121.99z M727.83,118.73l7.41,4.28l-2.29,1.32l-7.42-4.28\nL727.83,118.73z"
                }, null, -1)),
                _cache[4] || (_cache[4] = createBaseVNode("path", { d: "M730.49,131.06l14.29-8.25l2.84,1.64l-1.74,1.01l0.13,0.07c0.41-0.09,0.87-0.15,1.4-0.18c0.54-0.03,1.1,0.01,1.68,0.12\nc0.59,0.11,1.18,0.34,1.76,0.67c0.76,0.44,1.26,0.96,1.5,1.56c0.25,0.6,0.17,1.23-0.24,1.91c-0.41,0.68-1.2,1.36-2.4,2.05\nc-1.16,0.67-2.32,1.13-3.5,1.37c-1.16,0.25-2.27,0.3-3.32,0.17c-1.04-0.13-1.96-0.43-2.75-0.88c-0.56-0.32-0.94-0.65-1.15-0.98\nc-0.2-0.33-0.29-0.65-0.26-0.95c0.04-0.31,0.13-0.58,0.29-0.82l-0.09-0.05l-5.56,3.21L730.49,131.06z M742.4,127.44\nc-0.62,0.36-1.07,0.72-1.36,1.08c-0.29,0.36-0.4,0.71-0.33,1.05c0.07,0.33,0.34,0.63,0.8,0.9c0.47,0.27,0.99,0.43,1.58,0.46\nc0.59,0.04,1.19-0.03,1.82-0.2c0.64-0.17,1.26-0.43,1.86-0.78c0.6-0.35,1.04-0.7,1.33-1.06c0.29-0.36,0.4-0.71,0.33-1.04\nc-0.07-0.34-0.34-0.64-0.81-0.91c-0.47-0.27-0.99-0.43-1.56-0.47c-0.57-0.04-1.17,0.02-1.79,0.18S743.02,127.08,742.4,127.44z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_8, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[5] || (_cache[5] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000094593152557148415820000005585538185409890437_)" },
                  d: "M730.49,131.06l14.29-8.25l2.84,1.64\nl-1.74,1.01l0.13,0.07c0.41-0.09,0.87-0.15,1.4-0.18c0.54-0.03,1.1,0.01,1.68,0.12c0.59,0.11,1.18,0.34,1.76,0.67\nc0.76,0.44,1.26,0.96,1.5,1.56c0.25,0.6,0.17,1.23-0.24,1.91c-0.41,0.68-1.2,1.36-2.4,2.05c-1.16,0.67-2.32,1.13-3.5,1.37\nc-1.16,0.25-2.27,0.3-3.32,0.17c-1.04-0.13-1.96-0.43-2.75-0.88c-0.56-0.32-0.94-0.65-1.15-0.98c-0.2-0.33-0.29-0.65-0.26-0.95\nc0.04-0.31,0.13-0.58,0.29-0.82l-0.09-0.05l-5.56,3.21L730.49,131.06z M742.4,127.44c-0.62,0.36-1.07,0.72-1.36,1.08\nc-0.29,0.36-0.4,0.71-0.33,1.05c0.07,0.33,0.34,0.63,0.8,0.9c0.47,0.27,0.99,0.43,1.58,0.46c0.59,0.04,1.19-0.03,1.82-0.2\nc0.64-0.17,1.26-0.43,1.86-0.78c0.6-0.35,1.04-0.7,1.33-1.06c0.29-0.36,0.4-0.71,0.33-1.04c-0.07-0.34-0.34-0.64-0.81-0.91\nc-0.47-0.27-0.99-0.43-1.56-0.47c-0.57-0.04-1.17,0.02-1.79,0.18S743.02,127.08,742.4,127.44z"
                }, null, -1)),
                _cache[6] || (_cache[6] = createBaseVNode("path", { d: "M742.55,138.02l14.29-8.25l2.84,1.64l-1.74,1.01l0.13,0.07c0.41-0.09,0.87-0.15,1.4-0.18c0.54-0.03,1.1,0.01,1.68,0.12\nc0.59,0.11,1.18,0.34,1.76,0.67c0.76,0.44,1.26,0.96,1.5,1.56c0.25,0.6,0.17,1.23-0.24,1.91c-0.41,0.68-1.2,1.36-2.4,2.05\nc-1.16,0.67-2.33,1.13-3.5,1.37c-1.16,0.24-2.27,0.3-3.32,0.17c-1.04-0.13-1.96-0.43-2.75-0.88c-0.56-0.32-0.94-0.65-1.15-0.98\nc-0.2-0.33-0.29-0.65-0.26-0.95c0.04-0.31,0.13-0.58,0.29-0.82l-0.09-0.05l-5.56,3.21L742.55,138.02z M754.46,134.4\nc-0.62,0.36-1.07,0.72-1.36,1.08c-0.29,0.36-0.4,0.71-0.33,1.05c0.07,0.33,0.34,0.63,0.8,0.9c0.47,0.27,0.99,0.43,1.58,0.46\nc0.59,0.04,1.19-0.03,1.82-0.2c0.64-0.17,1.26-0.43,1.86-0.78c0.6-0.35,1.04-0.7,1.33-1.06c0.29-0.36,0.4-0.71,0.33-1.04\nc-0.07-0.34-0.34-0.64-0.81-0.91c-0.47-0.27-0.99-0.43-1.56-0.47c-0.57-0.04-1.17,0.02-1.79,0.18S755.08,134.04,754.46,134.4z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_9, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[7] || (_cache[7] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000017502865421802294480000012566304975715583390_)" },
                  d: "M742.55,138.02l14.29-8.25l2.84,1.64\nl-1.74,1.01l0.13,0.07c0.41-0.09,0.87-0.15,1.4-0.18c0.54-0.03,1.1,0.01,1.68,0.12c0.59,0.11,1.18,0.34,1.76,0.67\nc0.76,0.44,1.26,0.96,1.5,1.56c0.25,0.6,0.17,1.23-0.24,1.91c-0.41,0.68-1.2,1.36-2.4,2.05c-1.16,0.67-2.33,1.13-3.5,1.37\nc-1.16,0.24-2.27,0.3-3.32,0.17c-1.04-0.13-1.96-0.43-2.75-0.88c-0.56-0.32-0.94-0.65-1.15-0.98c-0.2-0.33-0.29-0.65-0.26-0.95\nc0.04-0.31,0.13-0.58,0.29-0.82l-0.09-0.05l-5.56,3.21L742.55,138.02z M754.46,134.4c-0.62,0.36-1.07,0.72-1.36,1.08\nc-0.29,0.36-0.4,0.71-0.33,1.05c0.07,0.33,0.34,0.63,0.8,0.9c0.47,0.27,0.99,0.43,1.58,0.46c0.59,0.04,1.19-0.03,1.82-0.2\nc0.64-0.17,1.26-0.43,1.86-0.78c0.6-0.35,1.04-0.7,1.33-1.06c0.29-0.36,0.4-0.71,0.33-1.04c-0.07-0.34-0.34-0.64-0.81-0.91\nc-0.47-0.27-0.99-0.43-1.56-0.47c-0.57-0.04-1.17,0.02-1.79,0.18S755.08,134.04,754.46,134.4z"
                }, null, -1)),
                _cache[8] || (_cache[8] = createBaseVNode("path", { d: "M762.96,145.31l13.86-8l5.55,3.2c1.02,0.59,1.72,1.17,2.1,1.73c0.37,0.57,0.47,1.11,0.27,1.61\nc-0.19,0.51-0.63,0.96-1.32,1.36c-0.54,0.31-1.13,0.52-1.76,0.64c-0.62,0.11-1.25,0.13-1.89,0.06c-0.63-0.07-1.24-0.21-1.83-0.43\nl-0.14,0.08c0.51,0.32,0.85,0.69,1.04,1.11c0.19,0.43,0.18,0.87-0.03,1.32c-0.2,0.45-0.65,0.87-1.33,1.27\nc-0.73,0.42-1.57,0.7-2.51,0.82c-0.94,0.12-1.93,0.07-2.97-0.14c-1.04-0.22-2.08-0.62-3.12-1.22L762.96,145.31z M768.29,145.62\nl2.39,1.38c0.81,0.47,1.56,0.72,2.25,0.76c0.69,0.03,1.3-0.1,1.82-0.4c0.38-0.22,0.63-0.47,0.74-0.75s0.07-0.56-0.1-0.85\nc-0.18-0.29-0.5-0.57-0.97-0.84l-2.45-1.42L768.29,145.62z M773.95,142.35l2.17,1.25c0.4,0.23,0.83,0.4,1.28,0.5\nc0.46,0.1,0.91,0.12,1.36,0.08c0.44-0.04,0.85-0.17,1.21-0.38c0.5-0.29,0.73-0.62,0.68-1.01c-0.05-0.38-0.39-0.76-1.04-1.13\nl-2.23-1.28L773.95,142.35z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_10, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[9] || (_cache[9] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000183220365162206346290000012126459140169950142_)" },
                  d: "M762.96,145.31l13.86-8l5.55,3.2\nc1.02,0.59,1.72,1.17,2.1,1.73c0.37,0.57,0.47,1.11,0.27,1.61c-0.19,0.51-0.63,0.96-1.32,1.36c-0.54,0.31-1.13,0.52-1.76,0.64\nc-0.62,0.11-1.25,0.13-1.89,0.06c-0.63-0.07-1.24-0.21-1.83-0.43l-0.14,0.08c0.51,0.32,0.85,0.69,1.04,1.11\nc0.19,0.43,0.18,0.87-0.03,1.32c-0.2,0.45-0.65,0.87-1.33,1.27c-0.73,0.42-1.57,0.7-2.51,0.82c-0.94,0.12-1.93,0.07-2.97-0.14\nc-1.04-0.22-2.08-0.62-3.12-1.22L762.96,145.31z M768.29,145.62l2.39,1.38c0.81,0.47,1.56,0.72,2.25,0.76\nc0.69,0.03,1.3-0.1,1.82-0.4c0.38-0.22,0.63-0.47,0.74-0.75s0.07-0.56-0.1-0.85c-0.18-0.29-0.5-0.57-0.97-0.84l-2.45-1.42\nL768.29,145.62z M773.95,142.35l2.17,1.25c0.4,0.23,0.83,0.4,1.28,0.5c0.46,0.1,0.91,0.12,1.36,0.08c0.44-0.04,0.85-0.17,1.21-0.38\nc0.5-0.29,0.73-0.62,0.68-1.01c-0.05-0.38-0.39-0.76-1.04-1.13l-2.23-1.28L773.95,142.35z"
                }, null, -1)),
                _cache[10] || (_cache[10] = createBaseVNode("path", { d: "M775.51,152.55l10.39-6l2.79,1.61l-1.81,1.05l0.11,0.06c0.83-0.26,1.64-0.36,2.41-0.29c0.78,0.07,1.46,0.27,2.05,0.6\nc0.14,0.08,0.29,0.18,0.44,0.29c0.14,0.11,0.27,0.21,0.36,0.3l-2.56,1.48c-0.09-0.1-0.24-0.23-0.45-0.39\nc-0.21-0.16-0.41-0.29-0.61-0.41c-0.42-0.24-0.89-0.41-1.41-0.5c-0.51-0.09-1.03-0.09-1.55-0.02c-0.51,0.08-0.98,0.24-1.4,0.48\nl-5.88,3.4L775.51,152.55z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_11, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[11] || (_cache[11] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000113338316653925454380000010823234798455766916_)" },
                  d: "M775.51,152.55l10.39-6l2.79,1.61\nl-1.81,1.05l0.11,0.06c0.83-0.26,1.64-0.36,2.41-0.29c0.78,0.07,1.46,0.27,2.05,0.6c0.14,0.08,0.29,0.18,0.44,0.29\nc0.14,0.11,0.27,0.21,0.36,0.3l-2.56,1.48c-0.09-0.1-0.24-0.23-0.45-0.39c-0.21-0.16-0.41-0.29-0.61-0.41\nc-0.42-0.24-0.89-0.41-1.41-0.5c-0.51-0.09-1.03-0.09-1.55-0.02c-0.51,0.08-0.98,0.24-1.4,0.48l-5.88,3.4L775.51,152.55z"
                }, null, -1)),
                _cache[12] || (_cache[12] = createBaseVNode("path", { d: "M787.31,159.6c-1.05-0.61-1.74-1.26-2.06-1.96c-0.31-0.7-0.27-1.4,0.12-2.11c0.39-0.71,1.12-1.37,2.18-1.98\nc1.08-0.62,2.22-1.04,3.44-1.27c1.22-0.23,2.44-0.25,3.65-0.07c1.22,0.18,2.35,0.58,3.4,1.18c1.05,0.61,1.73,1.26,2.04,1.96\nc0.32,0.7,0.29,1.4-0.1,2.11c-0.39,0.7-1.12,1.36-2.2,1.98c-1.06,0.62-2.2,1.04-3.43,1.26c-1.21,0.22-2.43,0.24-3.65,0.06\nC789.49,160.6,788.36,160.21,787.31,159.6z M789.56,158.32c0.47,0.28,1.01,0.43,1.6,0.46c0.6,0.03,1.21-0.05,1.85-0.23\nc0.64-0.18,1.26-0.44,1.86-0.79c0.61-0.35,1.06-0.71,1.37-1.08c0.31-0.37,0.45-0.72,0.4-1.07c-0.04-0.34-0.31-0.65-0.78-0.93\nc-0.49-0.28-1.03-0.43-1.63-0.47c-0.6-0.03-1.22,0.04-1.87,0.22c-0.63,0.18-1.25,0.44-1.86,0.79c-0.6,0.35-1.06,0.71-1.37,1.08\nc-0.31,0.37-0.43,0.73-0.39,1.07C788.8,157.73,789.07,158.04,789.56,158.32z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_12, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[13] || (_cache[13] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000147929308674861755040000018188386709901529263_)" },
                  d: "M787.31,159.6\nc-1.05-0.61-1.74-1.26-2.06-1.96c-0.31-0.7-0.27-1.4,0.12-2.11c0.39-0.71,1.12-1.37,2.18-1.98c1.08-0.62,2.22-1.04,3.44-1.27\nc1.22-0.23,2.44-0.25,3.65-0.07c1.22,0.18,2.35,0.58,3.4,1.18c1.05,0.61,1.73,1.26,2.04,1.96c0.32,0.7,0.29,1.4-0.1,2.11\nc-0.39,0.7-1.12,1.36-2.2,1.98c-1.06,0.62-2.2,1.04-3.43,1.26c-1.21,0.22-2.43,0.24-3.65,0.06\nC789.49,160.6,788.36,160.21,787.31,159.6z M789.56,158.32c0.47,0.28,1.01,0.43,1.6,0.46c0.6,0.03,1.21-0.05,1.85-0.23\nc0.64-0.18,1.26-0.44,1.86-0.79c0.61-0.35,1.06-0.71,1.37-1.08c0.31-0.37,0.45-0.72,0.4-1.07c-0.04-0.34-0.31-0.65-0.78-0.93\nc-0.49-0.28-1.03-0.43-1.63-0.47c-0.6-0.03-1.22,0.04-1.87,0.22c-0.63,0.18-1.25,0.44-1.86,0.79c-0.6,0.35-1.06,0.71-1.37,1.08\nc-0.31,0.37-0.43,0.73-0.39,1.07C788.8,157.73,789.07,158.04,789.56,158.32z"
                }, null, -1)),
                _cache[14] || (_cache[14] = createBaseVNode("path", { d: "M796.29,164.55l7.57-7.63l2.91,1.68l-5.37,4.96l0.1,0.05l8.66-3.06l2.86,1.65l-5.24,4.99l0.09,0.05l8.52-3.09l2.91,1.68\nl-13.21,4.37l-3.05-1.76l4.75-4.8l-0.13-0.08l-8.32,2.74L796.29,164.55z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_13, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[15] || (_cache[15] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000026871979492526744500000002777481536437467324_)" },
                  d: "M796.29,164.55l7.57-7.63l2.91,1.68\nl-5.37,4.96l0.1,0.05l8.66-3.06l2.86,1.65l-5.24,4.99l0.09,0.05l8.52-3.09l2.91,1.68l-13.21,4.37l-3.05-1.76l4.75-4.8l-0.13-0.08\nl-8.32,2.74L796.29,164.55z"
                }, null, -1)),
                _cache[16] || (_cache[16] = createBaseVNode("path", { d: "M826.52,173.43l-2.8-1.43c0.18-0.16,0.29-0.33,0.32-0.52c0.04-0.19-0.01-0.39-0.15-0.59c-0.12-0.2-0.35-0.4-0.69-0.59\nc-0.45-0.26-0.92-0.42-1.41-0.49c-0.49-0.07-0.9-0.02-1.21,0.16c-0.24,0.14-0.36,0.32-0.33,0.54c0.03,0.21,0.23,0.49,0.61,0.83\nl1.5,1.31c0.81,0.7,1.22,1.33,1.26,1.88s-0.32,1.04-1.07,1.48c-0.68,0.39-1.48,0.62-2.39,0.69c-0.91,0.07-1.86-0.02-2.84-0.25\nc-0.98-0.24-1.92-0.61-2.82-1.13c-1.38-0.79-2.18-1.59-2.43-2.4c-0.23-0.8,0.08-1.53,0.93-2.18l2.98,1.55\nc-0.33,0.29-0.44,0.6-0.34,0.91c0.12,0.32,0.43,0.62,0.94,0.92c0.51,0.29,1.01,0.47,1.51,0.54c0.51,0.07,0.93,0.01,1.24-0.17\nc0.26-0.15,0.36-0.34,0.31-0.56c-0.04-0.22-0.25-0.49-0.61-0.8l-1.44-1.25c-0.81-0.7-1.21-1.34-1.21-1.92\nc0.01-0.57,0.4-1.08,1.18-1.53c0.67-0.38,1.42-0.61,2.27-0.68c0.84-0.07,1.73,0.01,2.65,0.24c0.92,0.23,1.83,0.6,2.72,1.12\nc1.31,0.76,2.07,1.51,2.26,2.27C827.67,172.11,827.35,172.8,826.52,173.43z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_14, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[17] || (_cache[17] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000083769748643957566520000016669061206038060417_)" },
                  d: "M826.52,173.43l-2.8-1.43\nc0.18-0.16,0.29-0.33,0.32-0.52c0.04-0.19-0.01-0.39-0.15-0.59c-0.12-0.2-0.35-0.4-0.69-0.59c-0.45-0.26-0.92-0.42-1.41-0.49\nc-0.49-0.07-0.9-0.02-1.21,0.16c-0.24,0.14-0.36,0.32-0.33,0.54c0.03,0.21,0.23,0.49,0.61,0.83l1.5,1.31\nc0.81,0.7,1.22,1.33,1.26,1.88s-0.32,1.04-1.07,1.48c-0.68,0.39-1.48,0.62-2.39,0.69c-0.91,0.07-1.86-0.02-2.84-0.25\nc-0.98-0.24-1.92-0.61-2.82-1.13c-1.38-0.79-2.18-1.59-2.43-2.4c-0.23-0.8,0.08-1.53,0.93-2.18l2.98,1.55\nc-0.33,0.29-0.44,0.6-0.34,0.91c0.12,0.32,0.43,0.62,0.94,0.92c0.51,0.29,1.01,0.47,1.51,0.54c0.51,0.07,0.93,0.01,1.24-0.17\nc0.26-0.15,0.36-0.34,0.31-0.56c-0.04-0.22-0.25-0.49-0.61-0.8l-1.44-1.25c-0.81-0.7-1.21-1.34-1.21-1.92\nc0.01-0.57,0.4-1.08,1.18-1.53c0.67-0.38,1.42-0.61,2.27-0.68c0.84-0.07,1.73,0.01,2.65,0.24c0.92,0.23,1.83,0.6,2.72,1.12\nc1.31,0.76,2.07,1.51,2.26,2.27C827.67,172.11,827.35,172.8,826.52,173.43z"
                }, null, -1)),
                _cache[18] || (_cache[18] = createBaseVNode("path", { d: "M825.68,181.75c-1.07-0.62-1.77-1.27-2.11-1.97c-0.33-0.7-0.3-1.39,0.08-2.09c0.39-0.7,1.13-1.37,2.23-2\nc1.06-0.62,2.21-1.04,3.43-1.27c1.23-0.23,2.44-0.25,3.64-0.08c1.21,0.18,2.33,0.56,3.35,1.15c0.68,0.4,1.21,0.83,1.58,1.3\nc0.38,0.47,0.57,0.96,0.57,1.46c0.01,0.51-0.19,1.03-0.61,1.56c-0.41,0.52-1.05,1.04-1.94,1.55l-0.79,0.46l-8.77-5.07l1.78-1.03\nl6.06,3.5c0.42-0.24,0.7-0.5,0.84-0.79s0.14-0.58,0-0.87c-0.13-0.29-0.41-0.56-0.83-0.8c-0.44-0.25-0.93-0.42-1.47-0.5\nc-0.53-0.08-1.06-0.08-1.59,0.01c-0.52,0.08-0.99,0.24-1.4,0.48l-1.7,0.98c-0.52,0.3-0.87,0.61-1.05,0.93\nc-0.18,0.33-0.2,0.65-0.05,0.97c0.15,0.32,0.47,0.62,0.95,0.9c0.32,0.18,0.66,0.33,1.01,0.43c0.36,0.1,0.72,0.15,1.09,0.16\ns0.74-0.04,1.1-0.13l2.49,1.64c-0.78,0.29-1.61,0.45-2.51,0.49c-0.89,0.03-1.8-0.06-2.72-0.29\nC827.42,182.61,826.54,182.25,825.68,181.75z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_15, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[19] || (_cache[19] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000097468324596462780090000004275056344599733922_)" },
                  d: "M825.68,181.75\nc-1.07-0.62-1.77-1.27-2.11-1.97c-0.33-0.7-0.3-1.39,0.08-2.09c0.39-0.7,1.13-1.37,2.23-2c1.06-0.62,2.21-1.04,3.43-1.27\nc1.23-0.23,2.44-0.25,3.64-0.08c1.21,0.18,2.33,0.56,3.35,1.15c0.68,0.4,1.21,0.83,1.58,1.3c0.38,0.47,0.57,0.96,0.57,1.46\nc0.01,0.51-0.19,1.03-0.61,1.56c-0.41,0.52-1.05,1.04-1.94,1.55l-0.79,0.46l-8.77-5.07l1.78-1.03l6.06,3.5\nc0.42-0.24,0.7-0.5,0.84-0.79s0.14-0.58,0-0.87c-0.13-0.29-0.41-0.56-0.83-0.8c-0.44-0.25-0.93-0.42-1.47-0.5\nc-0.53-0.08-1.06-0.08-1.59,0.01c-0.52,0.08-0.99,0.24-1.4,0.48l-1.7,0.98c-0.52,0.3-0.87,0.61-1.05,0.93\nc-0.18,0.33-0.2,0.65-0.05,0.97c0.15,0.32,0.47,0.62,0.95,0.9c0.32,0.18,0.66,0.33,1.01,0.43c0.36,0.1,0.72,0.15,1.09,0.16\ns0.74-0.04,1.1-0.13l2.49,1.64c-0.78,0.29-1.61,0.45-2.51,0.49c-0.89,0.03-1.8-0.06-2.72-0.29\nC827.42,182.61,826.54,182.25,825.68,181.75z"
                }, null, -1)),
                _cache[20] || (_cache[20] = createBaseVNode("path", { d: "M832.53,185.48l10.4-6l2.79,1.61l-1.81,1.05l0.1,0.06c0.84-0.26,1.64-0.36,2.42-0.29c0.78,0.06,1.46,0.27,2.04,0.6\nc0.15,0.08,0.29,0.18,0.44,0.29s0.27,0.21,0.37,0.3l-2.56,1.48c-0.09-0.1-0.24-0.23-0.45-0.39c-0.21-0.16-0.41-0.29-0.61-0.41\nc-0.43-0.24-0.9-0.41-1.42-0.5c-0.5-0.09-1.02-0.09-1.54-0.01c-0.51,0.08-0.98,0.24-1.4,0.48l-5.88,3.4L832.53,185.48z" }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_16, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[21] || (_cache[21] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000165939368807522932510000018228262345413604744_)" },
                  d: "M832.53,185.48l10.4-6l2.79,1.61\nl-1.81,1.05l0.1,0.06c0.84-0.26,1.64-0.36,2.42-0.29c0.78,0.06,1.46,0.27,2.04,0.6c0.15,0.08,0.29,0.18,0.44,0.29\ns0.27,0.21,0.37,0.3l-2.56,1.48c-0.09-0.1-0.24-0.23-0.45-0.39c-0.21-0.16-0.41-0.29-0.61-0.41c-0.43-0.24-0.9-0.41-1.42-0.5\nc-0.5-0.09-1.02-0.09-1.54-0.01c-0.51,0.08-0.98,0.24-1.4,0.48l-5.88,3.4L832.53,185.48z"
                }, null, -1))
              ]),
              _cache[57] || (_cache[57] = createStaticVNode('<g id="fx_dapp_browser_dapp_empty_left" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M263.9,213.64c-0.89-0.54-1.49-1.35-1.8-2.25l-0.26-86.83l18.69-1l98.25,1.1v85.19\n    c0,1.45-0.67,2.89-2.02,3.71l-17.89,10.99l-14.61,8.98l-16.35,10.04c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.01\n    l-0.01-0.01l-14.23-8.74L263.9,213.64z" data-v-7037ceca></path><path class="fx_dapp_browser_st21" d="M327.91,90.92l49.1,30.02c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0l-14.06-8.6l-19.28-11.8v0.02l-0.01-0.01l-14.29-8.74l-1.3-0.8\n    c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54c0-1.48,0.69-2.96,2.07-3.8l48.91-29.91\n    C317.31,88.01,323.16,88.01,327.91,90.92z" data-v-7037ceca></path></g><g id="fx_dapp_browser_dapp_empty_2" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M599.51,168.2c-0.89-0.54-1.49-1.35-1.8-2.25l-0.26-5.71l18.69-1l98.24,1.1v4.08c0,1.45-0.67,2.89-2.01,3.71\n    l-17.89,10.99l-14.61,8.98l-16.35,10.05c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.01l-0.01-0.01l-14.23-8.74\n    L599.51,168.2z" data-v-7037ceca></path><path class="fx_dapp_browser_st0" d="M686.23,225.21c-0.89-0.54-1.49-1.35-1.8-2.26l-0.26-16.05l18.69-1l98.24,1.1v14.42\n    c0,1.45-0.67,2.89-2.01,3.71l-17.9,10.99l-14.61,8.98l-16.35,10.05c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.02\n    l-0.01-0.01L687.53,226L686.23,225.21z" data-v-7037ceca></path><path class="fx_dapp_browser_st21" d="M663.51,125.38l49.1,30.01c1.35,0.83,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0l-14.06-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.29-8.74l-1.3-0.8\n    c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54c0-1.48,0.69-2.95,2.07-3.8l48.91-29.92\n    C652.91,122.48,658.76,122.48,663.51,125.38z" data-v-7037ceca></path><path class="fx_dapp_browser_st0" d="M507.36,222.54c-0.89-0.55-1.49-1.35-1.8-2.25l-0.26-56.24l18.69-1l98.25,1.1v54.61\n    c0,1.44-0.67,2.89-2.01,3.71l-17.89,10.99l-14.61,8.98l-16.35,10.04c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.01\n    l-0.01-0.01l-14.23-8.74L507.36,222.54z" data-v-7037ceca></path></g><g id="fx_dapp_browser_dapp_empty_1" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M599.76,274.14c-0.89-0.55-1.49-1.35-1.8-2.26l-0.26-5.71l18.69-1l98.24,1.1v4.08c0,1.45-0.67,2.89-2.01,3.71\n    l-17.89,10.99l-14.61,8.98l-16.35,10.05c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.02l-0.01-0.01l-14.23-8.74\n    L599.76,274.14z" data-v-7037ceca></path><path class="fx_dapp_browser_st21" d="M663.76,231.33l49.1,30.02c1.35,0.82,2.02,2.27,2.02,3.71s-0.67,2.89-2.02,3.71l-17.97,10.98l-14.67,8.97\n    l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0l-14.06-8.6l-19.27-11.8v0.02l-0.01-0.01l-14.29-8.74l-1.3-0.8\n    c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.5-0.26-1.02-0.26-1.54c0-1.48,0.69-2.95,2.07-3.8l48.91-29.91\n    C653.17,228.43,659.02,228.42,663.76,231.33z" data-v-7037ceca></path></g><g id="fx_dapp_browser_dapp_empty_0" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M416.17,277.46c-0.89-0.55-1.49-1.35-1.8-2.25l-0.26-5.71l18.69-1l98.24,1.1v4.08c0,1.45-0.67,2.89-2.01,3.71\n    l-17.89,10.99l-14.61,8.98l-16.35,10.04c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.02L431.7,287l-14.23-8.74\n    L416.17,277.46z" data-v-7037ceca></path><path class="fx_dapp_browser_st21" d="M480.17,234.64l49.1,30.01c1.35,0.82,2.02,2.27,2.02,3.71c0,1.45-0.67,2.89-2.02,3.71l-17.97,10.99\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0l-14.06-8.6l-19.27-11.8v0.02l-0.01-0.01l-14.29-8.74l-1.3-0.8\n    c-0.89-0.55-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54c0-1.48,0.69-2.95,2.07-3.8l48.91-29.91\n    C469.58,231.74,475.42,231.74,480.17,234.64z" data-v-7037ceca></path></g>', 4)),
              createBaseVNode("g", _hoisted_17, [
                createBaseVNode("linearGradient", _hoisted_18, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[22] || (_cache[22] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000183224868504261507150000018021179945817229502_)", "fill-opacity": "0.14" },
                  d: "M686.23,225.21\n    c-0.89-0.54-1.49-1.35-1.8-2.26l-0.26-16.05l18.69-1l98.24,1.1v14.42c0,1.45-0.67,2.89-2.01,3.71l-17.9,10.99l-14.61,8.98\n    l-16.35,10.05c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.02l-0.01-0.01L687.53,226L686.23,225.21z"
                }, null, -1)),
                _cache[23] || (_cache[23] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st23",
                  d: "M750.23,172.71l49.1,30.02c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0l-14.06-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.29-8.74l-1.3-0.8\n    c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54c0-1.48,0.69-2.96,2.07-3.8l48.91-29.91\n    C739.64,169.81,745.48,169.81,750.23,172.71z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_19, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[24] || (_cache[24] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000047781551528017894250000006716240135245313436_)" },
                  d: "M750.23,172.71l49.1,30.02\n    c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0\n    l-14.06-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.29-8.74l-1.3-0.8c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54\n    c0-1.48,0.69-2.96,2.07-3.8l48.91-29.91C739.64,169.81,745.48,169.81,750.23,172.71z"
                }, null, -1)),
                _cache[25] || (_cache[25] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M728.47,199.86c0.55-0.87,1.4-1.63,2.38-2.35c3.66-2.69,8.52-3.87,14.33-3.77c4.14,0.07,7.76,0.94,10.72,2.62\n    c2.97,1.69,5.92,3.39,8.84,5.11c2.68,1.57,3.04,4,0.9,5.7c-2.49,1.98-7.22,2.42-10.62,0.99c-0.54-0.23-1.04-0.48-1.51-0.75\n    c-2.91-1.68-5.71-3.44-8.77-5.03c-4.29-2.24-9.36-3.21-15.2-2.62c-0.32,0.03-0.63,0.09-0.94,0.13\n    C728.58,199.9,728.55,199.89,728.47,199.86z"
                }, null, -1)),
                _cache[26] || (_cache[26] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M750.31,207.88c-2.39-0.31-4.64-0.57-6.86-0.9c-3.94-0.57-7.28,0.02-10.12,1.69\n    c-1.62,0.95-3.25,1.9-4.91,2.83c-2.97,1.66-7.75,1.67-10.62,0.04c-2.87-1.64-2.88-4.45,0.04-6.16c1.55-0.91,3.01-1.87,4.88-2.59\n    c5.83-2.24,14.49-2,19.82,0.59c2.72,1.32,5.07,2.87,7.61,4.3C750.18,207.7,750.2,207.75,750.31,207.88z"
                }, null, -1))
              ]),
              createBaseVNode("g", _hoisted_20, [
                createBaseVNode("linearGradient", _hoisted_21, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[27] || (_cache[27] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000015350167034248907200000016601351789973330821_)", "fill-opacity": "0.14" },
                  d: "M507.36,222.54\n    c-0.89-0.55-1.49-1.35-1.8-2.25l-0.26-56.24l18.69-1l98.25,1.1v54.61c0,1.44-0.67,2.89-2.01,3.71l-17.89,10.99l-14.61,8.98\n    l-16.35,10.04c-4.73,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.01l-0.01-0.01l-14.23-8.74L507.36,222.54z"
                }, null, -1)),
                _cache[28] || (_cache[28] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st23",
                  d: "M571.37,130.71l49.1,30.02c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0l-14.06-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.29-8.74l-1.3-0.8\n    c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54c0-1.48,0.69-2.96,2.07-3.8l48.91-29.91\n    C560.77,127.81,566.62,127.81,571.37,130.71z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_22, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[29] || (_cache[29] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000134251877830646342340000018232392137661184417_)" },
                  d: "M571.37,130.71l49.1,30.02\n    c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0\n    l-14.06-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.29-8.74l-1.3-0.8c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54\n    c0-1.48,0.69-2.96,2.07-3.8l48.91-29.91C560.77,127.81,566.62,127.81,571.37,130.71z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_23, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[30] || (_cache[30] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000127738595879309035300000010580535893607595446_)" },
                  d: "M571.37,130.71l49.1,30.02\n    c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.59,2.9-15.34,0\n    l-14.06-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.29-8.74l-1.3-0.8c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.49-0.26-1.02-0.26-1.54\n    c0-1.48,0.69-2.96,2.07-3.8l48.91-29.91C560.77,127.81,566.62,127.81,571.37,130.71z"
                }, null, -1)),
                _cache[31] || (_cache[31] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M569.78,148.49c-10.56,0.44-18.96,3.51-24.03,5.86c-2.15,1-1.4,2.93,1.22,3.43l1.47,0.28\n    c1.78,0.34,3.77-0.13,4.66-1.08c0.53-0.56,1.22-1.29,2.1-2.21c2.1-2.19,8.66-1.49,13.34-0.53c1.65,0.34,3.61,0.08,4.34-0.84\n    c1.79-2.28,0.34-3.84-1.21-4.61C571.16,148.54,570.46,148.46,569.78,148.49z"
                }, null, -1)),
                _cache[32] || (_cache[32] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M585.78,157.31c-10.24-0.46-18.7,0.54-23.83,1.54c-2.15,0.42-2.74,1.9-1.36,2.94l0.37,0.28\n    c1.42,1.07,4.26,1.16,5.9,0.2c0.62-0.36,1.35-0.79,2.2-1.28c3.05-1.77,9.03-0.06,13.08,1.6c1.43,0.59,3.43,0.65,4.57-0.12\n    c2.68-1.82,2.21-3.49,1.18-4.49C587.46,157.56,586.63,157.35,585.78,157.31z"
                }, null, -1)),
                _cache[33] || (_cache[33] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M544.38,173.99c9.15,5.29,22.97,5.88,30.85,1.33c7.89-4.55,6.86-12.53-2.3-17.81\n    c-9.15-5.29-22.97-5.88-30.85-1.33C534.2,160.73,535.23,168.7,544.38,173.99z M569.36,168.79c0.05-0.19-0.17-0.38-0.51-0.41\n    c-0.33-0.03-0.65,0.1-0.7,0.29c-0.17,0.6,0,1.51,1.05,2.3c1.06,0.8,2.94,1.45,6.04,1.6c0.34,0.02,0.63-0.13,0.66-0.32\n    c0.03-0.19-0.22-0.37-0.56-0.38c-2.84-0.14-4.37-0.72-5.17-1.33C569.35,169.93,569.23,169.23,569.36,168.79z M554.37,159.99\n    c0.33,0.05,0.52,0.24,0.44,0.43c-0.25,0.56-0.24,1.46,0.66,2.3c0.89,0.84,2.71,1.67,6.23,2.04c0.33,0.04,0.55,0.22,0.49,0.41\n    c-0.06,0.19-0.38,0.32-0.71,0.29c-3.78-0.4-5.94-1.32-7.06-2.36c-1.11-1.03-1.13-2.14-0.81-2.85\n    C553.71,160.06,554.04,159.95,554.37,159.99z M565.63,170.09c-0.22,0.27-2.38,0.89-4.03,0.38l-2.09,1.21\n    c0.02,0.3,0.45,0.69,1.26,0.95c0.83,0.27,1.93,0.35,2.98,0.07c0.31-0.08,0.67,0,0.81,0.17c0.14,0.18,0.01,0.39-0.3,0.47\n    c-1.46,0.39-2.97,0.26-4.09-0.1c-0.91-0.29-1.66-0.77-1.85-1.32c-1.56-0.25-2.5-0.9-3.03-1.6c-0.57-0.75-0.7-1.57-0.64-2.11\n    c0.02-0.19,0.31-0.34,0.65-0.33c0.34,0.01,0.6,0.18,0.58,0.37c-0.04,0.46,0.07,1.16,0.54,1.78c0.42,0.54,1.09,1,2.15,1.19\n    l2.12-1.22c-1.07-0.9-0.17-2.41,1.1-2.14C563.49,168.24,565.88,169.79,565.63,170.09z"
                }, null, -1))
              ]),
              _cache[58] || (_cache[58] = createStaticVNode('<g id="fx_dapp_browser_blokk_1" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M1108.76,240.94c-0.89-0.54-1.49-1.35-1.8-2.25l-0.26-88.51l18.68-1l98.25,1.1v86.88\n    c0,1.44-0.67,2.89-2.01,3.71l-17.9,10.99l-14.61,8.98l-16.35,10.04c-4.72,2.9-10.55,2.9-15.27,0l-14-8.6l-19.19-11.81v0.01\n    l-0.02-0.01l-14.23-8.74L1108.76,240.94z" data-v-7037ceca></path><path class="fx_dapp_browser_st21" d="M1172.76,116.19l49.1,30.01c1.35,0.82,2.02,2.27,2.02,3.71c0,1.44-0.67,2.89-2.02,3.71l-17.97,10.99\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.6,2.9-15.34,0l-14.07-8.6l-19.27-11.8v0.01l-0.01-0.01l-14.3-8.74l-1.3-0.8\n    c-0.89-0.54-1.49-1.35-1.81-2.25c-0.17-0.5-0.26-1.02-0.26-1.54c0-1.48,0.69-2.95,2.07-3.8l48.91-29.91\n    C1162.16,113.29,1168.01,113.29,1172.76,116.19z" data-v-7037ceca></path></g><g id="fx_dapp_browser_blokk_0" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M952.91,304.04c-0.89-0.55-1.49-1.35-1.8-2.26l-0.26-46.56l18.69-1l98.24,1.1v44.93\n    c0,1.45-0.67,2.89-2.01,3.71l-17.89,10.99l-14.61,8.98l-16.35,10.05c-4.73,2.9-10.55,2.9-15.28,0l-14-8.6l-19.19-11.81v0.01\n    l-0.01-0.01l-14.23-8.74L952.91,304.04z" data-v-7037ceca></path><path class="fx_dapp_browser_st21" d="M1016.91,221.27l49.1,30.01c1.35,0.82,2.03,2.27,2.03,3.71c0,1.44-0.68,2.89-2.03,3.71l-17.97,10.98\n    l-14.67,8.97l-16.42,10.04c-4.75,2.9-10.6,2.9-15.34,0l-14.07-8.6l-19.27-11.8v0.02l-0.01-0.01l-14.29-8.74l-1.31-0.8\n    c-0.89-0.55-1.49-1.35-1.8-2.25c-0.18-0.49-0.27-1.02-0.27-1.54c0-1.48,0.69-2.95,2.07-3.8l48.91-29.91\n    C1006.32,218.37,1012.16,218.37,1016.91,221.27z" data-v-7037ceca></path></g><g id="fx_dapp_browser_sign_0_wrap" data-v-7037ceca><path class="fx_dapp_browser_st16" d="M562.84,87.57c-0.02-0.12-7.15-0.4-7.23-0.3v8.07c0,1.81-0.39,3.6-1.15,5.24c-0.47,1.02-0.25,2.24,0.55,3.03\n    l1.88,1.86l4.75-5.51c0.02-0.04,0.04-0.08,0.04-0.12l-0.44-5.87v-0.02L562.84,87.57z" data-v-7037ceca></path><path class="fx_dapp_browser_st16" d="M525.33,65.19l43.47-25.1c1.08-0.62,2.08-0.72,2.83-0.4l5.39,2.72c0.14,0.08,0.16,0.26,0.06,0.36\n    l-10.16,10.74c-0.04,0.04-0.06,0.1-0.06,0.16v17.75c0,2.84-2,6.29-4.45,7.71l-6.49,3.73c-0.16,0.22-0.3,0.42-0.46,0.64\n    c-0.32,1.88-2.12,9.7-10.08,15.14c-0.32,0.22-0.52-0.1-0.32-0.48c1.04-2,3.01-6.31,2.42-9.7c-0.34-0.14-0.38-0.16-0.72-0.3\n    l-13.4,7.75c-0.04,0.02-0.08,0.06-0.1,0.12l-5.59,14.94c-0.06,0.14-0.22,0.2-0.34,0.12l-5.29-2.68c-0.72-0.48-1.16-1.42-1.16-2.72\n    V72.92C520.88,70.06,522.87,66.61,525.33,65.19z" data-v-7037ceca></path><path class="fx_dapp_browser_st30" d="M530.74,68.07l43.59-25.16c2.4-1.38,4.33-0.26,4.33,2.5v32.91c0,2.76-1.94,6.13-4.33,7.51l-6.71,3.87\n    c-0.16,0.1-0.3,0.32-0.34,0.52c-0.3,1.76-2.04,9.7-10.08,15.22c-0.32,0.22-0.52-0.1-0.32-0.48c1.08-2.06,3.15-6.61,2.34-10.06\n    c-0.04-0.16-0.2-0.22-0.36-0.12L530.74,111c-2.4,1.38-4.33,0.26-4.33-2.5V75.6C526.41,72.82,528.35,69.47,530.74,68.07z" data-v-7037ceca></path><path class="fx_dapp_browser_st0" d="M554.38,86.86l0.44-0.06c0.29-0.07,0.57-0.29,0.74-0.6l7.12-13.04c0.25-0.45,0.2-0.96-0.12-1.27\n    c-0.29-0.28-0.71-0.32-1.08-0.1l-2.27,1.31v-8.43c0-0.35-0.16-0.64-0.44-0.8c-0.28-0.16-0.61-0.15-0.92,0.03l-7.02,4.05\n    c-0.36,0.22-0.63,0.66-0.63,1.09v9.26l-2.99,1.73c-0.36,0.2-0.61,0.63-0.63,1.05c-0.02,0.33,0.13,0.63,0.38,0.8L554.38,86.86z" data-v-7037ceca></path></g><g id="fx_dapp_browser_press_to_connect" data-v-7037ceca><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M306.33,110.85l6.3-3.64l2.48,1.43c0.48,0.28,0.79,0.56,0.95,0.86c0.16,0.3,0.16,0.59,0.02,0.88\n    c-0.14,0.29-0.42,0.55-0.84,0.79c-0.42,0.24-0.88,0.4-1.38,0.48c-0.5,0.08-1.01,0.07-1.53-0.02c-0.52-0.09-1.02-0.28-1.5-0.56\n    l-1.58-0.91l1.07-0.62l1.37,0.79c0.26,0.15,0.51,0.24,0.77,0.29c0.26,0.04,0.51,0.05,0.75,0c0.24-0.04,0.47-0.12,0.68-0.25\n    c0.21-0.12,0.35-0.25,0.42-0.39c0.08-0.14,0.07-0.28-0.01-0.43c-0.08-0.15-0.25-0.3-0.51-0.44l-0.9-0.52l-5.21,3.01L306.33,110.85z\n    " data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M311.91,114.08l4.72-2.73l1.27,0.73l-0.82,0.48l0.05,0.03c0.38-0.12,0.75-0.16,1.1-0.13\n    c0.36,0.03,0.67,0.12,0.93,0.27c0.07,0.04,0.13,0.08,0.2,0.13c0.07,0.05,0.12,0.09,0.17,0.13l-1.16,0.67\n    c-0.04-0.05-0.11-0.11-0.21-0.18c-0.09-0.07-0.19-0.13-0.28-0.18c-0.19-0.11-0.41-0.19-0.64-0.22c-0.23-0.04-0.47-0.04-0.7-0.01\n    c-0.23,0.04-0.45,0.11-0.64,0.22l-2.67,1.54L311.91,114.08z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M317.3,117.29c-0.49-0.28-0.81-0.58-0.96-0.89c-0.15-0.32-0.14-0.63,0.04-0.95c0.18-0.32,0.51-0.62,1.01-0.91\n    c0.49-0.28,1.01-0.47,1.56-0.57c0.56-0.1,1.11-0.11,1.66-0.04c0.55,0.08,1.06,0.26,1.52,0.52c0.31,0.18,0.55,0.38,0.72,0.59\n    c0.17,0.21,0.26,0.43,0.26,0.66c0,0.23-0.09,0.47-0.28,0.71c-0.19,0.24-0.48,0.47-0.88,0.71l-0.36,0.21l-3.99-2.3l0.81-0.47\n    l2.76,1.59c0.19-0.11,0.32-0.23,0.38-0.36c0.06-0.13,0.06-0.26,0-0.39c-0.06-0.13-0.18-0.25-0.38-0.36\n    c-0.2-0.12-0.42-0.19-0.67-0.23c-0.24-0.04-0.48-0.03-0.72,0.01c-0.24,0.04-0.45,0.11-0.64,0.22l-0.77,0.44\n    c-0.23,0.14-0.39,0.28-0.48,0.43c-0.08,0.15-0.09,0.3-0.02,0.44c0.07,0.14,0.21,0.28,0.43,0.41c0.15,0.08,0.3,0.15,0.46,0.19\n    c0.16,0.05,0.33,0.07,0.5,0.07c0.17,0,0.33-0.02,0.5-0.06l1.13,0.75c-0.35,0.13-0.73,0.21-1.14,0.22c-0.4,0.01-0.82-0.03-1.24-0.13\n    C318.09,117.68,317.69,117.52,317.3,117.29z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M327.72,119.3l-1.27-0.65c0.08-0.07,0.13-0.15,0.14-0.24c0.02-0.09-0.01-0.18-0.07-0.27\n    c-0.06-0.09-0.16-0.18-0.31-0.27c-0.2-0.12-0.42-0.19-0.64-0.22c-0.22-0.03-0.41-0.01-0.55,0.08c-0.11,0.06-0.16,0.15-0.15,0.24\n    c0.01,0.1,0.1,0.22,0.28,0.38l0.68,0.59c0.36,0.32,0.55,0.6,0.57,0.85c0.02,0.25-0.15,0.48-0.49,0.67\n    c-0.31,0.18-0.67,0.28-1.09,0.31c-0.41,0.03-0.84-0.01-1.29-0.11c-0.44-0.11-0.87-0.28-1.28-0.51c-0.62-0.36-0.99-0.72-1.1-1.09\n    c-0.11-0.36,0.03-0.69,0.42-0.99l1.36,0.7c-0.15,0.13-0.2,0.27-0.15,0.42c0.05,0.14,0.19,0.28,0.43,0.42\n    c0.23,0.13,0.46,0.21,0.69,0.24c0.23,0.03,0.42,0.01,0.56-0.08c0.12-0.07,0.16-0.15,0.14-0.26c-0.02-0.1-0.11-0.22-0.28-0.37\n    l-0.65-0.57c-0.37-0.32-0.55-0.61-0.55-0.87c0-0.26,0.18-0.49,0.54-0.7c0.3-0.18,0.65-0.28,1.03-0.31c0.38-0.03,0.79,0.01,1.2,0.11\n    c0.42,0.11,0.83,0.27,1.24,0.51c0.6,0.34,0.94,0.69,1.03,1.03C328.24,118.71,328.1,119.02,327.72,119.3z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M332.58,122.11l-1.27-0.65c0.08-0.07,0.13-0.15,0.14-0.24c0.02-0.09-0.01-0.18-0.07-0.27\n    c-0.06-0.09-0.16-0.18-0.31-0.27c-0.2-0.12-0.42-0.19-0.64-0.22c-0.22-0.03-0.41-0.01-0.55,0.08c-0.11,0.06-0.16,0.15-0.15,0.24\n    c0.01,0.1,0.1,0.22,0.28,0.38l0.68,0.59c0.36,0.32,0.55,0.61,0.57,0.86c0.02,0.25-0.15,0.47-0.49,0.67\n    c-0.31,0.18-0.67,0.28-1.09,0.31c-0.41,0.03-0.85-0.01-1.29-0.11c-0.44-0.11-0.87-0.28-1.28-0.51c-0.62-0.36-0.99-0.72-1.1-1.09\n    c-0.11-0.36,0.03-0.7,0.42-0.99l1.36,0.71c-0.15,0.13-0.2,0.27-0.15,0.42c0.05,0.14,0.19,0.28,0.43,0.42\n    c0.23,0.13,0.46,0.21,0.69,0.24c0.23,0.03,0.42,0,0.56-0.08c0.12-0.07,0.16-0.15,0.14-0.26c-0.02-0.1-0.11-0.22-0.28-0.37\n    l-0.66-0.57c-0.37-0.32-0.55-0.61-0.55-0.87c0-0.26,0.18-0.49,0.53-0.7c0.3-0.18,0.65-0.28,1.03-0.31\n    c0.39-0.03,0.79,0.01,1.21,0.11c0.42,0.11,0.83,0.28,1.24,0.51c0.6,0.35,0.94,0.69,1.03,1.03\n    C333.1,121.51,332.96,121.83,332.58,122.11z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M337.13,122.63l1.1-0.63l5.17,2.99l-1.1,0.63l-1.93-1.11l-5.2,3l-1.32-0.76l5.2-3L337.13,122.63z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M339.28,129.99c-0.48-0.28-0.79-0.57-0.93-0.89c-0.14-0.32-0.12-0.64,0.05-0.96c0.18-0.32,0.51-0.62,0.99-0.9\n    c0.49-0.28,1.01-0.47,1.56-0.57c0.56-0.1,1.11-0.11,1.66-0.03c0.55,0.08,1.07,0.26,1.55,0.54c0.48,0.28,0.79,0.57,0.93,0.89\n    c0.15,0.32,0.13,0.64-0.05,0.96c-0.18,0.32-0.51,0.62-1,0.9c-0.48,0.28-1,0.47-1.56,0.57c-0.55,0.1-1.11,0.11-1.66,0.03\n    C340.28,130.44,339.76,130.26,339.28,129.99z M340.31,129.4c0.22,0.13,0.46,0.2,0.73,0.21c0.27,0.01,0.55-0.02,0.84-0.1\n    c0.29-0.08,0.57-0.2,0.85-0.36c0.27-0.16,0.48-0.32,0.62-0.49c0.14-0.17,0.2-0.33,0.18-0.49c-0.02-0.16-0.14-0.3-0.36-0.42\n    c-0.22-0.13-0.47-0.2-0.74-0.21c-0.27-0.01-0.55,0.02-0.85,0.1c-0.29,0.08-0.57,0.2-0.84,0.36c-0.28,0.16-0.48,0.32-0.62,0.49\n    c-0.14,0.17-0.2,0.33-0.17,0.49C339.96,129.13,340.09,129.28,340.31,129.4z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M303.87,118.71l-1.35-0.78c0.15-0.11,0.25-0.23,0.31-0.36c0.06-0.12,0.08-0.25,0.06-0.37\n    c-0.02-0.12-0.09-0.25-0.19-0.37c-0.1-0.12-0.24-0.23-0.42-0.33c-0.33-0.19-0.69-0.31-1.1-0.35c-0.4-0.05-0.82-0.02-1.26,0.08\n    c-0.44,0.1-0.88,0.28-1.31,0.53c-0.45,0.26-0.76,0.51-0.93,0.77c-0.17,0.25-0.21,0.5-0.13,0.73c0.09,0.23,0.29,0.44,0.61,0.62\n    c0.18,0.1,0.37,0.18,0.57,0.24c0.2,0.06,0.41,0.1,0.61,0.12c0.21,0.01,0.42,0.01,0.63-0.02c0.21-0.03,0.42-0.08,0.61-0.16\n    l1.34,0.78c-0.32,0.15-0.69,0.26-1.1,0.33c-0.4,0.07-0.83,0.1-1.27,0.09c-0.44-0.01-0.88-0.08-1.33-0.19\n    c-0.44-0.11-0.86-0.29-1.27-0.52c-0.56-0.32-0.94-0.69-1.12-1.09c-0.19-0.4-0.17-0.81,0.06-1.24c0.23-0.43,0.68-0.83,1.37-1.23\n    c0.69-0.4,1.4-0.66,2.14-0.79c0.74-0.13,1.46-0.14,2.15-0.03c0.7,0.11,1.32,0.32,1.88,0.64c0.36,0.21,0.65,0.44,0.86,0.67\n    c0.21,0.24,0.34,0.49,0.38,0.74c0.05,0.25,0.01,0.5-0.13,0.75C304.42,118.23,304.19,118.47,303.87,118.71z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M302.75,122.89c-0.48-0.28-0.79-0.57-0.93-0.89c-0.14-0.32-0.12-0.64,0.05-0.96c0.18-0.32,0.51-0.62,0.99-0.9\n    c0.49-0.28,1.01-0.47,1.56-0.57c0.55-0.1,1.11-0.11,1.66-0.03c0.55,0.08,1.07,0.26,1.55,0.54c0.48,0.28,0.79,0.57,0.93,0.89\n    c0.15,0.32,0.13,0.64-0.05,0.96c-0.18,0.32-0.51,0.62-1,0.9c-0.48,0.28-1,0.47-1.56,0.57c-0.55,0.1-1.11,0.11-1.66,0.03\n    C303.74,123.35,303.23,123.17,302.75,122.89z M303.77,122.31c0.22,0.13,0.46,0.19,0.73,0.21c0.27,0.01,0.55-0.02,0.84-0.1\n    c0.29-0.08,0.57-0.2,0.85-0.36c0.27-0.16,0.48-0.32,0.62-0.49c0.14-0.17,0.2-0.33,0.18-0.48c-0.02-0.16-0.14-0.3-0.36-0.42\n    c-0.22-0.13-0.47-0.2-0.74-0.21c-0.27-0.01-0.56,0.02-0.85,0.1c-0.29,0.08-0.57,0.2-0.85,0.36c-0.27,0.16-0.48,0.32-0.62,0.49\n    c-0.14,0.17-0.2,0.33-0.17,0.49C303.43,122.04,303.55,122.18,303.77,122.31z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M310.06,123.85l-2.73,1.58l-1.31-0.76l4.72-2.73l1.25,0.72l-0.83,0.48l0.05,0.03\n    c0.38-0.1,0.77-0.12,1.18-0.07c0.41,0.05,0.79,0.17,1.14,0.38c0.33,0.19,0.54,0.4,0.64,0.62c0.1,0.22,0.08,0.45-0.05,0.68\n    c-0.13,0.23-0.38,0.45-0.74,0.66l-3.01,1.74l-1.31-0.76l2.77-1.6c0.29-0.17,0.44-0.34,0.46-0.52c0.01-0.18-0.11-0.35-0.37-0.5\n    c-0.18-0.1-0.37-0.17-0.58-0.2c-0.21-0.03-0.42-0.03-0.65,0.01C310.47,123.66,310.26,123.74,310.06,123.85z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M315.45,126.96l-2.73,1.58l-1.31-0.76l4.72-2.73l1.25,0.72l-0.83,0.48l0.06,0.03\n    c0.38-0.1,0.77-0.12,1.18-0.07c0.41,0.05,0.79,0.17,1.14,0.38c0.33,0.19,0.54,0.4,0.64,0.62c0.1,0.22,0.09,0.45-0.05,0.68\n    c-0.13,0.23-0.38,0.45-0.74,0.66l-3.01,1.74l-1.31-0.76l2.77-1.6c0.29-0.17,0.44-0.34,0.46-0.52c0.01-0.18-0.11-0.35-0.37-0.5\n    c-0.18-0.1-0.37-0.17-0.58-0.2c-0.21-0.03-0.42-0.03-0.65,0.01C315.86,126.77,315.65,126.85,315.45,126.96z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M318.85,132.19c-0.49-0.28-0.81-0.58-0.96-0.89c-0.15-0.32-0.14-0.63,0.04-0.95\n    c0.18-0.32,0.51-0.62,1.01-0.91c0.49-0.28,1.01-0.47,1.56-0.58c0.56-0.1,1.11-0.11,1.65-0.04c0.55,0.08,1.06,0.26,1.52,0.52\n    c0.31,0.18,0.55,0.38,0.72,0.59c0.17,0.21,0.26,0.43,0.26,0.67c0,0.23-0.09,0.47-0.28,0.71c-0.19,0.24-0.48,0.47-0.88,0.71\n    l-0.36,0.21l-3.99-2.3l0.81-0.47l2.76,1.59c0.19-0.11,0.31-0.23,0.38-0.36c0.06-0.13,0.06-0.26,0-0.39\n    c-0.06-0.13-0.18-0.25-0.38-0.36c-0.2-0.12-0.42-0.19-0.67-0.22c-0.24-0.04-0.48-0.03-0.72,0c-0.24,0.04-0.45,0.11-0.64,0.22\n    l-0.77,0.44c-0.23,0.13-0.39,0.28-0.48,0.43c-0.08,0.15-0.09,0.3-0.02,0.44c0.07,0.14,0.21,0.28,0.43,0.41\n    c0.15,0.08,0.3,0.15,0.46,0.2c0.16,0.05,0.33,0.07,0.49,0.07c0.17,0,0.33-0.02,0.5-0.06l1.13,0.75c-0.35,0.13-0.73,0.21-1.14,0.22\n    c-0.4,0.01-0.82-0.03-1.24-0.13C319.65,132.58,319.24,132.41,318.85,132.19z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M324.01,135.17c-0.48-0.28-0.8-0.58-0.94-0.9c-0.14-0.32-0.12-0.64,0.06-0.96c0.18-0.32,0.51-0.62,0.99-0.89\n    c0.48-0.28,1-0.47,1.55-0.57c0.56-0.1,1.11-0.11,1.66-0.03c0.55,0.08,1.07,0.26,1.55,0.53c0.41,0.24,0.7,0.49,0.86,0.76\n    c0.16,0.26,0.2,0.53,0.1,0.79c-0.09,0.26-0.31,0.5-0.65,0.72l-1.24-0.71c0.2-0.16,0.3-0.32,0.29-0.49c0-0.17-0.12-0.32-0.36-0.46\n    c-0.2-0.12-0.43-0.19-0.7-0.21c-0.26-0.02-0.53,0-0.83,0.07c-0.29,0.07-0.59,0.19-0.89,0.36c-0.3,0.17-0.52,0.35-0.65,0.51\n    c-0.13,0.17-0.17,0.33-0.13,0.48c0.04,0.15,0.16,0.29,0.37,0.4c0.15,0.09,0.32,0.15,0.49,0.18c0.18,0.03,0.37,0.04,0.57,0.02\n    c0.2-0.02,0.39-0.07,0.58-0.16l1.24,0.71c-0.38,0.2-0.8,0.32-1.25,0.38c-0.45,0.06-0.9,0.04-1.36-0.05\n    C324.87,135.57,324.43,135.41,324.01,135.17z" data-v-7037ceca></path><path class="fx_dapp_browser_btn_connect fx_dapp_browser_st31" d="M334.29,135.54l-0.99,0.57l-2.84-1.64l0.98-0.57L334.29,135.54z M333.22,133.62l1.31,0.76l-4.4,2.54\n    c-0.12,0.07-0.2,0.14-0.23,0.2c-0.03,0.06-0.02,0.12,0.02,0.17c0.04,0.05,0.11,0.11,0.19,0.16c0.06,0.04,0.13,0.07,0.2,0.1\n    c0.07,0.03,0.13,0.05,0.17,0.07l-0.77,0.68c-0.09-0.03-0.2-0.07-0.35-0.12c-0.15-0.05-0.31-0.13-0.49-0.22\n    c-0.33-0.17-0.56-0.36-0.7-0.55c-0.14-0.19-0.17-0.38-0.1-0.58c0.07-0.19,0.26-0.38,0.58-0.56L333.22,133.62z" data-v-7037ceca></path></g>', 4)),
              createBaseVNode("g", _hoisted_24, [
                _cache[34] || (_cache[34] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M260.85,120.61c0,0,4.38-0.46,6.84-0.3c1.32,0.09,2.18,0.26,4.03,1.74c0.86,0.69,1.42,1.29,1.15,1.82\n        c-0.12,0.24-0.58-0.24-0.58-0.24s0.98,0.87,0.73,1.55c-0.26,0.68-0.78-0.08-0.78-0.08s1.08,0.97,0.78,1.63\n        c-0.29,0.66-0.85-0.15-0.85-0.15s0.9,0.85,0.75,1.43c-0.15,0.58-0.51,0.46-1.22,0.02c-0.84-0.52-2.81-1.68-4.63-1.78\n        c-1.94-0.11-3.31,0.78-4.59-0.13c-1.28-0.91-3.34-0.78-3.34-0.78L260.85,120.61z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_25, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[35] || (_cache[35] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000157297783160239336900000003295424201658660747_)", "fill-opacity": "0.24" },
                  d: "\n        M260.85,120.61c0,0,4.38-0.46,6.84-0.3c1.32,0.09,2.18,0.26,4.03,1.74c0.86,0.69,1.42,1.29,1.15,1.82\n        c-0.12,0.24-0.58-0.24-0.58-0.24s0.98,0.87,0.73,1.55c-0.26,0.68-0.78-0.08-0.78-0.08s1.08,0.97,0.78,1.63\n        c-0.29,0.66-0.85-0.15-0.85-0.15s0.9,0.85,0.75,1.43c-0.15,0.58-0.51,0.46-1.22,0.02c-0.84-0.52-2.81-1.68-4.63-1.78\n        c-1.94-0.11-3.31,0.78-4.59-0.13c-1.28-0.91-3.34-0.78-3.34-0.78L260.85,120.61z"
                }, null, -1)),
                _cache[36] || (_cache[36] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M262.34,126c1.52,1.2,2.66,2.12,3.48,2.95c0.87,0.89,1.86,1.69,2.3,1.22c0.87-0.92-2.91-4.57-2.91-4.57\n        L262.34,126z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_26, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[37] || (_cache[37] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000114787287445602050130000006878901134746141873_)", "fill-opacity": "0.24" },
                  d: "\n        M262.34,126c1.52,1.2,2.66,2.12,3.48,2.95c0.87,0.89,1.86,1.69,2.3,1.22c0.87-0.92-2.91-4.57-2.91-4.57L262.34,126z"
                }, null, -1)),
                _cache[38] || (_cache[38] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st34",
                  d: "M221.3,108.38c-3.17,2.42-3.26,6.79-0.48,9.72c2.78,2.93,15.79,9.27,20.21,9.47\n    c3.01,0.14,12.21-0.61,17.76-1.11c2.48-0.22,4.54-2.4,3.77-4.77c-0.29-0.88-0.74-1.38-1.11-1.66c-0.38-0.28-0.85-0.37-1.31-0.45\n    c-2.72-0.49-12.77-2.27-16.15-2.52c-3.91-0.29-8.8-4.38-12.83-6.75C226.74,107.73,224.36,106.04,221.3,108.38z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_27, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[39] || (_cache[39] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000070094880239754582840000004615843211519934612_)" },
                  d: "\n    M221.3,108.38c-3.17,2.42-3.26,6.79-0.48,9.72c2.78,2.93,15.79,9.27,20.21,9.47c3.01,0.14,12.21-0.61,17.76-1.11\n    c2.48-0.22,4.54-2.4,3.77-4.77c-0.29-0.88-0.74-1.38-1.11-1.66c-0.38-0.28-0.85-0.37-1.31-0.45c-2.72-0.49-12.77-2.27-16.15-2.52\n    c-3.91-0.29-8.8-4.38-12.83-6.75C226.74,107.73,224.36,106.04,221.3,108.38z"
                }, null, -1)),
                _cache[40] || (_cache[40] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M266.61,139.27c0,0,4.16,1.4,6.61,1.77c1.31,0.2,2.19,0.22,4.36-0.81c1.01-0.48,1.7-0.94,1.56-1.51\n    c-0.06-0.26-0.62,0.11-0.62,0.11s1.17-0.63,1.09-1.34c-0.08-0.72-0.79-0.09-0.79-0.09s1.29-0.7,1.16-1.41\n    c-0.13-0.71-0.87-0.04-0.87-0.04s1.09-0.63,1.08-1.22c0-0.6-0.39-0.56-1.19-0.28c-0.94,0.32-3.15,1.02-4.96,0.72\n    c-1.92-0.32-3.05-1.48-4.52-0.87c-1.47,0.61-3.46,0.03-3.46,0.03L266.61,139.27z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_28, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[41] || (_cache[41] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000057112094430072739880000013130406074361990071_)", "fill-opacity": "0.24" },
                  d: "\n    M266.61,139.27c0,0,4.16,1.4,6.61,1.77c1.31,0.2,2.19,0.22,4.36-0.81c1.01-0.48,1.7-0.94,1.56-1.51\n    c-0.06-0.26-0.62,0.11-0.62,0.11s1.17-0.63,1.09-1.34c-0.08-0.72-0.79-0.09-0.79-0.09s1.29-0.7,1.16-1.41\n    c-0.13-0.71-0.87-0.04-0.87-0.04s1.09-0.63,1.08-1.22c0-0.6-0.39-0.56-1.19-0.28c-0.94,0.32-3.15,1.02-4.96,0.72\n    c-1.92-0.32-3.05-1.48-4.52-0.87c-1.47,0.61-3.46,0.03-3.46,0.03L266.61,139.27z"
                }, null, -1)),
                _cache[42] || (_cache[42] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M269.33,134.35c1.78-0.83,3.12-1.48,4.12-2.11c1.07-0.68,2.23-1.24,2.55-0.68c0.62,1.07-3.96,3.79-3.96,3.79\n    L269.33,134.35z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_29, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[43] || (_cache[43] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000019665534143964730440000013896057272909222544_)", "fill-opacity": "0.24" },
                  d: "\n    M269.33,134.35c1.78-0.83,3.12-1.48,4.12-2.11c1.07-0.68,2.23-1.24,2.55-0.68c0.62,1.07-3.96,3.79-3.96,3.79L269.33,134.35z"
                }, null, -1)),
                _cache[44] || (_cache[44] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st38",
                  d: "M237.33,240.37c-0.16,1.95-2.07,4.09,3.1,4.53c5.65,0.48,16.77-5.81,16.37-8.02\n    c-0.4-2.21-4.91-2.28-10.28-1.32C241.14,236.52,237.53,238.01,237.33,240.37z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_30, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[45] || (_cache[45] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000023242371957623111430000004550394846978856346_)" },
                  d: "M237.33,240.37\n    c-0.16,1.95-2.07,4.09,3.1,4.53c5.65,0.48,16.77-5.81,16.37-8.02c-0.4-2.21-4.91-2.28-10.28-1.32\n    C241.14,236.52,237.53,238.01,237.33,240.37z"
                }, null, -1)),
                _cache[46] || (_cache[46] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st38",
                  d: "M217.68,236.15c-0.24,1.95-2.23,4.01,2.92,4.65c5.62,0.7,16.99-5.14,16.68-7.37\n    c-0.31-2.23-4.81-2.48-10.22-1.73C221.65,232.46,217.98,233.8,217.68,236.15z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_31, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[47] || (_cache[47] = createStaticVNode('<path style="fill:url(#SVGID_00000173151495301893299360000013904627514016062362_);" d="M217.68,236.15\n    c-0.24,1.95-2.23,4.01,2.92,4.65c5.62,0.7,16.99-5.14,16.68-7.37c-0.31-2.23-4.81-2.48-10.22-1.73\n    C221.65,232.46,217.98,233.8,217.68,236.15z" data-v-7037ceca></path><path class="fx_dapp_browser_st41" d="M221.33,151.48c0,0-3.88,3.11-3.45,10.04c0.12,1.93,2.7,36.42,2.7,36.42s-2.87,38.06-1.91,38.77\n    c0.95,0.7,2.13,0.77,3.26,0.31c1.57-0.64,3.11-1.81,3.99-2.78c0.76-0.84,4.18-20.42,6.01-36.07c2.45-20.96,3.91-41.11,3.91-41.11\n    L221.33,151.48z" data-v-7037ceca></path><defs data-v-7037ceca><filter id="fx_dapp_browser_Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" data-v-7037ceca><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" data-v-7037ceca></feColorMatrix></filter></defs><mask maskUnits="userSpaceOnUse" id="mask0_1251_31375_00000147190161042252659030000007045904699341714589_" data-v-7037ceca><path class="fx_dapp_browser_st42" d="M223.27,151.6c0,0-3.88,3.11-3.45,10.04c0.12,1.93,0.77,36.3,0.77,36.3s-2.87,38.06-1.91,38.77\n    c0.95,0.7,2.13,0.77,3.26,0.31c1.57-0.64,3.11-1.81,3.99-2.78c0.76-0.84,4.18-20.42,6.01-36.07c2.45-20.96,3.91-41.11,3.91-41.11\n    L223.27,151.6z" data-v-7037ceca></path></mask><path class="fx_dapp_browser_st41" d="M222.98,156.43c0,0-3.07,5.51-0.48,13.01c2.59,7.5,13.28,36.2,13.28,36.2s1.51,30.79,1.74,34.46\n    c0.07,1.11,2.62,1.45,5.23,0.44c3.26-1.26,3.15-2.11,3.24-3.57c0.08-1.28,1.99-28.63,1.22-35.68c-1.01-9.27-4.67-37.36-4.67-37.36\n    L222.98,156.43z" data-v-7037ceca></path><defs data-v-7037ceca><filter id="fx_dapp_browser_Adobe_OpacityMaskFilter_00000048503096094220557550000010724979637644623801_" filterUnits="userSpaceOnUse" data-v-7037ceca><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" data-v-7037ceca></feColorMatrix></filter></defs><mask maskUnits="userSpaceOnUse" id="mask1_1251_31375_00000161589926544387603520000011908514791681809070_" data-v-7037ceca><path style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;filter:url(#fx_dapp_browser_Adobe_OpacityMaskFilter_00000048503096094220557550000010724979637644623801_);" d="\n    M222.98,156.43c0,0-3.07,5.51-0.48,13.01c2.59,7.5,13.28,36.2,13.28,36.2s1.51,30.79,1.74,34.46c0.07,1.11,2.62,1.45,5.23,0.44\n    c3.26-1.26,3.15-2.11,3.24-3.57c0.08-1.28,1.99-28.63,1.22-35.68c-1.01-9.27-4.67-37.36-4.67-37.36L222.98,156.43z" data-v-7037ceca></path></mask><path class="fx_dapp_browser_st46" d="M249.39,126.15" data-v-7037ceca></path><path class="fx_dapp_browser_st46" d="M249.39,126.11c-0.05-3.38-0.32-5.49-0.86-6.97c-0.24-0.64-0.52-1.17-0.87-1.63\n    c-0.44-0.58-0.96-1.06-1.59-1.54c-1.18-0.9-3.8-2.67-6.49-4.32c-1.35-0.83-2.72-1.62-3.93-2.26c-2.46-1.3-6.38-2.59-9.24-2.59\n    c-0.54,0-1.04,0.05-1.49,0.14c-3.29,0.73-6.59,1.81-6.91,9.78c-0.17,4.4-0.16,23.82-0.14,36.05c0,1.55,0.01,2.99,0.01,4.26\n    c0.01,3.61,0.02,5.94,0.02,5.94s0.47,0.48,0.7,0.64c1.04,0.72,4.15,2.4,10.81,3.22c1.72,0.21,3.65,0.34,5.8,0.34\n    c1.31,0,2.71-0.05,4.19-0.15c-1.45,0.1-2.81,0.15-4.1,0.15c-1.5,0-2.88-0.06-4.17-0.17c10.28-0.77,10.4-3.38,10.4-3.38\n    s4.51-23.37,2.35-37.46" data-v-7037ceca></path>', 9)),
                createBaseVNode("linearGradient", _hoisted_32, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[48] || (_cache[48] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000057828003417688925160000018218471198252974269_)" },
                  d: "\n    M249.39,126.11c-0.05-3.38-0.32-5.49-0.86-6.97c-0.24-0.64-0.52-1.17-0.87-1.63c-0.44-0.58-0.96-1.06-1.59-1.54\n    c-1.18-0.9-3.8-2.67-6.49-4.32c-1.35-0.83-2.72-1.62-3.93-2.26c-2.46-1.3-6.38-2.59-9.24-2.59c-0.54,0-1.04,0.05-1.49,0.14\n    c-3.29,0.73-6.59,1.81-6.91,9.78c-0.17,4.4-0.16,23.82-0.14,36.05c0,1.55,0.01,2.99,0.01,4.26c0.01,3.61,0.02,5.94,0.02,5.94\n    s0.47,0.48,0.7,0.64c1.04,0.72,4.15,2.4,10.81,3.22c1.72,0.21,3.65,0.34,5.8,0.34c1.31,0,2.71-0.05,4.19-0.15\n    c-1.45,0.1-2.81,0.15-4.1,0.15c-1.5,0-2.88-0.06-4.17-0.17c10.28-0.77,10.4-3.38,10.4-3.38s4.51-23.37,2.35-37.46l5.42-0.7\n    c0.03,0.23,0.06,0.47,0.09,0.7"
                }, null, -1)),
                _cache[49] || (_cache[49] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st34",
                  d: "M236.54,112.76c-3.91,0.8-5.89,4.7-4.65,8.55c1.23,3.85,10.2,15.21,14.08,17.31\n    c2.67,1.44,12.24,1.88,17.96,2.02c2.69,0.06,5.39-1.47,5.75-4.14c0.24-1.77-1.63-2.65-3.4-2.92c-3.84-0.58-10.68-1.75-13.08-3.13\n    c-3.4-1.96-6.03-7.77-8.63-11.65C241.72,114.55,240.32,111.99,236.54,112.76z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_33, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[50] || (_cache[50] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000041256437524692476480000016176626765141833647_)" },
                  d: "\n    M236.54,112.76c-3.91,0.8-5.89,4.7-4.65,8.55c1.23,3.85,10.2,15.21,14.08,17.31c2.67,1.44,12.24,1.88,17.96,2.02\n    c2.69,0.06,5.39-1.47,5.75-4.14c0.24-1.77-1.63-2.65-3.4-2.92c-3.84-0.58-10.68-1.75-13.08-3.13c-3.4-1.96-6.03-7.77-8.63-11.65\n    C241.72,114.55,240.32,111.99,236.54,112.76z"
                }, null, -1)),
                _cache[51] || (_cache[51] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M226.68,108.98c-0.17,0.36-0.03,0.79,0.18,1.13c0.41,0.65,2.32,2.09,4.93,2.23\n    c2.63,0.14,4.03-0.46,4.72-0.85c0.36-0.2,0.6-0.55,0.68-0.96l0.72-3.55c0,0,2.78,0.31,3.66-0.7c0.89-1.01,4.37-14.14,0.58-17.65\n    c-3.8-3.52-12.51-3.03-14.2,2.94c-1.69,5.96,0.86,9.36,1.03,10.77C229.11,103.49,227.38,107.5,226.68,108.98z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_34, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[52] || (_cache[52] = createBaseVNode("path", {
                  style: { "fill-rule": "evenodd", "clip-rule": "evenodd", "fill": "url(#SVGID_00000112598478673782764490000013678197662992251557_)", "fill-opacity": "0.24" },
                  d: "\n    M226.68,108.98c-0.17,0.36-0.03,0.79,0.18,1.13c0.41,0.65,2.32,2.09,4.93,2.23c2.63,0.14,4.03-0.46,4.72-0.85\n    c0.36-0.2,0.6-0.55,0.68-0.96l0.72-3.55c0,0,2.78,0.31,3.66-0.7c0.89-1.01,4.37-14.14,0.58-17.65c-3.8-3.52-12.51-3.03-14.2,2.94\n    c-1.69,5.96,0.86,9.36,1.03,10.77C229.11,103.49,227.38,107.5,226.68,108.98z"
                }, null, -1)),
                _cache[53] || (_cache[53] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st41",
                  d: "M233.37,104.26c2.42-0.56,2.61-6.09,4.28-7.27c0.99-0.7,1.76,0.21,1.62,1.19c-0.02,0.18,0,0.3,0.05,0.38\n    c0.36,0.56,2.25-0.11,2.82-0.45c2.06-1.26,1.29-4.48,2.65-6.47c0.26-0.38,0.52-0.79,0.75-1.21c0.24-0.43,0.22-0.96-0.02-1.38\n    c-3.37-5.8-8.55-6.47-13.63-4.22c-4.59,2.03-7.29,7.12-6.4,12.06c0.71,3.92,2.48,6.17,3.41,6.49\n    C228.9,103.37,232.01,104.58,233.37,104.26z"
                }, null, -1)),
                _cache[54] || (_cache[54] = createBaseVNode("path", {
                  class: "fx_dapp_browser_st29",
                  d: "M244.02,100.87c0.11-0.25-0.29-2.04-0.5-2.9l-1.2,3.12C242.84,101.12,243.91,101.12,244.02,100.87z"
                }, null, -1)),
                createBaseVNode("linearGradient", _hoisted_35, [
                  createBaseVNode("stop", {
                    offset: "0",
                    style: normalizeStyle("stop-color:" + unref(gradientBlue))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.1667",
                    style: normalizeStyle("stop-color:" + unref(gradientViolet))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.5118",
                    style: normalizeStyle("stop-color:" + unref(gradientRed))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "0.8333",
                    style: normalizeStyle("stop-color:" + unref(gradientOrange))
                  }, null, 4),
                  createBaseVNode("stop", {
                    offset: "1",
                    style: normalizeStyle("stop-color:" + unref(gradientPurple))
                  }, null, 4)
                ]),
                _cache[55] || (_cache[55] = createBaseVNode("path", {
                  style: { "fill": "url(#SVGID_00000087398677422582921790000009501780250161999284_)", "fill-opacity": "0.24" },
                  d: "M244.02,100.87\n    c0.11-0.25-0.29-2.04-0.5-2.9l-1.2,3.12C242.84,101.12,243.91,101.12,244.02,100.87z"
                }, null, -1))
              ])
            ])
          ]))
        ])
      ]);
    };
  }
});

const FxDappBrowserPageDark = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-7037ceca"]]);

const fetchDappBrowserEntriesV2 = async (networkId) => {
  const url = `/${networkId}/v2/dapps/entries`;
  const res = await api.get(url).catch((err) => {
    console.error(el("fetchDappBrowserEntriesV2"), el(`url=${url}`), err?.message ?? err);
  });
  if (res?.data?.list) {
    return res.data.list;
  }
  return [];
};

const favoriteIdList = getDappFavorites();
const categoryOrder = ["DeFi", "Collectibles", "Mints", "Social", "Tools", "Other"];
const categoryList = ref([]);
const categoryListInactive = ref([]);
const entryListRaw = ref([]);
const entryList = computed(() => {
  if (isIosApp()) {
    return [];
  }
  const list = [];
  for (const entry of entryListRaw.value) {
    if (favoriteIdList.value.includes(entry.label)) {
      continue;
    }
    let allCategoriesInactive = true;
    for (const category of entry.categoryList) {
      if (!categoryListInactive.value.includes(category)) {
        allCategoriesInactive = false;
        break;
      }
    }
    if (!allCategoriesInactive) {
      list.push(entry);
    }
  }
  list.sort((a, b) => {
    const orderA = a.order;
    const orderB = b.order;
    if (orderA !== void 0 && orderB === void 0) {
      return -1;
    }
    if (orderA === void 0 && orderB !== void 0) {
      return 1;
    }
    if (orderA !== void 0 && orderB !== void 0) {
      return orderA - orderB;
    }
    return a.label.localeCompare(b.label);
  });
  return list;
});
const entryListPromoted = computed(() => {
  if (isIosApp()) {
    return [];
  }
  return entryListRaw.value.filter((e) => !!e.promotion).sort((a, b) => a.promotion.order - b.promotion.order);
});
const entryListFavorites = computed(() => {
  const list = [];
  for (const favorite of favoriteIdList.value) {
    const entry = entryListRaw.value.find((e) => e.label === favorite);
    if (entry) {
      list.push(entry);
    } else {
      try {
        const __dappURL = favorite;
        const _dappURL = new URL(__dappURL);
        const unverifiedCat = isIosApp() || isAndroidApp() ? [] : ["unverified"];
        list.push({
          categoryList: [...unverifiedCat],
          url: __dappURL,
          label: __dappURL,
          isConnected: false,
          isActive: false,
          isScam: false,
          needsReload: false,
          needsDisconnect: false,
          isUnverified: true,
          origin: _dappURL.origin
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
  return list.sort((a, b) => {
    const orderA = a.order;
    const orderB = b.order;
    if (orderA !== void 0 && orderB === void 0) {
      return -1;
    }
    if (orderA === void 0 && orderB !== void 0) {
      return 1;
    }
    if (orderA !== void 0 && orderB !== void 0) {
      return orderA - orderB;
    }
    return a.label.localeCompare(b.label);
  });
});
const hasRawEntries = computed(() => entryListRaw.value.length > 0);
const hasEntries = computed(() => entryList.value.length > 0);
const hasPromoted = computed(() => entryListPromoted.value.length > 0);
const hasFavorites = computed(() => entryListFavorites.value.length > 0);
let _toid = -1;
const updateEntryList = async () => {
  clearTimeout(_toid);
  const newList = await fetchDappBrowserEntriesV2(networkId.value);
  const categorySet = /* @__PURE__ */ new Set();
  for (let i = newList.length - 1; i >= 0; i--) {
    const newItem = newList[i];
    const oldItem = entryListRaw.value.find((i2) => i2.label === newItem.label) ?? entryListRaw.value.find((i2) => i2.isUnverified && i2.url === newItem.url);
    if (newItem.categoryList) {
      newItem.categoryList.forEach((c) => categorySet.add(c));
    }
    if (oldItem) {
      newItem.isConnected = oldItem.isConnected;
    }
    if (isPwaApp() || isSPAApp()) {
      newItem.url = newItem.urlBridge ?? newItem.url;
    }
    newItem.origin = new URL(newItem.url).origin;
  }
  entryListRaw.value.splice(0, entryListRaw.value.length, ...newList);
  categoryList.value.splice(0, categoryList.value.length, ...Array.from(categorySet));
  categoryList.value.sort((a, b) => {
    const orderA = categoryOrder.indexOf(a);
    const orderB = categoryOrder.indexOf(b);
    if (a === "Other") {
      return 1;
    }
    if (b === "Other") {
      return -1;
    }
    if (orderA === -1 && orderB === -1) {
      return a.localeCompare(b);
    }
    if (orderA === -1) {
      return 1;
    }
    if (orderB === -1) {
      return -1;
    }
    return orderA - orderB;
  });
  _toid = setTimeout(() => {
    updateEntryList();
  }, 15 * 60 * 1e3);
};
const addEntry = (entry) => {
  const _entry = entryListRaw.value.find((e) => !!entry.isUnverified ? e.url === entry.url : e.origin === entry.origin);
  if (_entry) {
    return _entry;
  }
  entryListRaw.value.push(entry);
  return entry;
};
const removeEntry = (entry) => {
  for (let i = entryListRaw.value.length - 1; i >= 0; i--) {
    if (entryListRaw.value[i].label === entry.label) {
      entryListRaw.value.splice(i, 1);
    }
  }
  for (let i = entryListRaw.value.length - 1; i >= 0; i--) {
    if (entryListRaw.value[i].url === entry.url) {
      entryListRaw.value.splice(i, 1);
    }
  }
};
const toggleFavoriteEntry = (entry) => {
  let removed = false;
  const url = entry.url;
  for (let i = favoriteIdList.value.length - 1; i >= 0; i--) {
    if (favoriteIdList.value[i] === url) {
      favoriteIdList.value.splice(i, 1);
      removed = true;
      break;
    }
  }
  const id = entry.label;
  for (let i = favoriteIdList.value.length - 1; i >= 0; i--) {
    if (favoriteIdList.value[i] === id) {
      favoriteIdList.value.splice(i, 1);
      removed = true;
      break;
    }
  }
  if (!removed) {
    favoriteIdList.value.push(!!entry.isUnverified ? url : id);
  }
};
const isFavoriteEntry = (entry) => {
  return favoriteIdList.value.includes(entry.url) || favoriteIdList.value.includes(entry.label);
};
const toggleInactiveCategory = (category) => {
  const index = categoryListInactive.value.findIndex((c) => c === category);
  if (index >= 0) {
    categoryListInactive.value.splice(index, 1);
  } else {
    categoryListInactive.value.push(category);
  }
};
const clearInactiveCategory = () => {
  categoryListInactive.value.splice(0);
};
const init = () => {
  return updateEntryList();
};
nextTick(() => {
  init();
});

var ApiChannel = /* @__PURE__ */ ((ApiChannel2) => {
  ApiChannel2["domToCS"] = "eternl-dom-to-cs";
  ApiChannel2["csToDom"] = "eternl-cs-to-dom";
  ApiChannel2["csToBg"] = "eternl-cs-to-bg";
  ApiChannel2["bgToCs"] = "eternl-bg-to-cs";
  ApiChannel2["bgToEnable"] = "eternl-bg-to-enable";
  ApiChannel2["enableToBg"] = "eternl-enable-to-bg";
  ApiChannel2["bgToSidePanel"] = "eternl-bg-to-side-panel";
  ApiChannel2["sidePanelToBg"] = "eternl-side-panel-to-bg";
  ApiChannel2["bgToMain"] = "eternl-bg-to-main";
  ApiChannel2["mainToBg"] = "eternl-main-to-bg";
  ApiChannel2["bgToPermissions"] = "eternl-bg-to-permissions";
  ApiChannel2["permissionsToBg"] = "eternl-permissions-to-bg";
  ApiChannel2["bgToSignTx"] = "eternl-bg-to-sign-tx";
  ApiChannel2["signTxToBg"] = "eternl-sign-tx-to-bg";
  ApiChannel2["bgToSignData"] = "eternl-bg-to-sign-data";
  ApiChannel2["signDataToBg"] = "eternl-sign-data-to-bg";
  ApiChannel2["popupToBg"] = "eternl-popup-to-bg";
  ApiChannel2["bgToOffscreen"] = "eternl-bg-to-offscreen";
  ApiChannel2["offscreenToBg"] = "eternl-offscreen-to-bg";
  return ApiChannel2;
})(ApiChannel || {});

const getConnectedOriginsMap = () => getObjRef("connectedOrigins", {});
const setConnectedOriginsMap$1 = (value) => {
  const _ref = getConnectedOriginsMap();
  _ref.value = value;
  forceSetLS("connectedOrigins", value);
};
const getConnectedOriginsNameMap = () => getObjRef("connectedOriginsName", {});

let _connectedOriginsMap = {};
let _dappAccountId = "";
let _originAccountList = [];
const setConnectedOriginsMap = (connectedOriginsMap) => {
  _connectedOriginsMap = connectedOriginsMap;
  return _connectedOriginsMap;
};
const setDappAccountId = (dappAccountId) => {
  _dappAccountId = dappAccountId;
  return _dappAccountId;
};
const addConnectedOrigin$1 = (origin, extensions) => {
  if (!extensions) {
    return _connectedOriginsMap;
  }
  const originExtensionList = _connectedOriginsMap[origin] ?? [];
  for (const extension of extensions) {
    if (!originExtensionList.some((e) => e.cip === extension.cip)) {
      originExtensionList.push(extension);
    }
  }
  _connectedOriginsMap[origin] = originExtensionList;
  return _connectedOriginsMap;
};
const isConnectedOrigin$1 = (origin, extensions) => {
  if (!origin) {
    return void 0;
  }
  const map = _connectedOriginsMap;
  let originExtensions = map[origin];
  if (!originExtensions) {
    return extensions;
  }
  const grantExtensionList = [];
  if (extensions) {
    grantExtensionList.push(...extensions);
  }
  if (typeof originExtensions === "object") {
    originExtensions = Object.values(originExtensions);
  }
  for (let i = 0; i < originExtensions.length; i++) {
    const extension = originExtensions[i];
    const index = grantExtensionList.findIndex((e) => e.cip === extension.cip);
    if (index > -1) {
      grantExtensionList.splice(index, 1);
    }
  }
  return grantExtensionList.length === 0 ? null : grantExtensionList;
};
const setOriginAccount$1 = (origin, domId, calledEnable) => {
  if (!domId) {
    domId = "/ndi";
  }
  if (!domId.startsWith("/")) {
    domId = "/" + domId;
  }
  let found = false;
  let originAccount = null;
  for (let i = 0; i < _originAccountList.length; i++) {
    const entry = _originAccountList[i];
    if (entry.origin === origin && entry.domId === domId) {
      originAccount = entry;
      entry.lastUpdated = Date.now();
      if (entry.accountId === _dappAccountId) {
        entry.needsEnableCall = false;
      } else if (calledEnable) {
        entry.accountId = _dappAccountId;
        entry.needsEnableCall = false;
      } else {
        entry.needsEnableCall = true;
      }
      found = true;
      break;
    }
  }
  if (!found) {
    originAccount = {
      accountId: _dappAccountId,
      origin,
      domId,
      lastUpdated: Date.now(),
      needsEnableCall: !calledEnable
    };
    _originAccountList.push(originAccount);
  }
  for (let i = _originAccountList.length - 1; i >= 0; i--) {
    const entry = _originAccountList[i];
    if (entry.lastUpdated < Date.now() - 1e3 * 60 * 60 * 4) {
      _originAccountList.splice(i, 1);
    }
  }
  return { originAccountList: _originAccountList, originAccount };
};

const isConnectedOrigin = (origin, extensions) => {
  if (!origin) {
    return void 0;
  }
  const map = getConnectedOriginsMap().value;
  setConnectedOriginsMap(map);
  return isConnectedOrigin$1(origin, extensions);
};
const getConnectedExtensions = (origin) => {
  const map = getConnectedOriginsMap().value;
  return origin ? map[origin] ?? [] : [];
};
const addConnectedOrigin = (origin, extensions) => {
  if (!origin) {
    return;
  }
  const map = getConnectedOriginsMap().value;
  setConnectedOriginsMap(map);
  addConnectedOrigin$1(origin, extensions);
  setConnectedOriginsMap$1(map);
};
const setOriginAccount = (appAccoundId, origin, domId, calledEnable) => {
  setDappAccountId(appAccoundId);
  const {
    originAccount
  } = setOriginAccount$1(origin, domId, calledEnable);
  return originAccount;
};
const isOriginEnabledAccount = (appAccoundId, origin, domId, calledEnable) => !setOriginAccount(appAccoundId, origin, domId, calledEnable).needsEnableCall;

let doLogAll = false;
const enableLogs = (enable) => {
  doLogAll = enable;
};

const checkEnable = (req, appAccountId) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("checkEnable"), sl("req"), req, origin);
  }
  let wantedExtensionList = req.payload.extensions;
  if (!wantedExtensionList || !Array.isArray(wantedExtensionList)) {
    wantedExtensionList = [extCip30];
  }
  const unsupportedExtensions = cip30_enable(wantedExtensionList);
  if (unsupportedExtensions === void 0) {
    req.response = errorInvalidArgument();
  } else if (unsupportedExtensions) {
    req.response = errorUnsupportedExtensions(unsupportedExtensions);
  }
  if (req.response) {
    if (doLogAll) {
      console.error(el("checkEnable"), sl("error"), req.response);
    }
    return req;
  }
  if (wantedExtensionList.some((e1) => autoGrantWithCIP30List.some((e2) => e2.cip === e1.cip)) && !wantedExtensionList.some((e) => e.cip === extCip30.cip)) {
    wantedExtensionList.push(extCip30);
  }
  for (let i = wantedExtensionList.length - 1; i >= 0; i--) {
    const ext = wantedExtensionList[i];
    if (autoGrantWithCIP30List.some((e) => e.cip === ext.cip)) {
      wantedExtensionList.splice(i, 1);
    }
  }
  const grantExtensionList = isConnectedOrigin(origin, wantedExtensionList);
  if (grantExtensionList === void 0) {
    req.response = errorInvalidArgument();
    return req;
  }
  const isConnected = !grantExtensionList;
  if (doLogAll) {
    console.log(el("checkEnable"), "isConnected", isConnected, origin, req);
  }
  if (isConnected) {
    if (appAccountId) {
      req.response = {
        success: true,
        isEnabled: isOriginEnabledAccount(appAccountId, origin, req.payload.domId, req.api === METHOD.enable)
      };
    } else {
      req.response = errorNoAccount();
    }
    if (doLogAll) {
      console.warn(el("checkEnable"), sl("isConnected"), req);
    }
    return req;
  }
  req.payload.extensions = grantExtensionList ?? wantedExtensionList;
  return req;
};
const handleIsEnabled = (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleIsEnabled"), sl("req"), req, origin);
  }
  req.response = {
    success: true,
    isEnabled: isConnectedOrigin(origin, []) === null
  };
  if (doLogAll) {
    console.warn(el("handleIsEnabled"), sl("response"), req.response);
  }
  return req;
};
const handleGetExtensions = async (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetExtensions"), sl("req"), req, origin);
  }
  const extensions = getConnectedExtensions(origin);
  req.response = { success: true, extensions };
  if (doLogAll) {
    console.warn(el("handleGetExtensions"), sl("response"), req);
  }
  return req;
};
const handleGetNetworkId = async (req) => {
  const resNetworkId = cip30_getNetworkId(networkId.value);
  if (resNetworkId !== void 0) {
    req.response = { success: true, networkId: resNetworkId };
  } else {
    req.response = errorNoNetworkId();
  }
  if (doLogAll) {
    console.warn(el("handleGetNetworkId"), sl("req"), req);
  }
  return req;
};
const handleGetChangeAddress = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetChangeAddress"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    const addr = cip30_getChangeAddress(appAccount);
    if (!addr) {
      req.response = errorNoChangeAddr();
    } else {
      req.response = { success: true, changeAddr: addr };
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetChangeAddress"), sl("response"), req);
  }
  return req;
};
const handleGetUnusedAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetUnusedAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    if (origin?.startsWith("https://") && origin?.endsWith(".midnight.gd")) {
      const addrList = cip30_getForcedUnusedAddresses(appAccount);
      req.response = { success: true, unusedAddrList: addrList };
    } else {
      const addrList = cip30_getUnusedAddresses(appAccount);
      req.response = { success: true, unusedAddrList: addrList };
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetUnusedAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetForcedUnusedAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetForcedUnusedAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    const addrList = cip30_getForcedUnusedAddresses(appAccount);
    req.response = { success: true, unusedAddrList: addrList };
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetForcedUnusedAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetUsedAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetUsedAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const addrList = cip30_getUsedAddresses(appAccount, cip30_getPaginate([req.payload.paginate]));
      req.response = { success: true, usedAddrList: addrList };
    } catch (err) {
      req.response = err;
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetUsedAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetRewardAddresses = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetRewardAddresses"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const addrList = cip30_getRewardAddresses(appAccount);
      req.response = { success: true, rewardAddrList: addrList };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetRewardAddresses"), sl("response"), req);
  }
  return req;
};
const handleGetRewardAddress = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetRewardAddress"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const addr = cip30_getRewardAddress(appAccount);
      if (!addr) {
        req.response = errorNoRewardAddr();
      } else {
        req.response = { success: true, rewardAddr: addr };
      }
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetRewardAddress"), sl("response"), req);
  }
  return req;
};
const handleGetBalance = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetBalance"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      await maybeReloadAccount(appAccount);
      req.response = { success: true, balanceCbor: await cip30_getBalance(appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetBalance"), sl("response"), req);
  }
  return req;
};
const handleGetUtxos = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetUtxos"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      const args = [req.payload.amount, req.payload.paginate];
      await maybeReloadAccount(appAccount);
      req.response = {
        success: true,
        utxoList: await cip30_getUtxos(
          appAccount,
          cip30_getAmount(args),
          cip30_getPaginate(args, 1)
        )
      };
    } catch (err) {
      req.response = err;
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetUtxos"), sl("response"), req);
  }
  return req;
};
const handleGetCollateral = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetCollateral"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      await maybeReloadAccount(appAccount);
      req.response = { success: true, collateralList: await cip30_getCollateral(appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetCollateral"), sl("response"), req);
  }
  return req;
};
const handleGetLockedUtxos = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetLockedUtxos"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      await maybeReloadAccount(appAccount);
      req.response = { success: true, lockedUtxoList: await cip30_getLockedUtxos(appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetLockedUtxos"), sl("response"), req);
  }
  return req;
};
const handleSubmitTx = async (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleSubmitTx"), sl("req"), req, origin);
  }
  try {
    req.response = { success: true, txHash: await cip30_submitTx(networkId.value, cip30_getTx([req.payload.tx])) };
  } catch (err) {
    req.response = err;
  }
  if (doLogAll) {
    console.warn(el("handleSubmitTx"), sl("response"), req);
  }
  return req;
};
const handleSyncAccount = async (req) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleSyncAccount"), sl("req"), req, origin);
  }
  try {
    dispatchSignalSync(doForceSyncImportantAccounts);
    req.response = { success: true };
  } catch (err) {
    req.response = errorInternal(err);
  }
  if (doLogAll) {
    console.warn(el("handleSyncAccount"), sl("response"), req);
  }
  return req;
};
const handleGetConnectedNetworkId = async (req) => {
  const resNetworkId = cip30_getConnectedNetworkId(networkId.value);
  if (resNetworkId !== void 0) {
    req.response = { success: true, connectedNetworkId: resNetworkId };
  } else {
    req.response = errorNoNetworkId();
  }
  if (doLogAll) {
    console.warn(el("handleGetConnectedNetworkId"), sl("req"), req);
  }
  return req;
};
let _lastTimeReloadAccount = 0;
const maybeReloadAccount = async (appAccount) => {
  if (doLogAll) {
    console.warn(el("maybeReloadAccount"), sl("isSyncLeader"), isSyncLeader());
  }
  if (isSyncLeader()) {
    return;
  }
  if (appAccount && Date.now() - _lastTimeReloadAccount > 2e3) {
    if (doLogAll) {
      console.warn(el("maybeReloadAccount"), sl("reload"), "start");
    }
    _lastTimeReloadAccount = Date.now();
    await dispatchSignal(doReloadAccount, appAccount);
    if (doLogAll) {
      console.warn(el("maybeReloadAccount"), sl("reload"), "done");
    }
  } else {
    if (doLogAll) {
      console.warn(el("maybeReloadAccount"), sl("skip"));
    }
  }
};

const cip95_GetStakePubKeys = (api, appAccount) => {
  const pubStakeKeyList = [];
  const credList = [];
  for (const rewardInfo of appAccount.data.rewardInfoList) {
    if ((api === METHOD.getRegisteredPubStakeKeys || api === "cip95.getRegisteredPubStakeKeys") && rewardInfo.registered || (api === METHOD.getUnregisteredPubStakeKeys || api === "cip95.getUnregisteredPubStakeKeys") && !rewardInfo.registered) {
      credList.push(rewardInfo.cred);
    }
  }
  const pendingTxList = getPendingTxList(true);
  for (const tx of pendingTxList.value) {
    if (tx.body.certs) {
      for (const cert of tx.body.certs) {
        if ((api === METHOD.getRegisteredPubStakeKeys || api === "cip95.getRegisteredPubStakeKeys") && (cert.hasOwnProperty("StakeRegistration") || cert.hasOwnProperty("StakeRegistrationAndDelegation") || cert.hasOwnProperty("StakeVoteRegistrationAndDelegation") || cert.hasOwnProperty("VoteRegistrationAndDelegation")) || (api === METHOD.getUnregisteredPubStakeKeys || api === "cip95.getUnregisteredPubStakeKeys") && cert.hasOwnProperty("StakeDeregistration")) {
          const cred = Object.values(Object.values(cert)[0].stake_credential)[0];
          if (!credList.includes(cred)) {
            credList.push(cred);
          }
        }
      }
    }
  }
  for (const cred of credList) {
    const ownCred = getOwnedCred([appAccount.data.keys], cred, "stake");
    if (!ownCred || ownCred.path.length !== 5) {
      continue;
    }
    pubStakeKeyList.push(getPubKeyStake(appAccount.data.account.pub, ownCred.path[4]));
  }
  return pubStakeKeyList;
};

const handleGetDRepPub = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetDRepPub"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      req.response = { success: true, drepPubKey: getPubKeyDRep(appAccount.data.account.pub, 0) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetDRepPub"), sl("response"), req);
  }
  return req;
};
const handleGetStakePubKeys = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetStakePubKeys"), sl("req"), req, origin);
  }
  if (appAccount) {
    try {
      req.response = { success: true, pubStakeKeyList: cip95_GetStakePubKeys(req.api, appAccount) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetStakePubKeys"), sl("response"), req);
  }
  return req;
};

const handleGetAccountPub = async (req, appAccount) => {
  const origin = req.payload.origin;
  if (doLogAll) {
    console.warn(el("handleGetAccountPub"), sl("req"), req, origin, appAccount);
  }
  if (appAccount) {
    try {
      req.response = { success: true, accountPub: generatePlateHex(appAccount.data.account.pub) };
    } catch (err) {
      req.response = errorInternal(err);
    }
  } else {
    req.response = errorNoAccount();
  }
  if (doLogAll) {
    console.warn(el("handleGetAccountPub"), sl("response"), req);
  }
  return req;
};

const cip142_getNetworkMagic = (networkId) => {
  return getNetworkMagic(networkId);
};

const handleGetNetworkMagic = async (req) => {
  const resNetworkMagic = cip142_getNetworkMagic(networkId.value);
  if (resNetworkMagic !== void 0) {
    req.response = { success: true, networkMagic: resNetworkMagic };
  } else {
    req.response = errorNoNetworkMagic();
  }
  if (doLogAll) {
    console.warn(el("handleGetNetworkMagic"), sl("req"), req);
  }
  return req;
};

const _req$2 = ref(null);
const _appAccount$2 = ref(null);
const openModalEnableCIP30 = (req, appAccount) => {
  setApiRequest(req, "enable");
  _appAccount$2.value = appAccount;
  _req$2.value = req;
};
const closeModalEnableCIP30 = () => {
  if (_req$2.value && !_req$2.value.response) {
    _req$2.value.response = errorConnectionRefused();
  }
  _req$2.value = null;
  _appAccount$2.value = null;
  setApiRequest(null, "enable");
  return false;
};
const useModalEnableCIP30 = () => {
  return {
    req: _req$2,
    appAccount: _appAccount$2,
    showModalEnableCIP30: computed(() => !!_req$2.value),
    // Caller will add a watcher for the req.response property.
    openModalEnableCIP30,
    closeModalEnableCIP30
  };
};

const _req$1 = ref(null);
const _appAccount$1 = ref(null);
const openModalSignTxCIP30 = (req, appAccount) => {
  setApiRequest(req, "signTx");
  _appAccount$1.value = appAccount;
  _req$1.value = req;
};
const closeModalSignTxCIP30 = () => {
  if (_req$1.value && !_req$1.value.response) {
    _req$1.value.response = errorTxUserDeclined();
  }
  _req$1.value = null;
  _appAccount$1.value = null;
  setApiRequest(null, "signTx");
};
const useModalSignTxCIP30 = () => {
  return {
    req: _req$1,
    appAccount: _appAccount$1,
    showModalSignTxCIP30: computed(() => !!_req$1.value),
    // Caller will add a watcher for the req.response property.
    openModalSignTxCIP30,
    closeModalSignTxCIP30
  };
};

const _req = ref(null);
const _appAccount = ref(null);
const openModalSignDataCIP30 = (req, appAccount) => {
  setApiRequest(req, "signData");
  _appAccount.value = appAccount;
  _req.value = req;
};
const closeModalSignDataCIP30 = () => {
  if (_req.value && !_req.value.response) {
    _req.value.response = errorDataUserDeclined();
  }
  _req.value = null;
  _appAccount.value = null;
  setApiRequest(null, "signData");
};
const useModalSignDataCIP30 = () => {
  return {
    req: _req,
    appAccount: _appAccount,
    showModalSignDataCIP30: computed(() => !!_req.value),
    // Caller will add a watcher for the req.response property.
    openModalSignDataCIP30,
    closeModalSignDataCIP30
  };
};

const doLog$1 = false;
const storeId$1 = "handleApiRequest";
const handleApiRequest = async (req, appAccount, canOpenUserRequests, needsIsEnabledCheck = true) => {
  if (doLogAll || doLog$1) {
    console.warn(el(storeId$1), sl("req"), req);
  }
  if (doLogAll || doLog$1) {
    console.warn(el(storeId$1), sl("api"), req.api);
  }
  if (req.api === METHOD.enableLogs) {
    enableLogs(req.payload.enable);
    req.response = { success: true };
    return req;
  }
  if (doLogAll || doLog$1) {
    console.warn(el(storeId$1), sl("appAccount"), appAccount);
  }
  switch (req.api) {
    case METHOD.enable:
      if (appAccount) {
        checkEnable(req, appAccount.id);
        if (doLogAll || doLog$1) {
          console.warn(el(storeId$1), sl("connected"), req.response);
        }
        if (req.response) {
          return req;
        }
        const { openModalEnableCIP30 } = useModalEnableCIP30();
        await openModal("enable", req, appAccount, errorConnectionRefused(), openModalEnableCIP30);
        delete req.payload.resolve;
        return req;
      }
      break;
    // This is a global list. It will add entry for each origin from SERVICEWORKER, DappBrowser, CardanoConnect, WalletConnect.
    case METHOD.isEnabled:
      return handleIsEnabled(req);
    case METHOD.getNetworkId:
      return handleGetNetworkId(req);
    case METHOD.getExtensions:
      return handleGetExtensions(req);
    case METHOD.getConnectedNetworkId:
      return handleGetConnectedNetworkId(req);
    // CIP-142
    case METHOD.getNetworkMagic:
    case "cip142.getNetworkMagic":
      return handleGetNetworkMagic(req);
  }
  if (!appAccount) {
    if (doLogAll || doLog$1) {
      console.warn(el(storeId$1), sl("notConnected"), "errorNoAccount", req.api);
    }
    req.response = errorNoAccount();
    return req;
  }
  if (needsIsEnabledCheck) {
    const origin = req.payload.origin ?? null;
    const domId = req.payload.domId ?? "";
    const extensions = req.payload.extensions ?? null;
    if (!origin) {
      if (doLogAll || doLog$1) {
        console.warn(el(storeId$1), sl("notConnected"), "errorNoOrigin", req.api);
      }
      req.response = errorNoOrigin();
      return req;
    }
    if (isConnectedOrigin(origin, extensions)) {
      if (doLogAll || doLog$1) {
        console.warn(el(storeId$1), sl("notConnected"), "errorNotConnected", req.api);
      }
      req.response = errorNotConnected();
      return req;
    }
    if (!isOriginEnabledAccount(appAccount.id, origin, domId, req.api === METHOD.enable)) {
      if (doLogAll || doLog$1) {
        console.warn(el(storeId$1), sl("notConnected"), "errorAccountChanged", req.api);
      }
      req.response = errorAccountChanged();
      return req;
    }
  }
  if (doLogAll || doLog$1) {
    console.warn(el(storeId$1), sl("connected"), req.api);
  }
  switch (req.api) {
    // submitTx needs a connected wallet, so dapps cannot spam.
    case METHOD.submitTx:
      return handleSubmitTx(req);
    case METHOD.getBalance:
      return handleGetBalance(req, appAccount);
    case METHOD.getUsedAddresses:
      return handleGetUsedAddresses(req, appAccount);
    case METHOD.getUnusedAddresses:
      return handleGetUnusedAddresses(req, appAccount);
    case METHOD.getRewardAddresses:
      return handleGetRewardAddresses(req, appAccount);
    case METHOD.getRewardAddress:
      return handleGetRewardAddress(req, appAccount);
    case METHOD.getChangeAddress:
      return handleGetChangeAddress(req, appAccount);
    case METHOD.getUtxos:
      return handleGetUtxos(req, appAccount);
    case METHOD.getCollateral:
      return handleGetCollateral(req, appAccount);
    case METHOD.getLockedUtxos:
      return handleGetLockedUtxos(req, appAccount);
    // CIP-95
    case METHOD.getPubDRepKey:
    case "cip95.getPubDRepKey":
      return handleGetDRepPub(req, appAccount);
    case METHOD.getRegisteredPubStakeKeys:
    case "cip95.getRegisteredPubStakeKeys":
    case METHOD.getUnregisteredPubStakeKeys:
    case "cip95.getUnregisteredPubStakeKeys":
      return handleGetStakePubKeys(req, appAccount);
    // CIP-104
    case METHOD.getAccountPub:
    case "cip104.getAccountPub":
      return handleGetAccountPub(req, appAccount);
    // experimental
    case METHOD.syncAccount:
      return handleSyncAccount(req);
    case METHOD.getForcedUnusedAddresses:
      return handleGetForcedUnusedAddresses(req, appAccount);
  }
  if (doLogAll || doLog$1) {
    console.warn(el(storeId$1), sl("handleApiRequest:connected:open"), req.api);
  }
  switch (req.api) {
    // Already handled above.
    // case METHOD.enable:
    case METHOD.signTxs:
    case "cip103.signTxs":
    case METHOD.signTx:
    case "cip95.signTx":
      const { openModalSignTxCIP30 } = useModalSignTxCIP30();
      await openModal("signTx", req, appAccount, errorTxUserDeclined(), openModalSignTxCIP30);
      break;
    case METHOD.signData:
    case "cip95.signData":
      const { openModalSignDataCIP30 } = useModalSignDataCIP30();
      await openModal("signData", req, appAccount, errorTxUserDeclined(), openModalSignDataCIP30);
      break;
  }
  delete req.payload.resolve;
  return req;
};
const openModal = async (callerId, req, appAccount, error, handleFunc) => {
  if (doLogAll || doLog$1) {
    console.warn(el(storeId$1), sl("openModal"), callerId, req.api, appAccount);
  }
  const lastReqRef = getApiRequest(callerId);
  if (lastReqRef && lastReqRef.reqId !== req.reqId) {
    lastReqRef.response = error;
    setApiRequest(null, callerId);
  }
  await nextTick();
  return new Promise(async (resolve) => {
    if (doLogAll || doLog$1) {
      console.log(el(storeId$1), sl("openModal"), req);
    }
    if (req.response) {
      return resolve(true);
    }
    req.payload.resolve = resolve;
    handleFunc(req, appAccount);
  });
};

// Auto-generated from dist/app/dom.js
const DOMFile = `
(function () {
  'use strict';

  const ensureLength = (str, length, char = " ", right = true) => {
    let i = 0;
    while (str.length < length && i++ < 100) {
      if (right) {
        str = char + str;
      } else {
        str = str + char;
      }
    }
    return str;
  };

  const el = (msg, length = 30, space = " ") => ensureLength(msg, length, space);
  const sl = (msg, length = 30, space = " ") => el(msg, length, space);

  var ApiChannel = /* @__PURE__ */ ((ApiChannel2) => {
    ApiChannel2["domToCS"] = "eternl-dom-to-cs";
    ApiChannel2["csToDom"] = "eternl-cs-to-dom";
    ApiChannel2["csToBg"] = "eternl-cs-to-bg";
    ApiChannel2["bgToCs"] = "eternl-bg-to-cs";
    ApiChannel2["bgToEnable"] = "eternl-bg-to-enable";
    ApiChannel2["enableToBg"] = "eternl-enable-to-bg";
    ApiChannel2["bgToSidePanel"] = "eternl-bg-to-side-panel";
    ApiChannel2["sidePanelToBg"] = "eternl-side-panel-to-bg";
    ApiChannel2["bgToMain"] = "eternl-bg-to-main";
    ApiChannel2["mainToBg"] = "eternl-main-to-bg";
    ApiChannel2["bgToPermissions"] = "eternl-bg-to-permissions";
    ApiChannel2["permissionsToBg"] = "eternl-permissions-to-bg";
    ApiChannel2["bgToSignTx"] = "eternl-bg-to-sign-tx";
    ApiChannel2["signTxToBg"] = "eternl-sign-tx-to-bg";
    ApiChannel2["bgToSignData"] = "eternl-bg-to-sign-data";
    ApiChannel2["signDataToBg"] = "eternl-sign-data-to-bg";
    ApiChannel2["popupToBg"] = "eternl-popup-to-bg";
    ApiChannel2["bgToOffscreen"] = "eternl-bg-to-offscreen";
    ApiChannel2["offscreenToBg"] = "eternl-offscreen-to-bg";
    return ApiChannel2;
  })(ApiChannel || {});

  const getRandomId = () => Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999) + "-" + Math.floor(Math.random() * 999999);

  const appVersion = {

    major: 2,
    minor: 0,
    patch: 15,
    build: 0
  };

  'v' + appVersion.major + '.' + appVersion.minor + '.' + appVersion.patch;
  'v' + appVersion.major + '.' + appVersion.minor + '.' + appVersion.patch + '.' + appVersion.build;

  const extCip30 = { cip: 30 };
  const extCip95 = { cip: 95 };
  const extCip103 = { cip: 103 };
  const extCip104 = { cip: 104 };
  const extCip142 = { cip: 142 };
  const supportedExtensions = [
    extCip30,
    extCip95,
    extCip103,
    extCip104,
    extCip142
  ];
  const METHOD = {
    enable: "enable",
    isEnabled: "isEnabled",
    getExtensions: "getExtensions",
    getNetworkId: "getNetworkId",
    getBalance: "getBalance",
    getChangeAddress: "getChangeAddress",
    getRewardAddresses: "getRewardAddresses",
    getUnusedAddresses: "getUnusedAddresses",
    getForcedUnusedAddresses: "getForcedUnusedAddresses",
    getUsedAddresses: "getUsedAddresses",
    getUtxos: "getUtxos",
    getCollateral: "getCollateral",
    getLockedUtxos: "getLockedUtxos",
    signData: "signData",
    signTx: "signTx",
    submitTx: "submitTx",
    syncAccount: "syncAccount",
    enableLogs: "enableLogs",
    // CIP-95
    getPubDRepKey: "getPubDRepKey",
    getRegisteredPubStakeKeys: "getRegisteredPubStakeKeys",
    getUnregisteredPubStakeKeys: "getUnregisteredPubStakeKeys",
    // CIP-104
    getAccountPub: "getAccountPub",
    // CIP-142
    getNetworkMagic: "getNetworkMagic",
    // experimental
    getConnectedNetworkId: "getConnectedNetworkId"
  };
  const DEFAULT_PAGINATE = { page: 0, limit: Number.MAX_SAFE_INTEGER };

  var ApiErrorCode = /* @__PURE__ */ ((ApiErrorCode2) => {
    ApiErrorCode2[ApiErrorCode2["InvalidRequest"] = -1] = "InvalidRequest";
    ApiErrorCode2[ApiErrorCode2["InternalError"] = -2] = "InternalError";
    ApiErrorCode2[ApiErrorCode2["Refused"] = -3] = "Refused";
    ApiErrorCode2[ApiErrorCode2["AccountChange"] = -4] = "AccountChange";
    return ApiErrorCode2;
  })(ApiErrorCode || {});
  var DataSignErrorCode = /* @__PURE__ */ ((DataSignErrorCode2) => {
    DataSignErrorCode2[DataSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
    DataSignErrorCode2[DataSignErrorCode2["AddressNotPK"] = 2] = "AddressNotPK";
    DataSignErrorCode2[DataSignErrorCode2["UserDeclined"] = 3] = "UserDeclined";
    DataSignErrorCode2[DataSignErrorCode2["InvalidFormat"] = 4] = "InvalidFormat";
    return DataSignErrorCode2;
  })(DataSignErrorCode || {});
  var TxSendErrorCode = /* @__PURE__ */ ((TxSendErrorCode2) => {
    TxSendErrorCode2[TxSendErrorCode2["Refused"] = 1] = "Refused";
    TxSendErrorCode2[TxSendErrorCode2["Failure"] = 2] = "Failure";
    return TxSendErrorCode2;
  })(TxSendErrorCode || {});
  var TxSignErrorCode = /* @__PURE__ */ ((TxSignErrorCode2) => {
    TxSignErrorCode2[TxSignErrorCode2["ProofGeneration"] = 1] = "ProofGeneration";
    TxSignErrorCode2[TxSignErrorCode2["UserDeclined"] = 2] = "UserDeclined";
    TxSignErrorCode2[TxSignErrorCode2["DeprecatedCertificate"] = 3] = "DeprecatedCertificate";
    return TxSignErrorCode2;
  })(TxSignErrorCode || {});
  class ApiError extends Error {
    code;
    info;
    constructor(code, info) {
      super(info);
      this.code = code;
      this.info = info;
    }
  }
  class TxSignError extends Error {
    code;
    info;
    constructor(code, info) {
      super(info);
      this.code = code;
      this.info = info;
    }
  }
  class TxSendError extends Error {
    code;
    info;
    constructor(code, info) {
      super(info);
      this.code = code;
      this.info = info;
    }
  }
  class DataSignError extends Error {
    code;
    info;
    constructor(code, info) {
      super(info);
      this.code = code;
      this.info = info;
    }
  }
  class PaginateError extends Error {
    maxSize;
    info;
    constructor(maxSize, info) {
      super(info);
      this.maxSize = maxSize;
      this.info = info;
    }
  }

  let doLogAll = false;
  const enableLogs = (enable) => {
    doLogAll = enable;
  };

  const apiVersion = "0.1.0";
  const name = "eternl";
  const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4ZmU4ODM0My1iMjExLTQ2YWEtYmE3MS0xZWFiZmZkNWZjMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NURCQTYwMDhBMTI1MTFFQzhBMjdGRTQzMjI4NjJBRDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NURCQTYwMDdBMTI1MTFFQzhBMjdGRTQzMjI4NjJBRDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1YzY1MGU0NC04MzE3LTQxMjMtOGFlNy03ZWQyZTVlYmVhMTciIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0N2NhMTg2Yy04YThlLThkNDYtYWE3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";

  const createInternalError = (info) => ({ success: false, error: { code: ApiErrorCode.InternalError, info } });
  const errorInternal = (e) => createInternalError(e);
  const errorComsMalformed = () => createInternalError("Error: coms malformed");

  const storeId = "api";
  const callApi = async (req) => {
    if (doLogAll) {
      console.warn(el(storeId), sl("callApi"), req);
    }
    try {
      if (_requestList.length + 1 > 20) {
        throw "too many requests";
      }
      _requestList.push(req);
      const res = await _bridge.send(req);
      if (doLogAll) {
        console.warn(el(storeId), sl("callApi:receive"), res);
      }
      for (let i = _requestList.length - 1; i >= 0; i--) {
        if (_requestList[i].reqId === res.reqId) {
          _requestList.splice(i, 1);
          break;
        }
      }
      if (!res?.response) {
        res.response = errorComsMalformed();
      }
      return res;
    } catch (err) {
      if (doLogAll) {
        console.warn(el(storeId), sl("callApi:err"), err);
      }
      req.response = errorInternal(err);
    }
    return req;
  };
  let _bridge = null;
  let _callApi = callApi;
  let _origin = window.origin;
  const _requestList = [];
  const enable = async (options) => {
    const extList = options?.extensions ?? [];
    if (!extList.some((ext) => ext.cip === extCip30.cip)) {
      extList.unshift(extCip30);
    }
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.enable,
      payload: {
        origin: _origin,
        extensions: extList,
        isUserGesture: navigator.userActivation.isActive
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      console.error("DOM: error", res.error);
      throw getApiError(res.error);
    }
    if (res.success) {
      const api = {};
      for (const extension of extList) {
        const _api = apiMap[extension.cip];
        if (!_api) {
          throw getApiError({ code: ApiErrorCode.InternalError, info: "extension missing: " + JSON.stringify(extension) });
        }
        for (const entry of Object.entries(_api)) {
          api[entry[0]] = entry[1];
        }
      }
      return api;
    }
    throw getApiError({ code: ApiErrorCode.Refused, info: "unknown error in enable" });
  };
  const isEnabled = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.isEnabled,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success) {
      if (res.error) {
        throw getApiError(res.error);
      }
      return false;
    }
    return res.isEnabled ?? false;
  };
  const getExtensions = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getExtensions,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (res.success) {
      return res.extensions;
    }
    throw getApiError(res.error, "getExtensions");
  };
  const getNetworkId = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getNetworkId,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (res.success) {
      return res.networkId;
    }
    throw getApiError(res.error, "getNetworkId");
  };
  const getConnectedNetworkId = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getConnectedNetworkId,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (res.success) {
      return res.connectedNetworkId;
    }
    throw getApiError(res.error, "getConnectedNetworkId");
  };
  const getNetworkMagic = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getNetworkMagic,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (res.success) {
      return res.networkMagic;
    }
    throw getApiError(res.error, "getNetworkMagic");
  };
  const getUsedAddresses = async (paginate) => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getUsedAddresses,
      payload: {
        origin: _origin,
        paginate: paginate ?? DEFAULT_PAGINATE
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      if (res.error.code > 0) {
        throw getPaginateError(res.error);
      }
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.usedAddrList) {
        return res.usedAddrList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "usedAddrList missing" });
    }
    throw getApiError(null, "getUsedAddresses");
  };
  const getUnusedAddresses = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getUnusedAddresses,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.unusedAddrList) {
        return res.unusedAddrList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "unusedAddrList missing" });
    }
    throw getApiError(null, "getUnusedAddresses");
  };
  const getForcedUnusedAddresses = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getForcedUnusedAddresses,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.unusedAddrList) {
        return res.unusedAddrList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "unusedAddrList missing" });
    }
    throw getApiError(null, "getForcedUnusedAddresses");
  };
  const getRewardAddresses = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getRewardAddresses,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.rewardAddrList) {
        return res.rewardAddrList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "rewardAddrList missing" });
    }
    throw getApiError(null, "getRewardAddresses");
  };
  const getChangeAddress = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getChangeAddress,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.changeAddr) {
        return res.changeAddr;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "changeAddr missing" });
    }
    throw getApiError(null, "getChangeAddress");
  };
  const getBalance = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getBalance,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.balanceCbor) {
        return res.balanceCbor;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "balanceCbor missing" });
    }
    throw getApiError(null, "getBalance");
  };
  const getUtxos = async (amount, paginate) => {
    if (amount && typeof amount !== "string") {
      throw getApiError({ code: ApiErrorCode.InvalidRequest, info: "invalid amount type: " + typeof amount });
    }
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getUtxos,
      payload: {
        origin: _origin,
        amount: amount ?? null,
        paginate: paginate ?? DEFAULT_PAGINATE
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      if (amount && res.error.info.startsWith("invalid amount")) {
        return void 0;
      }
      if (res.error.code > 0) {
        throw getPaginateError(res.error);
      }
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.utxoList) {
        return res.utxoList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "utxoList missing" });
    }
    throw getApiError(null, "getUtxos");
  };
  const getCollateral = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getCollateral,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.collateralList) {
        return res.collateralList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "collateralList missing" });
    }
    throw getApiError(null, "getCollateral");
  };
  const getLockedUtxos = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getLockedUtxos,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.lockedUtxoList) {
        return res.lockedUtxoList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "lockedUtxoList missing" });
    }
    throw getApiError(null, "getLockedUtxos");
  };
  const signTx = async (tx, partialSign = false) => {
    return (await signTxs(tx ? [{ cbor: tx, partialSign }] : []))[0];
  };
  const signTxs = async (txList) => {
    if (!txList || txList.length === 0) {
      throw getApiError({ code: ApiErrorCode.InvalidRequest, info: "txList missing" });
    }
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.signTx,
      payload: {
        origin: _origin,
        txList: txList ?? []
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getTxSignError(res.error);
    }
    if (res.success) {
      if (res.witnessSetList) {
        return res.witnessSetList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "witnessSetList missing" });
    }
    throw getApiError(null, "signTx");
  };
  const signData = async (addr, sigStructure) => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.signData,
      payload: {
        origin: _origin,
        addr: addr ?? null,
        sigStructure: sigStructure ?? null
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getDataSignError(res.error);
    }
    if (res.success) {
      if (res.signedData) {
        return res.signedData;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "signedData missing" });
    }
    throw getApiError(null, "signData");
  };
  const submitTx = async (tx) => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.submitTx,
      payload: {
        origin: _origin,
        tx: tx ?? null
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getTxSendError(res.error);
    }
    if (res.success) {
      if (res.txHash) {
        return res.txHash;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "txHash missing" });
    }
    throw getApiError(null, "submitTx");
  };
  const syncAccount = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.syncAccount,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      return true;
    }
    throw getApiError(null, "syncAccount");
  };
  const getAccountPub = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getAccountPub,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.accountPub) {
        return res.accountPub;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "accountPub missing" });
    }
    throw getApiError(null, "getAccountPub");
  };
  const getPubDRepKey = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getPubDRepKey,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.drepPubKey) {
        return res.drepPubKey;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "drepPubKey missing" });
    }
    throw getApiError(null, "getPubDRepKey");
  };
  const getRegisteredPubStakeKeys = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getRegisteredPubStakeKeys,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.pubStakeKeyList && Array.isArray(res.pubStakeKeyList)) {
        return res.pubStakeKeyList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "pubStakeKeyList missing" });
    }
    throw getApiError(null, "getRegisteredPubStakeKeys");
  };
  const getUnregisteredPubStakeKeys = async () => {
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.getUnregisteredPubStakeKeys,
      payload: {
        origin: _origin
      }
    });
    const res = req.response;
    if (!res.success && res.error) {
      throw getApiError(res.error);
    }
    if (res.success) {
      if (res.pubStakeKeyList && Array.isArray(res.pubStakeKeyList)) {
        return res.pubStakeKeyList;
      }
      throw getApiError({ code: ApiErrorCode.InternalError, info: "pubStakeKeyList missing" });
    }
    throw getApiError(null, "getRegisteredPubStakeKeys");
  };
  const doEnableLogs = async (enable2) => {
    enableLogs(enable2);
    const req = await _callApi({
      reqId: getRandomId(),
      api: METHOD.enableLogs,
      payload: {
        origin: _origin,
        enable: enable2
      }
    });
    const res = req.response;
    if (!res.success) {
      throw getApiError(res.error, "enableLogs");
    }
    return enable2;
  };
  const experimentalInitial = {
    appVersion,
    enableLogs: doEnableLogs
  };
  const experimentalFull = {
    appVersion,
    getCollateral,
    getLockedUtxos,
    signTxs,
    // TODO: remove at a later stage when jpg has moved to new namespaced endpoint
    syncAccount,
    getForcedUnusedAddresses,
    getConnectedNetworkId
  };
  const initialApi = {
    isEnabled,
    enable,
    supportedExtensions,
    experimental: experimentalInitial,
    apiVersion,
    name,
    icon
  };
  const cip30Api = {
    getExtensions,
    // whitelisted extensions for origin
    getNetworkId,
    getUsedAddresses,
    getUnusedAddresses,
    getRewardAddresses,
    getChangeAddress,
    getBalance,
    getUtxos,
    signTx,
    signData,
    submitTx,
    getCollateral,
    experimental: experimentalFull
  };
  const cip95Api = {
    cip95: {
      getPubDRepKey,
      getRegisteredPubStakeKeys,
      getUnregisteredPubStakeKeys,
      signTx,
      signData
    }
  };
  const cip103Api = { cip103: { signTxs } };
  const cip104Api = { cip104: { getAccountPub } };
  const cip142Api = { cip142: { getNetworkMagic } };
  const apiMap = {
    [extCip30.cip]: cip30Api,
    [extCip95.cip]: cip95Api,
    [extCip103.cip]: cip103Api,
    [extCip104.cip]: cip104Api,
    [extCip142.cip]: cip142Api
  };
  function apiDom(bridge, addFeeAddress = false) {
    _bridge = bridge ?? null;
    if (typeof window === "undefined") {
      return;
    }
    if (addFeeAddress) {
      experimentalInitial.feeAddress = "addr1qxs76zpnfyq5w0xrpjwrkkghch0ew024j83hx0dg00f9xjrx828mrjy00s2sd8awhvummze55m8hq4fqghdzqlcaqwlshwkm0m";
    }
    cardano.eternl = initialApi;
  }
  const getApiError = (error, label) => {
    return new ApiError(
      error?.code ?? ApiErrorCode.InternalError,
      error?.info ?? "unknown error " + (label ?? "api")
    );
  };
  const getTxSignError = (error, label) => {
    return new TxSignError(
      error?.code ?? TxSignErrorCode.UserDeclined,
      error?.info ?? "unknown error " + ("api")
    );
  };
  const getDataSignError = (error, label) => {
    return new DataSignError(
      error?.code ?? DataSignErrorCode.UserDeclined,
      error?.info ?? "unknown error " + ("api")
    );
  };
  const getTxSendError = (error, label) => {
    return new TxSendError(
      error?.code ?? TxSendErrorCode.Failure,
      error?.info ?? "unknown error " + ("api")
    );
  };
  const getPaginateError = (error, label) => {
    return new PaginateError(
      error?.maxPages ?? -1,
      error?.info ?? "unknown error " + ("api")
    );
  };

  const isIframe = true; //mobile dapp browser
  const _reqIdMap = /* @__PURE__ */ new Map();
  const _reqResolveMap = /* @__PURE__ */ new Map();
  const _reqRejectMap = /* @__PURE__ */ new Map();
  const _sendList = [];
  let _token = void 0;
  const getTokenFromQuery = () => {
    if (typeof _token !== "undefined") {
      return _token;
    }
    const domScript = document.getElementById("eternl-dom-script");
    _token = domScript ? domScript.getAttribute("data-token") : null;
    return _token;
  };
  const _sentReinjectedList = [];
  const sender = {
    send: (data) => {
      data.channel = ApiChannel.domToCS;
      data.payload.domId = window.domId;
      data.payload.contentId = getTokenFromQuery();
      data.payload.isIframe = isIframe;
      const req = new Promise((resolve, reject) => {
        _reqResolveMap.set(data.reqId, resolve);
        _reqRejectMap.set(data.reqId, reject);
        _sendList.push(data);
      });
      _reqIdMap.set(data.reqId, req);
      return req;
    }
  };
  const onMessageHandlerEternlDOM = (data) => {
    if (!data) {
      return;
    }
    if ((data?.channel ?? "") !== ApiChannel.csToDom) {
      if (data?.channel && (data?.channel ?? "") !== ApiChannel.domToCS) {
        console.error("dom:receive wrong channel:", data?.channel);
      }
      return;
    }
    const _domId = data?.payload?.domId;
    if (!_domId) {
      return console.error("dom:receive no data domId");
    } else if (_domId !== window.domId) {
      console.error("dom:receive wrong domId:", _domId, "!=", window.domId);
      return;
    }
    const reqId = data.reqId ?? null;
    if (!reqId) {
      return;
    }
    const promise = _reqIdMap.get(reqId) ?? null;
    if (!promise) {
      if (data.api === "reinjected") {
        if (_sentReinjectedList.includes(data.payload.storeId)) {
          return;
        }
        data.channel = ApiChannel.domToCS;
        data.payload.domId = window.domId;
        _sentReinjectedList.push(data.payload.storeId);
        const webkitSender = window.webkit?.messageHandlers?.cordova_iab;
        if (webkitSender) {
          webkitSender.postMessage(JSON.stringify(data));
        } else {
          window.postMessage(data, "*");
        }
        return;
      }
      return;
    }
    _reqIdMap.delete(reqId);
    const resolve = _reqResolveMap.get(reqId) ?? null;
    const reject = _reqRejectMap.get(reqId) ?? null;
    _reqResolveMap.delete(reqId);
    _reqRejectMap.delete(reqId);
    if (!resolve || !reject) {
      return;
    }
    if (data.response && data.response.error && data.response.error.info === "no account set") {
      setTimeout(() => {
        resolve(data);
      }, 1e3);
    } else {
      resolve(data);
    }
  };
  const initEternlDomAPI = () => {
    if (window.onMessageHandlerEternlDOM) {
      console.error("initEternlDomAPI: Already SET", window.domId, isIframe);
      return;
    }
    window.onMessageHandlerEternlDOM = onMessageHandlerEternlDOM;
    window.domId = getRandomId();
    console.warn("initEternlDomAPI: domId", window.domId, isIframe);
    console.warn("initEternlDomAPI: href", window.location.href);
    if (typeof window === "undefined") {
      return;
    }
    const ancestorOrigins = window?.location?.ancestorOrigins;
    if (!ancestorOrigins) {
      return;
    }
    if (ancestorOrigins.length > 0) {
      for (let i = 0; i < ancestorOrigins.length; i++) {
        const origin = ancestorOrigins[i];
        if (origin.includes("eternl.io") || origin.includes("localhost")) {
          return;
        }
      }
    }
    if (!window.hasOwnProperty("cardano")) {
      window.cardano = {};
    }
    setInterval(() => {
      if (_sendList.length === 0) {
        return;
      }
      const webkitSender = window.webkit?.messageHandlers?.cordova_iab;
      if (webkitSender) {
        webkitSender.postMessage(JSON.stringify(_sendList.shift()));
      } else {
        window.postMessage(_sendList.shift(), "*");
      }
    }, 16);
    window.addEventListener("message", (msg) => {
      if (msg.source != window) {
        return;
      }
      onMessageHandlerEternlDOM(msg.data);
    });
    apiDom(sender, isIframe);
  };
  initEternlDomAPI();

})();
`;

const _entry$1 = ref(null);
const _open = ref(0);
const openModalDappBrowser$1 = (entry) => {
  _entry$1.value = entry;
  _open.value = _open.value + 1;
};
const closeModalDappBrowser = () => {
  _entry$1.value = null;
};
const useModalDappBrowser = () => {
  return {
    dappBrowserEntry: _entry$1,
    dappBrowserOpen: _open,
    openModalDappBrowser: openModalDappBrowser$1,
    closeModalDappBrowser
  };
};

const doLog = false;
const storeId = "IAB";
const {
  openModalDappBrowser
} = useModalDappBrowser();
const { isDarkMode } = useDarkMode();
const {
  isOpenBiometricsAction
} = useBiometricsAction();
const { dappAccount } = useDappAccount();
const showURLInput = computed(() => !(isPWAApp() && !isBetaApp() && !isStagingApp()));
const dappURL = ref("");
const clearCache = ref(true);
const onFilter = (category) => {
  toggleInactiveCategory(category);
};
const onFilterAll = () => {
  clearInactiveCategory();
};
const onEnterDappURL = (addAsFavorite = false) => {
  const entry = processInput(dappURL.value);
  if (addAsFavorite && !!entry && !isFavoriteEntry(entry)) {
    toggleFavoriteEntry(entry);
  }
  openDappBrowser(entry);
};
const onSelect = (entry) => {
  openDappBrowser(processInput(entry.url));
};
const onRemove = (entry) => {
  removeEntry(entry);
};
const openDappBrowser = (entry) => {
  if (!entry) {
    return;
  }
  if (isMobileApp()) {
    openInAppBrowser(entry);
  } else {
    openModalDappBrowser(entry);
  }
};
const processInput = (urlOrTrigger = "") => {
  if (!urlOrTrigger) {
    return null;
  }
  try {
    let maybeTrigger = "";
    let __dappURL = urlOrTrigger;
    const allowAllURLs = isBetaApp() || isStagingApp() || isBexApp() || isMobileApp();
    if (!allowAllURLs) {
      if (urlOrTrigger.startsWith("http://")) {
        urlOrTrigger = urlOrTrigger.replace("http://", "");
      }
      if (urlOrTrigger.startsWith("https://")) {
        urlOrTrigger = urlOrTrigger.replace("https://", "");
      }
      if (urlOrTrigger.startsWith("file://")) {
        urlOrTrigger = urlOrTrigger.replace("file://", "");
      }
      if (urlOrTrigger.startsWith("blob://")) {
        urlOrTrigger = urlOrTrigger.replace("blob://", "");
      }
      if (urlOrTrigger.startsWith("ipfs://")) {
        urlOrTrigger = urlOrTrigger.replace("ipfs://", "");
      }
      maybeTrigger = urlOrTrigger.split(" ")[0];
      __dappURL = "https://" + urlOrTrigger;
    } else {
      if (!urlOrTrigger.startsWith("http://") && !urlOrTrigger.startsWith("https://") && !urlOrTrigger.startsWith("file://") && !urlOrTrigger.startsWith("blob://") && !urlOrTrigger.startsWith("ipfs://")) {
        maybeTrigger = urlOrTrigger.split(" ")[0];
        __dappURL = "https://" + urlOrTrigger;
      }
    }
    if (!allowAllURLs && networkId.value === "mainnet" && maybeTrigger !== "") {
      for (const entry2 of entryListRaw.value) {
        if (entry2.trigger?.includes(maybeTrigger)) {
          return entry2;
        }
      }
    } else {
      for (const entry2 of entryListRaw.value) {
        if (entry2.url === __dappURL) {
          return entry2;
        }
      }
    }
    const _dappURL = new URL(__dappURL);
    if (!allowAllURLs) {
      for (const entry2 of entryListRaw.value) {
        if (entry2.url.includes(_dappURL.host)) {
          return entry2;
        }
      }
    }
    let origin = _dappURL.origin;
    if (origin.startsWith("http://")) {
      origin = origin.replace("http://", "");
    }
    if (origin.startsWith("https://")) {
      origin = origin.replace("https://", "");
    }
    const unverifiedCat = isIosApp() || isAndroidApp() ? [] : ["unverified"];
    let entry = {
      categoryList: [...unverifiedCat],
      url: __dappURL,
      label: __dappURL,
      isConnected: false,
      isActive: false,
      isScam: false,
      needsReload: false,
      needsDisconnect: false,
      isUnverified: true,
      origin: _dappURL.origin
    };
    entry = addEntry(entry);
    return entry;
  } catch (e) {
    const message = "Invalid URL or trigger: " + urlOrTrigger;
    console.error(message);
    const { showError } = useNotifications();
    showError(message);
  }
  return null;
};
const openInAppBrowser = async (entry) => {
  if (!entry) {
    return;
  }
  try {
    const url = entry.url;
    if (url) {
      if (doLog) ;
      let options = "fullscreen=yes,hidenavigationbuttons=yes";
      if (clearCache.value) {
        clearCache.value = false;
      }
      if (isAndroidApp()) {
        options += ",location=yes,zoom=no,shouldPauseOnSuspend=yes";
      } else {
        options += ",location=no,disallowoverscroll=yes,toolbar=yes,toolbarposition=top,toolbartranslucent=false,allowInlineMediaPlayback=yes,presentationstyle=fullscreen";
      }
      if (isDarkMode.value) {
        const bg = "#272727";
        const c = "#a5a5a5";
        options += `,toolbarcolor=${bg},navigationbuttoncolor=${c},closebuttoncolor=${c}`;
      } else {
        const bg = "#d6d6d6";
        const c = "#292929";
        options += `,toolbarcolor=${bg},navigationbuttoncolor=${c},closebuttoncolor=${c}`;
      }
      const $t = getTranslate();
      options += ",closebuttoncaption=" + $t("common:close");
      const ref2 = await cordova.InAppBrowser.open(encodeURI(url), "_blank", options);
      ref2.addEventListener("exit", (event) => {
        console.log("IAB: exit", event);
      });
      ref2.addEventListener("loadstart", (event) => {
        console.log("IAB: loadstart", event);
      });
      ref2.addEventListener("beforeload", (event) => {
        console.log("IAB: beforeload", event);
      });
      ref2.addEventListener("loaderror", (event) => {
        console.error("IAB: loaderror", event);
      });
      ref2.addEventListener("loadstop", (event) => {
        console.log("IAB: loadstop", event);
        if (doLog) ;
        ref2.executeScript({ code: DOMFile }, (result) => {
          if (doLog) ;
          if (result === null || result === "INVALID") {
            console.error("IAB: SHOW ERROR MESSAGE");
          }
        });
      });
      const sendResponse = async (req) => {
        if (doLog) ;
        req.channel = ApiChannel.csToDom;
        const _res = JSON.stringify(req);
        if (doLog) ;
        const res = `
          if (typeof window.onMessageHandlerEternlDOM === 'function') {
            window.onMessageHandlerEternlDOM(${_res});
          } else {
            console.log('No onMessageHandlerEternlDOM handler defined in InAppBrowser.');
          }
        `;
        ref2.executeScript({ code: res });
        if (doLog) ;
      };
      ref2.addEventListener("message", async (event) => {
        if (doLog) ;
        const req = event.data;
        let didHide = false;
        if (!dappAccount.value) {
          if (doLog) ;
          req.response = errorNoAccount();
          return sendResponse(req);
        }
        if (req.api === METHOD.enable) {
          checkEnable(req, dappAccount.value.id);
          if (doLog) ;
          if (req.response) {
            return sendResponse(req);
          }
        }
        let stopWatcher = void 0;
        let toid = -1;
        if (req.api === METHOD.enable || req.api === METHOD.signTx || req.api === METHOD.signTxs || req.api === METHOD.signData) {
          didHide = true;
          if (doLog) ;
          stopWatcher = watch(isOpenBiometricsAction, (newValue, oldValue) => {
            if (doLog) ;
            if (oldValue && !newValue) {
              clearTimeout(toid);
              if (isAndroidApp()) {
                toid = setTimeout(() => {
                  clearTimeout(toid);
                  if (!didHide) {
                    return;
                  }
                  ref2.show();
                  nextTick(() => {
                    if (!didHide) {
                      return;
                    }
                    ref2.hide();
                  });
                }, 500);
              }
            }
          });
          ref2.hide();
        }
        if (doLog) ;
        await handleApiRequest(req, dappAccount.value, true, true);
        if (doLog) ;
        if (didHide) {
          if (doLog) ;
          didHide = false;
          ref2.show();
        }
        if (stopWatcher) {
          if (doLog) ;
          clearTimeout(toid);
          stopWatcher();
        }
        return sendResponse(req);
      });
    }
  } catch (e) {
    console.log("IAB: error", e);
  }
};
const useOpenDAppBrowser = () => {
  return {
    dappURL,
    showURLInput,
    openDappBrowser,
    onEnterDappURL,
    onSelect,
    onRemove,
    onFilter,
    onFilterAll
  };
};

const showModal = ref(false);
const _entry = ref(null);
const openModalDappBrowserInfo = (entry) => {
  _entry.value = entry;
  showModal.value = !!_entry.value;
};
const closeModalDappBrowserInfo = () => {
  showModal.value = false;
};
const useModalDappBrowserInfo = () => {
  return {
    showModalDappBrowserInfo: showModal,
    infoEntry: _entry,
    openModalDappBrowserInfo,
    closeModalDappBrowserInfo
  };
};

const _sfc_main$4 = {  };

const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
};

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [...(_cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"
    }, null, -1)
  ]))]))
}
const IconStar = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render]]);

const _hoisted_1$3 = { class: "relative w-full h-full flex flex-col et-js-is et-gap-xs pb-4" };
const _hoisted_2$3 = ["src", "alt"];
const _hoisted_3$3 = { class: "relative truncate" };
const _hoisted_4$3 = { class: "w-full max-w-full truncate text-left" };
const _hoisted_5$3 = { class: "w-full px-4 flex flex-row et-jb" };
const _hoisted_6$2 = { class: "flex flex-wrap et-gap-sm" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DappBrowserListCard",
  props: {
    entry: { type: Object, required: true },
    size: { type: String, required: false, default: void 0 },
    selectable: { type: Boolean, required: false, default: false },
    showInfo: { type: Boolean, required: false, default: true }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const {
      openModalDappBrowserInfo
    } = useModalDappBrowserInfo();
    const {
      openModalDappBrowser
    } = useModalDappBrowser();
    const showInfo = computed(() => props.showInfo && !(props.entry?.categoryList.includes("unverified") ?? true));
    const imgUrl = ref(noLogo);
    const cssLabel = computed(() => {
      if (props.size === "small") {
        return "et-text-sm font-medium";
      }
      return "et-text-md font-semibold";
    });
    const isSelected = computed(() => props.entry?.isConnected ?? false);
    const isFavorite = computed(() => favoriteIdList.value.includes(props.entry.label));
    const hasLogo = computed(() => imgUrl.value !== noLogo);
    const onSelect = () => {
      if (isMobileApp()) {
        emit("select", props.entry);
      } else {
        openModalDappBrowser(props.entry);
      }
    };
    const onErrorImage = () => {
      imgUrl.value = noLogo;
    };
    const onToggleFavorite = () => {
      toggleFavoriteEntry(props.entry);
    };
    watch(() => props.entry, (entry) => {
      if (!entry) {
        imgUrl.value = noLogo;
        return;
      }
      if (typeof entry.image === "string") {
        imgUrl.value = entry.image;
      } else if (typeof entry.image === "object") {
        imgUrl.value = entry.image.banner ?? noLogo;
      } else {
        imgUrl.value = noLogo;
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass(["transaction-item relative p-0 et-js-ic rounded-card shadow-sm border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)]", __props.selectable ? "cursor-pointer hover:bg-[var(--p-button-text-secondary-hover-background)]" : "cursor-default"]),
        severity: "secondary",
        "data-ui": isSelected.value ? "active" : "",
        text: "",
        onClick: withModifiers(onSelect, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$3, [
            createBaseVNode("img", {
              class: normalizeClass(["w-full", !hasLogo.value ? "object-contain aspect-3/1 border-b-1 border-border-1" : "object-cover aspect-5/1 xs:aspect-3/1"]),
              src: imgUrl.value,
              alt: __props.entry.label + " " + unref($t)("common:logo"),
              onError: onErrorImage
            }, null, 42, _hoisted_2$3),
            createBaseVNode("div", {
              class: normalizeClass(["px-4 py-2 w-full max-w-full flex flex-row et-gap-sm et-js-ic et-text-xl text-left truncate", cssLabel.value])
            }, [
              createBaseVNode("div", _hoisted_3$3, [
                createBaseVNode("div", _hoisted_4$3, toDisplayString(__props.entry.label), 1)
              ]),
              createVNode(_component_Button, {
                class: "shrink-0 p-0",
                rounded: "",
                link: "",
                onClick: withModifiers(onToggleFavorite, ["prevent", "stop"])
              }, {
                default: withCtx(() => [
                  createVNode(IconStar, {
                    class: normalizeClass(["size-5", isFavorite.value ? "fill-txt-highlight stroke-none" : "fill-none"])
                  }, null, 8, ["class"])
                ]),
                _: 1
              })
            ], 2),
            createBaseVNode("div", _hoisted_5$3, [
              createBaseVNode("div", _hoisted_6$2, [
                createVNode(_sfc_main$6, {
                  badges: __props.entry.categoryList.map((i) => ({ id: i, label: i })),
                  size: unref(isSmallerThanSM) ? "tiny" : "small",
                  "add-colors": ""
                }, null, 8, ["badges", "size"])
              ]),
              createBaseVNode("div", null, [
                showInfo.value ? (openBlock(), createBlock(_component_Button, {
                  key: 0,
                  class: "shrink-0 px-4",
                  label: unref($t)("common:info"),
                  size: "small",
                  severity: "secondary",
                  rounded: "",
                  outlined: "",
                  onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(openModalDappBrowserInfo)(__props.entry), ["prevent", "stop"]))
                }, null, 8, ["label"])) : createCommentVNode("", true)
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["class", "data-ui"]);
    };
  }
});

const _hoisted_1$2 = ["src", "alt"];
const _hoisted_2$2 = { class: "relative truncate" };
const _hoisted_3$2 = { class: "w-full max-w-full truncate text-left" };
const _hoisted_4$2 = { class: "grow flex flex-row et-je-ic et-gap-xs" };
const _hoisted_5$2 = {
  key: 0,
  class: "w-full flex flex-row et-js-ic et-gap-xs"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DappBrowserListCardSmall",
  props: {
    entry: { type: Object, required: true },
    size: { type: String, required: false, default: void 0 },
    selectable: { type: Boolean, required: false, default: false },
    showInfo: { type: Boolean, required: false, default: true }
  },
  emits: ["select", "remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      openModalDappBrowserInfo
    } = useModalDappBrowserInfo();
    const {
      openModalDappBrowser
    } = useModalDappBrowser();
    const imgUrl = ref(noLogo);
    const triedFavicon = ref(false);
    const _unverified = computed(() => props.entry?.categoryList.includes("unverified") || !props.entry?.categoryList || props.entry?.categoryList.length === 0);
    const _showInfo = computed(() => props.showInfo && !(_unverified.value ?? true));
    const isSelected = computed(() => props.entry?.isConnected ?? false);
    const isFavorite = computed(() => favoriteIdList.value.includes(props.entry.label) || favoriteIdList.value.includes(props.entry.url));
    const hasLogo = computed(() => imgUrl.value !== noLogo);
    const onSelect = () => {
      if (isMobileApp()) {
        emit("select", props.entry);
      } else {
        openModalDappBrowser(props.entry);
      }
    };
    const onErrorImage = () => {
      imgUrl.value = noLogo;
    };
    const doRemoveEntry = (entry) => {
      emit("remove", entry);
    };
    const onToggleFavorite = () => {
      toggleFavoriteEntry(props.entry);
    };
    watch(() => props.entry, (entry) => {
      triedFavicon.value = false;
      if (!entry) {
        imgUrl.value = noLogo;
        return;
      }
      if (typeof entry.image === "string") {
        imgUrl.value = entry.image;
      } else if (typeof entry.image === "object") {
        imgUrl.value = entry.image.icon ?? noLogo;
      } else {
        triedFavicon.value = true;
        imgUrl.value = entry.url + "/favicon.ico";
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      return openBlock(), createBlock(_component_Button, {
        class: normalizeClass(["transaction-item relative p-0 et-js-ic rounded-card shadow-sm border-1 border-[var(--p-content-border-color)] data-active:border-border-highlight/50 hover:data-active:border-border-highlight bg-[var(--p-card-background)]", __props.selectable ? "cursor-pointer hover:bg-[var(--p-button-text-secondary-hover-background)]" : "cursor-default"]),
        severity: "secondary",
        "data-ui": isSelected.value ? "active" : "",
        text: "",
        onClick: withModifiers(onSelect, ["prevent", "stop"])
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["relative w-full h-full max-w-full flex flex-row et-gap-sme sm:et-gap-mde et-jc-is", hasLogo.value ? "pr-1.5 sm:pr-5" : "px-4 py-3 sm:p-5"])
          }, [
            hasLogo.value ? (openBlock(), createElementBlock("img", {
              key: 0,
              class: normalizeClass([
                "shrink-0",
                (!hasLogo.value ? "object-contain border-b-1 border-border-1" : "object-cover") + " " + (triedFavicon.value ? "size-12 sm:size-18 p-3" : __props.showInfo ? "size-18 sm:size-24" : "size-24 sm:size-32")
              ]),
              src: imgUrl.value,
              alt: __props.entry.label + " logo",
              onError: onErrorImage
            }, null, 42, _hoisted_1$2)) : createCommentVNode("", true),
            createBaseVNode("div", {
              class: normalizeClass(["grow h-full flex flex-col et-jc-ic truncate", (__props.showInfo ? "et-gap-xs sm:et-gap-sm" : "et-gap-sm sm:et-gap-sme") + " " + (hasLogo.value ? "pb-0.5 sm:pb-0" : "")])
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["w-full max-w-full flex flew-row et-js-ic et-gap-xs sm:et-gap-sm", __props.showInfo ? "et-text-md font-medium" : "et-text-2xl font-medium"])
              }, [
                createBaseVNode("div", _hoisted_2$2, [
                  createBaseVNode("div", _hoisted_3$2, toDisplayString(__props.entry.label), 1)
                ]),
                createVNode(_component_Button, {
                  class: "shrink-0 p-0",
                  rounded: "",
                  link: "",
                  onClick: withModifiers(onToggleFavorite, ["prevent", "stop"])
                }, {
                  default: withCtx(() => [
                    createVNode(IconStar, {
                      class: normalizeClass((__props.showInfo ? "size-5" : "size-6") + " " + (isFavorite.value ? "fill-txt-highlight stroke-none" : "fill-none"))
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_4$2, [
                  _showInfo.value ? (openBlock(), createBlock(_component_Button, {
                    key: 0,
                    class: "shrink-0 p-0",
                    rounded: "",
                    link: "",
                    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => unref(openModalDappBrowserInfo)(__props.entry), ["prevent", "stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(IconInfo, { class: "size-6" })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _unverified.value && !unref(isFavoriteEntry)(__props.entry) ? (openBlock(), createBlock(_component_Button, {
                    key: 1,
                    class: "shrink-0 p-0",
                    rounded: "",
                    link: "",
                    onClick: _cache[1] || (_cache[1] = withModifiers(($event) => doRemoveEntry(__props.entry), ["prevent", "stop"]))
                  }, {
                    default: withCtx(() => [
                      createVNode(IconDelete02, { class: "size-6" })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ])
              ], 2),
              __props.entry.categoryList.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
                createVNode(_sfc_main$6, {
                  "css-badge": "shrink!",
                  badges: __props.entry.categoryList.map((i) => ({ id: i, label: i })),
                  size: __props.showInfo ? "tiny" : "small",
                  "add-colors": "",
                  "no-action": ""
                }, null, 8, ["badges", "size"])
              ])) : createCommentVNode("", true)
            ], 2)
          ], 2)
        ]),
        _: 1
      }, 8, ["class", "data-ui"]);
    };
  }
});

const _hoisted_1$1 = {
  ref: "container",
  class: "relative w-full flex flex-col et-js-is et-gap-md @container sm:mt-16 et-max-width-page"
};
const _hoisted_2$1 = { class: "w-full flex flex-col et-gap-md lg:et-gap-md max-w-10xl" };
const _hoisted_3$1 = { class: "w-full flex flex-wrap et-gap-x-sm et-gap-y-sm" };
const _hoisted_4$1 = {
  key: 0,
  class: "w-full flex flex-wrap et-gap-sm mb-2"
};
const _hoisted_5$1 = { class: "col-span-full pl-3 et-text-lg font-semibold cap-first" };
const _hoisted_6$1 = { class: "col-span-full pl-3 et-text-lg font-semibold cap-first" };
const _hoisted_7$1 = { class: "col-span-full pl-3 et-text-lg font-semibold cap-first" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DappBrowserList",
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanSM } = useScreenSize();
    const {
      dappURL,
      showURLInput,
      onEnterDappURL,
      onSelect,
      onRemove,
      onFilter,
      onFilterAll
    } = useOpenDAppBrowser();
    const cssGrid = computed(() => {
      return "                 et-gap-sm      grid-cols-1  @lg:grid-cols-2 @2xl:et-gap-md @5xl:grid-cols-3";
    });
    return (_ctx, _cache) => {
      const _component_InputGroupAddon = resolveComponent("InputGroupAddon");
      const _component_InputText = resolveComponent("InputText");
      const _component_Button = resolveComponent("Button");
      const _component_InputGroup = resolveComponent("InputGroup");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            unref(showURLInput) ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
              createVNode(_component_InputGroup, { class: "grow sm:max-w-120 rounded-full" }, {
                default: withCtx(() => [
                  createVNode(_component_InputGroupAddon, { pt: { root: "rounded-l-full px-4" } }, {
                    default: withCtx(() => [..._cache[4] || (_cache[4] = [
                      createTextVNode("https://", -1)
                    ])]),
                    _: 1
                  }),
                  createVNode(_component_InputText, {
                    modelValue: unref(dappURL),
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(dappURL) ? dappURL.value = $event : null),
                    placeholder: unref($t)("dappBrowser-page:list.input.domain"),
                    pt: { root: "rounded-none" },
                    tabindex: -1,
                    onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => unref(onEnterDappURL)(unref(isIosApp)() || unref(isAndroidApp)()), ["enter"]))
                  }, null, 8, ["modelValue", "placeholder"]),
                  createVNode(_component_InputGroupAddon, { pt: { root: "rounded-r-full" } }, {
                    default: withCtx(() => [
                      createVNode(_component_Button, {
                        pt: { root: "rounded-r-full pr-1.5" },
                        icon: "pi pi-times",
                        severity: "secondary",
                        onClick: _cache[2] || (_cache[2] = ($event) => dappURL.value = "")
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Button, {
                label: unref($t)("common:open"),
                severity: "secondary",
                rounded: "",
                outlined: "",
                onClick: _cache[3] || (_cache[3] = ($event) => unref(onEnterDappURL)(unref(isIosApp)() || unref(isAndroidApp)()))
              }, null, 8, ["label"])
            ])) : createCommentVNode("", true),
            unref(hasRawEntries) && !unref(isIosApp)() ? (openBlock(), createBlock(_sfc_main$6, {
              key: 1,
              badges: unref(categoryList).map((i) => ({ id: i, label: i, action: () => unref(onFilter)(i), isSelected: unref(categoryListInactive).includes(i) })),
              size: unref(isSmallerThanSM) ? "small" : "small",
              cssBadge: unref(isSmallerThanSM) ? "h-8" : "py-1.25",
              "add-colors": ""
            }, null, 8, ["badges", "size", "cssBadge"])) : createCommentVNode("", true),
            unref(categoryListInactive).length > 0 ? (openBlock(), createBlock(_component_Button, {
              key: 2,
              class: normalizeClass(["px-6", unref(isSmallerThanSM) ? "h-8" : ""]),
              label: unref($t)("common:all"),
              size: "small",
              severity: "secondary",
              rounded: "",
              outlined: "",
              onClick: unref(onFilterAll)
            }, null, 8, ["class", "label", "onClick"])) : createCommentVNode("", true)
          ]),
          unref(hasFavorites) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["w-full h-full grid max-w-10xl", cssGrid.value])
          }, [
            createBaseVNode("div", _hoisted_5$1, toDisplayString(unref($t)("common:favorites")), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(entryListFavorites), (entry) => {
              return openBlock(), createElementBlock(Fragment, null, [
                entry ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  entry,
                  size: "small",
                  selectable: "",
                  onSelect: unref(onSelect),
                  onRemove: unref(onRemove)
                }, null, 8, ["entry", "onSelect", "onRemove"])) : createCommentVNode("", true)
              ], 64);
            }), 256))
          ], 2)) : createCommentVNode("", true),
          unref(hasPromoted) ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["w-full h-full grid max-w-10xl", cssGrid.value])
          }, [
            createBaseVNode("div", _hoisted_6$1, toDisplayString(unref($t)("common:promoted")), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(entryListPromoted), (entry) => {
              return openBlock(), createElementBlock(Fragment, null, [
                entry ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 0,
                  entry,
                  selectable: "",
                  onSelect: unref(onSelect),
                  onRemove: unref(onRemove)
                }, null, 8, ["entry", "onSelect", "onRemove"])) : createCommentVNode("", true)
              ], 64);
            }), 256))
          ], 2)) : createCommentVNode("", true),
          unref(hasEntries) ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(["w-full h-full grid max-w-10xl", cssGrid.value])
          }, [
            createBaseVNode("div", _hoisted_7$1, toDisplayString(unref($t)("common:dApps")), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(entryList), (entry) => {
              return openBlock(), createElementBlock(Fragment, null, [
                entry ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  entry,
                  size: "small",
                  selectable: "",
                  onSelect: unref(onSelect),
                  onRemove: unref(onRemove)
                }, null, 8, ["entry", "onSelect", "onRemove"])) : createCommentVNode("", true)
              ], 64);
            }), 256))
          ], 2)) : createCommentVNode("", true)
        ])
      ], 512);
    };
  }
});

const _hoisted_1 = { class: "page-asset-list flex flex-col et-max-width-page" };
const _hoisted_2 = { class: "relative w-full flex flex-col et-js et-gap-md" };
const _hoisted_3 = { class: "" };
const _hoisted_4 = {
  key: 1,
  class: "relative w-full mt-20 h-full flex et-js-ic"
};
const _hoisted_5 = { class: "text-txt-muted" };
const _hoisted_6 = {
  key: 2,
  class: "relative w-full mt-20 h-full flex et-js-ic"
};
const _hoisted_7 = { class: "text-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageDAppBrowser",
  setup(__props) {
    const $t = useTranslation().t;
    const { isSmallerThanXS } = useScreenSize();
    const {
      isDappAccountSet,
      isDappAccountEnabled,
      toggleDappAccountEnabled
    } = useDappAccount$1();
    return (_ctx, _cache) => {
      const _component_Button = resolveComponent("Button");
      const _component_Card = resolveComponent("Card");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$7, {
            title: unref($t)("dappBrowser-page:title"),
            animation: FxDappBrowserPageDark,
            animationClass: "absolut top-0 right-0 w-[90%] -translate-y-[15%]"
          }, createSlots({
            icon: withCtx(() => [
              createVNode(IconGlobe, { class: "size-5" })
            ]),
            _: 2
          }, [
            !unref(isSmallerThanXS) ? {
              name: "caption",
              fn: withCtx(() => [
                createBaseVNode("div", _hoisted_3, toDisplayString(unref($t)("dappBrowser-page:caption")), 1)
              ]),
              key: "0"
            } : void 0,
            !unref(isSmallerThanXS) ? {
              name: "sub-caption",
              fn: withCtx(() => [
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-txt-muted" }, " ", -1))
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["title"]),
          unref(isDappAccountSet) ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : !unref(isDappAccountEnabled) ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createVNode(_component_Card, {
              class: "et-max-width-page",
              pt: {
                body: "relative w-full et-gap-md",
                content: "flex flex-col et-gap-md"
              }
            }, {
              title: withCtx(() => [
                createBaseVNode("div", null, toDisplayString(unref($t)("dapps-enable:disabled.title")), 1)
              ]),
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_5, toDisplayString(unref($t)("dapps-enable:disabled.caption")), 1),
                createBaseVNode("div", null, [
                  createVNode(_component_Button, {
                    label: unref($t)("dapps-enable:disabled.allow"),
                    severity: "secondary",
                    rounded: "",
                    outlined: "",
                    onClick: withModifiers(unref(toggleDappAccountEnabled), ["prevent", "stop"])
                  }, null, 8, ["label", "onClick"])
                ])
              ]),
              _: 1
            })
          ])) : (openBlock(), createElementBlock("div", _hoisted_6, [
            createVNode(_component_Card, {
              class: "w-full et-max-width-page",
              "pt:body:class": "relative w-full et-gap-md"
            }, {
              content: withCtx(() => [
                createBaseVNode("div", _hoisted_7, toDisplayString(unref($t)("dapps-enable:noAccount.title")), 1)
              ]),
              _: 1
            })
          ]))
        ])
      ]);
    };
  }
});

export { ApiChannel as A, _sfc_main as _, getConnectedOriginsNameMap as a, useModalEnableCIP30 as b, addConnectedOrigin as c, useModalSignTxCIP30 as d, useModalSignDataCIP30 as e, useModalDappBrowserInfo as f, getConnectedOriginsMap as g, _sfc_main$2 as h, handleApiRequest as i, entryListFavorites as j, useModalDappBrowser as k, doLogAll as l, setOriginAccount as s, useOpenDAppBrowser as u };
