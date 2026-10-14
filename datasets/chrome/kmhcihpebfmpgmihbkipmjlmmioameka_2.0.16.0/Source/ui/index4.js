const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["ui/web4.js","ui/index.js","ui/NetworkId.js","assets/index.css"])))=>i.map(i=>d[i]);
import { r as registerPlugin, _ as __vitePreload } from './index.js';

const App = registerPlugin('App', {
    web: () => __vitePreload(() => import('./web4.js'),true              ?__vite__mapDeps([0,1,2,3]):void 0).then(m => new m.AppWeb()),
});

export { App as A };
