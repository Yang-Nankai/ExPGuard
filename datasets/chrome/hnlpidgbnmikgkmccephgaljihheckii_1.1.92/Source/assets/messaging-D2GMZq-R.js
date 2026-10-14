
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cb0a0a8a-062b-5e6f-84fe-f6092cdc07a6")}catch(e){}}();
import{b as e}from"./browser-polyfill-CP3dh7Ce.js";const r="sidePanel";function a(s){return e.tabs.query({currentWindow:!0,active:!0}).then(t=>e.tabs.sendMessage(t[0].id,s)).catch(console.log)}export{r as a,a as s};

//# debugId=cb0a0a8a-062b-5e6f-84fe-f6092cdc07a6
