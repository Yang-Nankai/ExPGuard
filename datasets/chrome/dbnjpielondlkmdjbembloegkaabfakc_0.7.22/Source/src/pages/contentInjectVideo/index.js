(function(){var s=function(){var n=typeof document<"u"&&document.createElement("link").relList;return n&&n.supports&&n.supports("modulepreload")?"modulepreload":"preload"}(),u=function(o){return"/"+o},l={},c=function(n,i,f){let a=Promise.resolve();return i&&i.length>0&&(document.getElementsByTagName("link"),a=Promise.all(i.map(e=>{if(e=u(e),!(e in l)){l[e]=!0;var r=e.endsWith(".css"),d=r?'[rel="stylesheet"]':"";if(!document.querySelector(`link[href="${e}"]${d}`)){var t=document.createElement("link");if(t.rel=r?"stylesheet":s,r||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),r)return new Promise((m,v)=>{t.addEventListener("load",m),t.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${e}`)))})}}}))),a.then(()=>n()).catch(e=>{var r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})};c(()=>import("../../../assets/js/inject.CwDpDRxr.js"),__vite__mapDeps([]))})();
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
