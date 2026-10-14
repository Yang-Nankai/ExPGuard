const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["signData/web3.js","signData/App.js","signData/signData.js","assets/signData.css","signData/AppSignData.js","assets/AppSignData.css","signData/cms.js","assets/App.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from './signData.js';
import { r as registerPlugin, W as WebPlugin, C as CapacitorException, b as BiometryError } from './App.js';

const App = registerPlugin('App', {
    web: () => __vitePreload(() => import('./web3.js'),true              ?__vite__mapDeps([0,1,2,3,4,5,6,7]):void 0).then(m => new m.AppWeb()),
});

class BiometricAuthBase extends WebPlugin {
    async authenticate(options) {
        try {
            await this.internalAuthenticate(options);
        }
        catch (error) {
            // error will be an instance of CapacitorException on native platforms,
            // an instance of BiometryError on the web.
            if (error instanceof CapacitorException) {
                throw new BiometryError(error.message, error.code);
            }
            else {
                throw error;
            }
        }
    }
    async addResumeListener(listener) {
        return App.addListener('appStateChange', ({ isActive }) => {
            if (isActive) {
                this.checkBiometry()
                    .then((info) => {
                    listener(info);
                })
                    .catch(console.error);
            }
        });
    }
}

export { BiometricAuthBase as B };
