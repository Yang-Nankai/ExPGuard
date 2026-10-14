import{j as a,A,m as y}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f3.js";import{R as ie}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f41.js";import{e as u,x,m as V,t as se,y as L,w as H,b as re,z as ce,B as le,D as T,E as M,q as de,F as k,G as ue,H as me,M as pe,I as fe,J as ge}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f25.js";import{V as S,z as D,u as ye}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f5.js";import{w as q,e as _,d as xe,V as b,C as F,s as he,p as be,f as ve}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f4.js";import{a as B}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f6.js";import{a as c,c as v}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f2.js";import{_ as h}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f8.js";import{M as we}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f55.js";import{u as W}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f56.js";import{X as E}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f7.js";import{s as w}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f43.js";import{u as Se,o as _e,a as Ee,F as je}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f.js";import{T as Ce}from"./v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f57.js";const Me=(e,t)=>{e.forEach(o=>{o.addedNodes.forEach(i=>{t(o)})})},ke=e=>{const{update:t}=V.getState(),{getElement:o}=u.getState(),{setIsOpen:i}=x.getState();Me(e,s=>{const n=s.addedNodes[0];n?.id==="main"?i(!0):n?.classList?.contains(o("closeChat"))&&(t("closeChat"),i(!1))})},ze=e=>{const{setIsThree:t}=x.getState(),{getElement:o}=u.getState();e[0].target.classList.contains(o("two"))?t(!1):t(!0)},z=(e,t,o)=>{new MutationObserver(t).observe(e,o)},$=()=>{const{getSeletor:e}=u.getState();e("menuLateral",t=>{z(t,ke,{childList:!0})}),e("waPage",t=>{z(t,ze,{attributes:!0})})},Ae=()=>{q(u.getState().getElement("paneSide"),()=>{$(),u.getState().getSeletor("whatsModal",e=>{z(e,t=>{const{setIsOpen:o}=x.getState();t[0].addedNodes.length>0?o(!1):o(!0)},{childList:!0})})})},Le=()=>{if(document.getElementById("piracy-overlay"))return;const e=document.createElement("style");e.id="piracy-styles",e.textContent=`
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
  
      .piracy-overlay {
        position: fixed;
        inset: 0;
        background: #18181B;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(8px);
        padding: 20px;
      }
  
      .piracy-modal {
        background: #09090B;
        color: #fff;
        border-radius: 20px;
        padding: 40px;
        max-width: 480px;
        width: 100%;
        max-height: 90vh;   
        overflow-y: auto; 
        animation: fadeIn 0.5s ease-out;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        gap: 28px;
        border: 1px solid #2c2c2e;
      }
  
      .piracy-icon {
        font-size: 64px;
        align-self: center;
        color: #f1c40f;
        margin-bottom: 4px;
      }
  
      .piracy-title {
        font-size: 30px;
        text-align: center;
        color: #ff4d4f;
        font-weight: 800;
        text-transform: uppercase;
        line-height: 1.1;
        margin-bottom: -8px;
      }
  
      .piracy-subtitle {
        font-size: 16px;
        text-align: center;
        color: #ffa502;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
  
      .piracy-text {
        font-size: 15px;
        line-height: 1.7;
        color: #dcdde1;
        text-align: center;
      }
  
      .piracy-text p {
        margin: 0 0 16px 0;
      }
  
      .piracy-text p:last-child {
        margin-bottom: 0;
      }
  
      .piracy-text strong {
        color: #ff6b6b;
      }
  
      .piracy-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        justify-content: center;
        margin-top: 8px;
      }
  
      .piracy-btn-primary, .piracy-btn-secondary {
        padding: 14px 28px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
  
      .piracy-btn-primary {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        border: none;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      }
  
      .piracy-btn-primary:hover {
        background: linear-gradient(135deg, #059669, #047857);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
      }
  
      .piracy-btn-secondary {
        background: transparent;
        color: #f39c12;
        border: 2px solid #f39c12;
      }
  
      .piracy-btn-secondary:hover {
        background: #f39c12;
        color: #fff;
        transform: translateY(-2px);
      }
  
      .piracy-footer {
        font-size: 12px;
        color: #a4b0be;
        text-align: center;
        margin-top: 16px;
        line-height: 1.5;
      }
  
      .piracy-brand {
        color: #10b981;
        font-weight: 800;
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
      }
  
      @media (max-width: 480px) {
        .piracy-modal {
          padding: 32px 24px;
          gap: 24px;
        }
        .piracy-title {
          font-size: 24px;
        }
        .piracy-icon {
          font-size: 56px;
        }
        .piracy-buttons {
          flex-direction: column;
        }
        .piracy-btn-primary, .piracy-btn-secondary {
          width: 100%;
        }
      }
    `,document.head.appendChild(e);const t=`
      <div class="piracy-modal">
        <div class="piracy-icon">⚠️</div>
        <div class="piracy-title">Pirataria Detectada</div>
        <div class="piracy-subtitle">Extensão não oficial</div>
        <div class="piracy-text">
          <p><strong>Atenção:</strong> Esta extensão foi identificada como <strong>pirata</strong>.</p>
          <p>Ela pode conter <strong>malware</strong>, capturar seus dados ou comprometer sua segurança.</p>
          <p><strong>Crime:</strong> Violação de direitos autorais prevista na Lei 9.610/98.</p>
          <p>Evite riscos: use a versão oficial da Chrome Web Store.</p>
        </div>
        <div class="piracy-buttons">
          <button class="piracy-btn-primary" id="piracy-store-btn">Ir para versão oficial</button>
          <button class="piracy-btn-secondary" id="piracy-support-btn">Fale conosco</button>
        </div>
        <div class="piracy-footer">
          Proteja-se e use fontes oficiais. <br/>
          <span>waTidy</span> - Extensão Oficial
        </div>
      </div>
    `,o=document.createElement("div");o.className="piracy-overlay",o.id="piracy-overlay",o.innerHTML=t,o.addEventListener("click",i=>{const s=i.target;if(s){if(s.id==="piracy-store-btn")window.open("https://chromewebstore.google.com/detail/gjlfpggiddcminhebiejofeglfjmleli","_blank");else if(s.id==="piracy-support-btn"){const n=document.createElement("a");n.href="https://wa.me/553129424122?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Notei%20que%20estou%20usando%20uma%20vers%C3%A3o%20n%C3%A3o%20oficial%20da%20extens%C3%A3o%20e%20gostaria%20de%20migrar%20para%20a%20vers%C3%A3o%20oficial.%20Podem%20me%20ajudar%20com%20isso%3F",n.target="_blank",n.rel="noreferrer",n.click()}}}),requestAnimationFrame(()=>{document.body.innerHTML="",document.body.appendChild(o)})},Ne=async()=>{const{config:e,getUrl:t}=_.getState(),{session:o,user:i}=S.getState(),{domSelector:s}=u.getState(),n=xe();if(s.update_path_active!=="true")return;const r={phone:(await D.Conn("getMyDeviceId")).user,chromeStoreID:chrome.runtime.id,checkout:n,painel_cliente:b.painel_cliente,backend:b.backend_plugin,user_logado:{session:o,user:i},nome:e.name,tutorial:t("redes_sociais","youtube").link,suporte_clientes:{premium:t("principais","suporte_premium").link,gratuitos:t("principais","suporte_gratuitos").link},timeZone:se()};(await B.post(s.update_path_new,r,{headers:{"Content-Type":"application/json","access-token":b.cript_key}})).data.pt&&Le()},Y=c.createContext(void 0);function St(){const e=c.useContext(Y);if(!e)throw new Error("Place PrivacityContext inside PrivacityProvider");return e}const P={privacitySettings:!0};function Ie({children:e}){const t={photoHidden:{hide:!1},nameHidden:{hide:!1},midiaHidden:{hide:!1},galeryHidden:{hide:!1},lastMessageHidden:{hide:!1},messageHidden:{hide:!1}},[o,i]=c.useState(t);return c.useEffect(()=>{if(P.privacitySettings&&localStorage.getItem("privacityOptions")){let n=F.decryptData(localStorage.getItem("privacityOptions"));i(n),P.privacitySettings=!1}else{let n=F.encryptData(o);localStorage.setItem("privacityOptions",n)}let s="";Object.entries(o).map(([n,r])=>{r.hide&&(s+=n+" ")}),s.length===0?document.body.removeAttribute("hide"):document.body.setAttribute("hide",s)},[o]),a.jsx(Y.Provider,{value:{privacityOptions:o,setPrivacityOptions:i},children:e})}const Oe=c.lazy(() => __vitePreload(()=>import(chrome.runtime.getURL("content/assets/js/v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f49.js")).then(e=>e.i),[]));function Te(){return L(t=>t.activeHeader)&&a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Oe,{})})}const Fe=c.lazy(() => __vitePreload(()=>import(chrome.runtime.getURL("content/assets/js/v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f50.js")),[]));function Pe(){return a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Fe,{})})}const G=document.createElement("section");G.setAttribute("data-id","ChatName");const U=document.createElement("section");U.setAttribute("data-id","MenuVertical");const X=document.createElement("section");X.setAttribute("data-id","MenuHorizontal");const J=document.createElement("section");J.setAttribute("data-id","ActionMonitor");const N=document.createElement("section");N.setAttribute("data-id","AssistenteDeChat");const j=document.createElement("section");j.setAttribute("data-id","FooterIconsLeft");j.setAttribute("style","display: contents;");const I=document.createElement("section");I.setAttribute("data-id","FooterIconsRight");const Re=[{father:()=>u.getState().getSeletor("chatName"),children:G,type:"insert",renderInblockChat:!0},{father:()=>u.getState().getSeletor("menuVertical"),children:U,type:"prepend",renderInblockChat:!0},{father:()=>u.getState().getSeletor("menuHorizontal"),children:X,type:"prepend",renderInblockChat:!0},{father:()=>u.getState().getSeletor("assistenteChat"),children:N,type:"prepend",renderInblockChat:!1},{father:()=>u.getState().getSeletor("actionMonitor"),children:J,type:"insertAdjacentElement",renderInblockChat:!1},{father:()=>u.getState().getSeletor("footerIconsLeft"),children:j,type:"prepend",renderInblockChat:!1},{father:()=>u.getState().getSeletor("respostaRapida"),children:I,type:"appendChild",renderInblockChat:!1}];function Ve(){const e=H(t=>t.activeChat);c.useEffect(()=>{if(!e)return;const{getSeletor:t}=u.getState(),o=[];return Re.forEach(({father:s,children:n,type:r,renderInblockChat:l})=>{switch(r){case"prepend":s()?.prepend(n);break;case"insert":let m=s();m&&(m.innerHTML="",m.prepend(n));break;case"insertAdjacentElement":s()?.insertAdjacentElement("afterend",n);break;default:s()?.appendChild(n);break}}),t("observerFooterNewModel",s=>{const n=new MutationObserver(r=>{r[0].removedNodes.length!==0&&(t("respostaRapida",l=>{l.appendChild(I)}),t("footerIconsLeft",l=>{l.prepend(j)}),t("assistenteChat",l=>{l.prepend(N)}))});n.observe(s,{childList:!0}),o.push(n)}),()=>{o.forEach(s=>s.disconnect())}},[e])}const He=c.lazy(() => __vitePreload(()=>import(chrome.runtime.getURL("content/assets/js/v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f51.js")),[]));function De(){const e=H(t=>t.activeChat);return Ve(),c.useEffect(()=>{if(!e)return;V.getState().update(e.id._serialized),re.getState().configAssinatura(),ce.getState().getActiveChat(e.id._serialized),le.getState().insertBtnTradutor(),e.id.user&&(T.getState().setActiveUser(e),T.getState().setActivePerfil(e.id.user)),$(),M.setState({textAssistente:""});const{assistente:t,manipulatedInputText:o,formatTextAssistente:i}=M.getState();if(t.active){const s=e.draftMessage;s?.text?.length>0&&i(s.text),o()}},[e]),e?a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(He,{})}):null}const Z=document.createElement("section");Z.setAttribute("data-id","MenuLateral");Z.setAttribute("render-mode","window");const qe=c.lazy(() => __vitePreload(()=>import(chrome.runtime.getURL("content/assets/js/v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f52.js")),[]));function Be(){const e=x(i=>i.menuContent),t=x(i=>i.isOpen),o=x(i=>i.isThree);return e.children!=="close"&&!o&&t&&a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(qe,{})})}const We=c.lazy(() => __vitePreload(()=>import(chrome.runtime.getURL("content/assets/js/v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f53.js")).then(e=>e.i),[]));function $e(){return L(t=>t.activeView)&&a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(We,{})})}function Ye(){const{type:e,modal:t,btnClose:o,close:i,disableClose:s}=de(W(p=>({type:p.type,modal:p.modal,btnClose:p.btnClose,close:p.close,disableClose:p.disableClose}))),n=c.useRef(null),r=c.useRef(null);c.useEffect(()=>{const p=d=>{const O=document.querySelector(".iziToast-wrapper"),oe=document.querySelector('section[data-id="Modal Options"]'),ae=document.querySelector('section[data-id="Modal Emoji"]'),ne=document.querySelector('section[data-id="Modal Externo"]');o&&n.current&&!r.current.contains(d.target)&&(!O||!O.contains(d.target))&&!oe&&!ae&&!ne&&i()};return t&&document.addEventListener("mousedown",p),()=>{document.removeEventListener("mousedown",p)}},[t]);const l=a.jsx("section",{"data-id":"Modal",children:a.jsx("dialog",{id:"my_modal_5",ref:n,className:"animate__animated animate__zoomIn modal modal-bottom sm:modal-middle !absolute overflow-hidden !opacity-100 !pointer-events-auto !visible",children:a.jsxs("div",{ref:r,className:"modal-box relative overflow-hidden !max-w-none !max-h-none !w-fit !h-fit",children:[!s&&a.jsx("span",{className:"absolute w-5 h-5 top-3 right-3 pulse !cursor-pointer",onClick:i,children:a.jsx(E,{className:"w-full h-full text-[var(--primary-strong)]"})}),a.jsx("div",{className:"w-full h-full",children:t})]})})}),m=a.jsx("section",{"data-id":"Modal",children:a.jsx(A,{children:a.jsx(y.div,{onClick:o?i:void 0,className:"fixed inset-0 z-[9999999] flex items-center justify-center bg-black/40 backdrop-blur-sm",children:a.jsx(y.div,{onClick:p=>p.stopPropagation(),children:t})})})});return t&&{base:l,not_structure:m}[e]}const Ge=()=>new Promise(e=>{const t=()=>{const{session:s}=S.getState(),{is_load:n,config:r}=_.getState();s.is_load&&n&&(o(),i(),e({session:s,config:r}))},o=S.subscribe(t),i=_.subscribe(t);t()}),K=async e=>{try{let t,o;if(e==="start"){const d=await Ge();t=d.session,o=d.config}else t=S.getState().session,o=_.getState().config;const i=`api/notify/get/${t.is_premium?"premium":"free"}/${o.chromeStoreID}`,s=(await B.get(`${b.backend_plugin}${i}`,{headers:{"Content-Type":"application/json",accept:"application/json","access-token":b.cript_key}})).data;if(!s.success)return;const n=s.notify.reverse(),r=n.filter(d=>d.viewer==="NOTIFY"),l=n.filter(d=>d.viewer==="MODAL"),m=n.filter(d=>d.viewer==="INBOX"),p=n.filter(d=>d.viewer==="EXTERNAL_PAGE");f.setState(d=>({notify:{...d.notify,notify:r},modal:{...d.modal,notify:l},inbox:{...d.inbox,notify:m},external_page:{...d.external_page,notify:p}}))}catch(t){console.error("Error ao capturar as notificações",t)}},Q=async e=>{e.action==="Remote-Notificacao"&&K("validate")};chrome.runtime.onMessage.addListener(Q);window.addEventListener("beforeunload",()=>{chrome.runtime.onMessage.removeListener(Q)});const R=v()(e=>({notifyNotVisualized:0,getCaixaDeEntrada:()=>{const t=k.getState().notifications,o=f.getState().notify,i=o.notify.filter(n=>!o.views.includes(n.id)),s=[...t,...i];return s.sort((n,r)=>r.data-n.data),s},getNotifyNotVisualized:()=>e(()=>{const{naoVisualizadaTam:t}=k.getState(),o=f.getState().notify;return{notifyNotVisualized:o.notify.filter(n=>!o.views.includes(n.id)).length+t}})})),Ue=e=>{setTimeout(()=>{f.getState().setActive("modal",e)},1e4)},Xe=e=>{setTimeout(()=>{f.getState().setActive("inbox",e)},5e3)},Je=e=>{f.getState().setViews("external_page",e.id),setTimeout(()=>{chrome.runtime.sendMessage({message:"promotional",path:e.link})},3e4)},C=e=>{const{notify:t,views:o}=e,i=new Set(o);return t.find(s=>!i.has(s.id))},Ze=()=>{const e=f.subscribe(n=>({notify:n.notify}),({notify:n})=>{R.getState().getNotifyNotVisualized()},{equalityFn:w,fireImmediately:!0}),t=f.subscribe(n=>({modal:n.modal}),({modal:n})=>{const r=C(n);r&&r.id!==n.active?.id&&Ue(r)},{equalityFn:w,fireImmediately:!0}),o=f.subscribe(n=>({inbox:n.inbox}),({inbox:n})=>{const r=C(n);r&&r.id!==n.active?.id&&Xe(r)},{equalityFn:w,fireImmediately:!0}),i=f.subscribe(n=>n.external_page,n=>{const r=C(n);r&&Je(r)},{equalityFn:w,fireImmediately:!0}),s=k.subscribe(()=>{R.getState().getNotifyNotVisualized()});window.addEventListener("beforeunload",()=>{e(),t(),o(),i(),s()})},f=v()(he(be(e=>({notify:{notify:[],views:[],active:null},modal:{notify:[],views:[],active:null},inbox:{notify:[],views:[],active:null},external_page:{notify:[],views:[],active:null},setViews:(t,o)=>e(i=>({[t]:{...i[t],views:[...i[t].views,o],active:null}})),setActive:(t,o)=>e(i=>({[t]:{...i[t],active:o}}))}),{name:"core_wam_notify",storage:ve(()=>ue(`core_wam_${chrome.runtime.id}`,"core_wam_notify")),version:2,partialize:e=>({notify:{notify:[],views:e.notify.views,active:null},modal:{notify:[],views:e.modal.views,active:null},inbox:{notify:[],views:e.inbox.views,active:null},external_page:{notify:[],views:e.external_page.views,active:null}}),onRehydrateStorage:()=>()=>{K("start")}})));Ze();const Ke=c.lazy(() => __vitePreload(()=>import(chrome.runtime.getURL("content/assets/js/v_7_4_3_70_852a2017-6c59-445a-bdb5-28beaffc087f54.js")),[]));function Qe({notificacao:e}){return a.jsx(c.Suspense,{fallback:a.jsx(a.Fragment,{}),children:a.jsx(Ke,{notificacao:e})})}function et(){const{modal:e,setViews:t}=f(W(o=>({modal:o.modal.active,setViews:o.setViews})));return a.jsx("section",{"data-id":"Notificacao-Modal",children:a.jsx(A,{children:e&&a.jsx(y.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-[99999999999999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",children:a.jsxs(y.div,{initial:{opacity:0,scale:.95,y:10},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:10},transition:{type:"spring",stiffness:300,damping:25,duration:.3},className:"relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-fit max-h-[90vh] flex flex-col",onClick:o=>o.stopPropagation(),children:[a.jsx("button",{onClick:()=>t("modal",e.id),className:"absolute top-3 right-3 z-50 p-1.5 rounded-full bg-white/80 hover:bg-gray-100 transition-colors cursor-pointer shadow-sm group",title:"Fechar",children:a.jsx(E,{className:"w-5 h-5 text-gray-500 group-hover:text-[var(--primaria)] transition-colors"})}),a.jsx("div",{className:"w-full h-full overflow-y-auto custom-scrollbar",children:a.jsx(Qe,{notificacao:e})})]})},"notify-overlay")})})}const ee=v(e=>({modalExterno:null,zIndex:900,btnClose:!1,auxFunc:{mounted:null,desmouted:null},open:(t,o=900,i=!1,s={mounted:null,desmouted:null})=>{s.mounted&&s.mounted(),e(()=>({modalExterno:t,zIndex:o,btnClose:i,auxFunc:s}))},close:()=>e(t=>(t.auxFunc.desmouted&&t.auxFunc.desmouted(),{modalExterno:null})),openRendertype:(t,o=900,i=!1,s={mounted:null,desmouted:null})=>{let n;t==="Active_IA"&&(n=a.jsx(me,{})),ee.getState().open(n,o,i,s)}}));function tt(){const{modalExterno:e,btnClose:t,close:o,zIndex:i}=ee(),s=c.useRef(null),n=c.useRef(null);return c.useEffect(()=>{const r=l=>{const m=document.querySelector(".iziToast-wrapper"),p=document.querySelector('section[data-id="Modal Options"]'),d=document.querySelector('section[data-id="Modal"]');t&&s.current&&!n.current.contains(l.target)&&(!m||!m.contains(l.target))&&!p&&!d&&o()};return e&&document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}},[e]),e&&a.jsx("section",{"data-id":"Modal Externo",children:a.jsx("dialog",{id:"my_modal_5",ref:s,className:"modal modal-bottom sm:modal-middle !absolute bg-[var(--modal-backdrop)] overflow-hidden !opacity-100 !pointer-events-auto !visible",style:{zIndex:i},children:a.jsxs("div",{ref:n,className:"animate__animated animate__zoomIn relative overflow-hidden !max-w-none !max-h-none !w-fit !h-fit p-[2px]",children:[t&&a.jsx("span",{className:"absolute w-5 h-5 top-3 right-3 pulse !cursor-pointer",onClick:o,children:a.jsx(E,{className:"w-full h-full text-[var(--primary-strong)]"})}),a.jsx("div",{className:"w-full h-full",children:e})]})})})}const ot=v()(e=>({modal:null,btnClose:!0,auxFunc:{mounted:null,desmouted:null},open:(t,o=!0,i={mounted:null,desmouted:null})=>e(()=>(i.mounted&&i.mounted(),{modal:t,btnClose:o,auxFunc:i})),close:()=>e(t=>(t.auxFunc.desmouted&&t.auxFunc.desmouted(),{modal:null}))}));function at(){const{modal:e,btnClose:t,close:o}=ot(),i=c.useRef(null),s=c.useRef(null);return c.useLayoutEffect(()=>{const n=r=>{const l=document.querySelector(".iziToast-wrapper"),m=document.querySelector('section[data-id="Modal Options"]'),p=document.querySelector('section[data-id="Modal Emoji"]'),d=document.querySelector('section[data-id="Modal Externo"]');t&&i.current&&!s.current.contains(r.target)&&(!l||!l.contains(r.target))&&!m&&!p&&!d&&o()};return e&&document.addEventListener("mousedown",n),()=>{document.removeEventListener("mousedown",n)}},[e]),a.jsx(A,{children:e&&a.jsx("section",{"data-id":"ModalLateral",children:a.jsx(y.div,{ref:i,initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(4px)"},exit:{opacity:0,backdropFilter:"blur(0px)"},transition:{duration:.3,ease:[.4,0,.2,1]},className:"h-full w-full fixed top-0 shadow-lg overflow-auto box-sizing z-[400] bg-black/20",style:{backgroundColor:"rgba(15, 23, 42, 0.3)"},children:a.jsxs(y.div,{ref:s,initial:{x:-400,opacity:0},animate:{x:0,opacity:1},exit:{x:-400,opacity:0},transition:{type:"spring",damping:30,stiffness:300,mass:.8},className:"modalLateral bg-white dark:bg-black border-[var(--conversation-header-border)] border-solid border-r overflow-hidden relative",children:[t&&a.jsx(y.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.2,duration:.2},className:"absolute w-5 h-5 top-3 right-3 pulse !cursor-pointer z-10",onClick:o,children:a.jsx(E,{className:"w-full h-full text-[var(--primary-strong)]"})}),a.jsx("div",{className:"absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primaria)] via-[var(--secundaria)] to-[var(--terciaria)]"}),a.jsx("div",{className:"w-full h-full",children:e})]})})})})}const nt=v()((e,t)=>({isHover:!1,content:"",options:{},referenceElement:null,style:{},open:(o,i,s,n={})=>e(()=>({isHover:!0,content:o,referenceElement:s,options:i,style:n})),close:()=>e(()=>({isHover:!1,content:"",referenceElement:null,options:{},style:{}})),openWithGetEvents:(o,i={placement:"bottom"},s={})=>{const{open:n,close:r}=t(),l=m=>{n(o,i,m.currentTarget,s)};return{onMouseEnter:l,onMouseMove:l,onFocus:l,onBlur:r,onMouseLeave:r}}}));function it(){const{isHover:e,content:t,referenceElement:o,options:i,style:s}=nt(),n=c.useRef(null),{refs:r,floatingStyles:l,context:m}=Se({...i,middleware:[_e(10),Ee({element:n})]});return c.useEffect(()=>{o&&r.setReference(o)},[o,r]),e&&a.jsx("section",{"data-id":"Tooltip",children:a.jsx("div",{ref:r.setFloating,className:"z-[9999999] outline-none",style:{...l,...s},children:a.jsxs("div",{className:`
            rounded-md 
            shadow-md 
            bg-[var(--primaria)]
            dark:bg-[var(--primaria)]
            light:bg-white 
            border 
            border-[var(--terciaria)]
            animate-in 
            fade-in 
            zoom-in-95 
            duration-150
        `,children:[a.jsx(je,{ref:n,context:m,className:"fill-[var(--primaria)] light:fill-white border-[var(--terciaria)]",strokeWidth:1}),a.jsx("div",{className:"text-[#fafafa] light:text-[#09090b] px-3 py-1.5 text-xs font-medium",children:t})]})})})}function st(){const e=u(t=>t.getSeletor);return c.useLayoutEffect(()=>{e("afiliadoMain",t=>{g.appendChild(t)})},[]),a.jsxs(Ie,{children:[a.jsx(Ye,{}),a.jsx(pe,{}),a.jsx(we,{}),a.jsx(et,{}),a.jsx(tt,{}),a.jsx(it,{}),a.jsx(at,{}),a.jsx($e,{}),a.jsx(Te,{}),a.jsx(Pe,{}),a.jsx(De,{}),a.jsx(Be,{}),a.jsx(Ce,{theme:"system",position:"top-right"})]})}const g=document.createElement("main");document.body.appendChild(g);g.setAttribute("theme-active","default");g.setAttribute("active-view-menu","true");const te=e=>{try{return e.is_load?(q(e.getElement("paneSide"),()=>{ie.createRoot(g).render(a.jsx(st,{})),g.setAttribute("active-assistente-chat",String(M.getState().assistente.active)),g.setAttribute("theme-active",String(L.getState().tema)),setTimeout(()=>{D.Whatsapp("theme",ye.getState().theme?"dark":"light")},2e3),fe(),Ne(),setTimeout(()=>{ge.setState({loadStates:!0})},3e5)}),Ae(),!0):!1}catch(t){return console.error("Erro ao inicializar o plugin:",t),!1}},rt=te(u.getState());if(!rt){const e=u.subscribe(t=>{te(t)&&e()})}chrome.runtime.sendMessage({message:"inject-code"});const _t=Object.freeze(Object.defineProperty({__proto__:null,main:g},Symbol.toStringTag,{value:"Module"}));export{J as A,G as C,j as F,U as M,f as a,X as b,N as c,I as d,Z as e,ee as f,ot as g,R as h,St as i,_t as j,nt as u};
