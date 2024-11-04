import { Container } from 'typedi';
import AmqpManager from '../managers/amqp-manager';
import LoggerInstance from './logger.loader';
import ExportManager from '../utilities/exporters/export.manager';
import FirebaseManager from '../managers/firebase-manager';
import TranslationManager from '../managers/translation-manager/index';

export default async ({
  models,
}: {
  models: { name: string; model: any }[];
}) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    await TranslationManager.init();
    Container.set('exportManager', Container.get(ExportManager));
    Container.set('firebaseManager', Container.get(FirebaseManager));
    Container.set('amqpManager', Container.get(AmqpManager));
    Container.set('logger', LoggerInstance);

  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
