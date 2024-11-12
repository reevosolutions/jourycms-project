import { Container } from 'typedi';
import LoggerInstance from './logger.loader';
import FirebaseManager from '../managers/firebase-manager';
import TranslationManager from '../managers/translation-manager/index';
export default async ({ models, }) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        await TranslationManager.init();
        Container.set('firebaseManager', Container.get(FirebaseManager));
        Container.set('logger', LoggerInstance);
    }
    catch (e) {
        LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
//# sourceMappingURL=dependency-injector.loader.js.map