import { g as gsapWithCSS } from './index2.js';
import { D as DrawSVGPlugin } from './DrawSVGPlugin.js';
import { d as defineComponent, f as onMounted, m as createElementBlock, o as openBlock, v as createStaticVNode } from './index.js';

const _hoisted_1 = {
  viewBox: "0 0 168 91",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FxPortfolioAnimation",
  setup(__props) {
    gsapWithCSS.registerPlugin(DrawSVGPlugin);
    let gtl = gsapWithCSS.timeline({ paused: true });
    let cl = "";
    const play = () => {
      gtl.play("fadein");
    };
    onMounted(() => {
      gtl.addLabel("start", cl + "+=0.00");
      cl = "start";
      gtl.set(".cbar_g", { y: "100" }, cl + "+=0.0");
      gtl.set(".cbar_c", { y: "100" }, cl + "+=0.0");
      gtl.addLabel("fadein", cl + "+=0.01");
      cl = "fadein";
      gtl.addLabel("phase0", cl + "+=0.01");
      cl = "phase0";
      gtl.to(".cbar_g", { y: "0", duration: 1.2, stagger: 0.2, ease: "power2.out" }, cl + "+=0");
      gtl.to(".cbar_c", { y: "0", duration: 1.6, stagger: 0.2, ease: "power2.out" }, cl + "+=0");
      gtl.addLabel("fadeout", cl + "+=3");
      cl = "fadeout";
      gtl.seek("fadein");
      play();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [
        createStaticVNode('<g style="mix-blend-mode:luminosity;"><rect class="cbar_g" y="46" width="20" height="164" rx="10" fill="url(#paint0_linear_1_89969)"></rect></g><rect class="cbar_c" x="29" width="20" height="164" rx="10" fill="#8AD3A8"></rect><g style="mix-blend-mode:luminosity;"><rect class="cbar_g" x="58" y="28" width="20" height="164" rx="10" fill="url(#paint3_linear_1_89969)"></rect></g><g style="mix-blend-mode:luminosity;"><rect class="cbar_g" x="148" y="61" width="20" height="164" rx="10" fill="url(#paint6_linear_1_89969)"></rect></g><g style="mix-blend-mode:luminosity;"><rect class="cbar_g" x="88" y="68" width="20" height="164" rx="10" fill="url(#paint9_linear_1_89969)"></rect></g><g style="mix-blend-mode:luminosity;"><rect class="cbar_g" x="118" y="48" width="20" height="164" rx="10" fill="url(#paint12_linear_1_89969)"></rect></g><defs><linearGradient id="paint0_linear_1_89969" x1="-35.2994" y1="114.699" x2="55.1773" y2="114.668" gradientUnits="userSpaceOnUse"><stop stop-color="#44FFF9"></stop><stop offset="0.166667" stop-color="#7188FF"></stop><stop offset="0.511814" stop-color="#FF5178"></stop><stop offset="0.833333" stop-color="#FFB719"></stop><stop offset="1" stop-color="#D153D1"></stop></linearGradient><linearGradient id="paint3_linear_1_89969" x1="22.7006" y1="96.6993" x2="113.177" y2="96.6684" gradientUnits="userSpaceOnUse"><stop stop-color="#44FFF9"></stop><stop offset="0.166667" stop-color="#7188FF"></stop><stop offset="0.511814" stop-color="#FF5178"></stop><stop offset="0.833333" stop-color="#FFB719"></stop><stop offset="1" stop-color="#D153D1"></stop></linearGradient><linearGradient id="paint6_linear_1_89969" x1="112.701" y1="129.699" x2="203.177" y2="129.668" gradientUnits="userSpaceOnUse"><stop stop-color="#44FFF9"></stop><stop offset="0.166667" stop-color="#7188FF"></stop><stop offset="0.511814" stop-color="#FF5178"></stop><stop offset="0.833333" stop-color="#FFB719"></stop><stop offset="1" stop-color="#D153D1"></stop></linearGradient><linearGradient id="paint9_linear_1_89969" x1="52.7006" y1="136.699" x2="143.177" y2="136.668" gradientUnits="userSpaceOnUse"><stop stop-color="#44FFF9"></stop><stop offset="0.166667" stop-color="#7188FF"></stop><stop offset="0.511814" stop-color="#FF5178"></stop><stop offset="0.833333" stop-color="#FFB719"></stop><stop offset="1" stop-color="#D153D1"></stop></linearGradient><linearGradient id="paint12_linear_1_89969" x1="82.7006" y1="116.699" x2="173.177" y2="116.668" gradientUnits="userSpaceOnUse"><stop stop-color="#44FFF9"></stop><stop offset="0.166667" stop-color="#7188FF"></stop><stop offset="0.511814" stop-color="#FF5178"></stop><stop offset="0.833333" stop-color="#FFB719"></stop><stop offset="1" stop-color="#D153D1"></stop></linearGradient></defs>', 7)
      ])]);
    };
  }
});

export { _sfc_main as _ };
