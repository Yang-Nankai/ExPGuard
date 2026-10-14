import { A as App } from './index4.js';
import { bj as WebPlugin, bk as CapacitorException, bi as BiometryError } from './index.js';

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
