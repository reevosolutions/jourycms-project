/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import {
  translate
} from 'google-translate-api-x';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { uniq, uniqBy } from 'lodash';
import * as path from 'path';
import Container, { Inject, Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { SUPPORTED_LANGUAGES } from '../../../constants/localization.constants';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import CacheManager from '../../../managers/cache-manager';
import { applyOnDocumentChunks } from '../../../utilities/data/db/chunks.utilities';
import { generateProgressBar } from '../../../utilities/logging/output.utilities';
import { sleep } from '../../../utilities/system/timer.utilities';
import TranslationItemsService from './translation.items.service';
import TranslationNamespacesService from './translation.namespaces.service';
import TranslationProjectsService from './translation.projects.service';
import crypto = require('crypto');

import EntityAlias = Levelup.CMS.V1.Content.Translation.Entity.Project;
import ApiAlias = Levelup.CMS.V1.Content.Translation.Api.Tools;
import DocumentAlias = Levelup.CMS.V1.Content.Translation.Model.ProjectDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Content.Translation.Project;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;

/**
 * @description
 */
@Service()
export default class TranslationToolsService extends BaseService {
  protected readonly ENTITY = 'translationProject' as const;

  private _CACHE: {
    projects: {
      [Name: string]: {
        project: Levelup.CMS.V1.Content.Translation.Entity.Project;
        namespaces: {
          [Name: string]: {
            namespace: Levelup.CMS.V1.Content.Translation.Entity.Namespace;
            items: {
              [Hash: string]: true;
            };
          };
        };
      };
    };
  } = {
    projects: {}
  };

  constructor(
    @Inject('articleTypeModel') private articleTypeModel: Levelup.CMS.V1.Content.Model.ArticleType,
    @Inject('articleModel') private articleModel: Levelup.CMS.V1.Content.Model.Article,
    @Inject('commentModel') private commentModel: Levelup.CMS.V1.Content.Model.Comment,
    @Inject('reviewModel') private reviewModel: Levelup.CMS.V1.Content.Model.Review,
    @Inject('termModel') private termModel: Levelup.CMS.V1.Content.Model.Term,
    @Inject('taxonomyModel') private taxonomyModel: Levelup.CMS.V1.Content.Model.Taxonomy,
    @Inject('translationItemModel') private translationItemModel: Levelup.CMS.V1.Content.Translation.Model.Item,
    @Inject('translationNamespaceModel') private translationNamespaceModel: Levelup.CMS.V1.Content.Translation.Model.Namespace,
    @Inject('translationProjectModel') private translationProjectModel: Levelup.CMS.V1.Content.Translation.Model.Project,
    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
    this._CACHE = {
      projects: {}
    };
  }

  private async loadProject(name: string) {
    try {
      // load from cache
      let result = this._CACHE.projects[name]?.project;
      if (result) return result;
      // load from DB
      this.logger.warn('Loading project from DB');
      result = (await this.translationProjectModel.findOne({ name }))?.toObject();
      if (result) await this.saveProjectToCache(result);

      return result || null;
    } catch (error) {
      return null;
    }
  }

  private async saveProjectToCache(project: Levelup.CMS.V1.Content.Translation.Entity.Project) {
    try {
      this._CACHE.projects[project.name] = {
        project,
        namespaces: {}
      };
    } catch (error) {}
  }

  private async loadNamespace(project: Levelup.CMS.V1.Content.Translation.Entity.Project, name: string) {
    try {
      // load from cache
      let result = this._CACHE.projects[project.name]?.namespaces[name]?.namespace;
      if (result) return result;
      // load from DB
      this.logger.warn('Loading namespace from DB');
      result = (await this.translationNamespaceModel.findOne({ name, project: project._id }))?.toObject();
      if (result) await this.saveNamespaceToCache(project, result);

      return result || null;
    } catch (error) {
      return null;
    }
  }

  private async saveNamespaceToCache(
    project: Levelup.CMS.V1.Content.Translation.Entity.Project,
    namespace: Levelup.CMS.V1.Content.Translation.Entity.Namespace
  ) {
    try {
      if (!this._CACHE.projects[project.name])
        this._CACHE.projects[project.name] = {
          project,
          namespaces: {}
        };
      this._CACHE.projects[project.name].namespaces[namespace.name] = {
        namespace: namespace,
        items: {}
      };
    } catch (error) {
      return null;
    }
  }

  private async loadItem(
    project: Levelup.CMS.V1.Content.Translation.Entity.Project,
    namespace: Levelup.CMS.V1.Content.Translation.Entity.Namespace,
    key: string
  ): Promise<boolean> {
    try {
      let hash = crypto.createHash('md5').update(key).digest('hex');

      // load from cache
      let result: boolean = this._CACHE.projects[project.name]?.namespaces[namespace.name]?.items[hash];
      if (result) return result;
      // load from DB
      this.logger.warn('Loading item from DB');
      result = (await this.translationItemModel.findOne({ project: project._id, namespace: namespace.name, key }))
        ? true
        : false;
      if (result) await this.saveItemToCache(project, namespace, key);

      return result;
    } catch (error) {
      return false;
    }
  }

  private async saveItemToCache(
    project: Levelup.CMS.V1.Content.Translation.Entity.Project,
    namespace: Levelup.CMS.V1.Content.Translation.Entity.Namespace,
    key: string
  ) {
    try {
      let hash = crypto.createHash('md5').update(key).digest('hex');

      if (!this._CACHE.projects[project.name])
        this._CACHE.projects[project.name] = {
          project,
          namespaces: {}
        };
      if (!this._CACHE.projects[project.name].namespaces[namespace.name])
        this._CACHE.projects[project.name].namespaces[namespace.name] = {
          namespace,
          items: {}
        };
      this._CACHE.projects[project.name].namespaces[namespace.name].items[hash] = true;
    } catch (error) {
      return null;
    }
  }

  /**
   * @description insertI18MissingKey
   */
  public async insertI18MissingKey(
    { data }: ApiAlias.InsertI18MissingKey.Request,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt?: {
      bypass_authorization?: boolean;
    }
  ): Promise<{
    key: string;
    hash: string;
    isNew: boolean;
  }> {
    const scenario = this.initScenario(this.logger, this.initScenario, { data }, authData);
    const projectsService = Container.get(TranslationProjectsService);
    const translationNamespacesService = Container.get(TranslationNamespacesService);
    const translationItemsService = Container.get(TranslationItemsService);
    const cache = Container.get(CacheManager);
    try {
      const apps = await cache.apps.list();

      let { namespace, project, languages, default_language, key } = data;

      if (!namespace) throw new exceptions.BadRequestException('Namespace is required');
      if (!project) throw new exceptions.BadRequestException('Project is required');
      if (!languages) throw new exceptions.BadRequestException('Languages is required');
      if (!default_language) throw new exceptions.BadRequestException('Default language is required');
      if (!key) throw new exceptions.BadRequestException('Key is required');

      const objects: {
        project?: Levelup.CMS.V1.Content.Translation.Entity.Project;
        namespace?: Levelup.CMS.V1.Content.Translation.Entity.Namespace;
        item?: Levelup.CMS.V1.Content.Translation.Entity.Item;
      } = {};
      /**
       * Check if the project exists, if not create it
       */
      objects.project = await this.loadProject(project);
      if (!objects.project) {
        this.logger.error('Project not found', project);
        const body: Levelup.CMS.V1.Content.Translation.Api.Projects.Create.Request = {
          data: {
            app: authData?.current?.app?._id || apps[0]?._id,
            name: project,
            default_language,
            languages: uniq([default_language, ...languages])
          }
        };
        const { data: newDoc } = await projectsService.create(body, authData, { bypass_authorization: true });
        objects.project = newDoc;
        await this.saveProjectToCache(newDoc);
      } else {
        // this.logger.debug('Project found', project);
      }

      /**
       * Check if the namespace exists, if not create it
       */
      objects.namespace = await this.loadNamespace(objects.project, namespace);
      if (!objects.namespace) {
        this.logger.error('Namespace not found', namespace);
        const body: Levelup.CMS.V1.Content.Translation.Api.Namespaces.Create.Request = {
          data: {
            app: objects.project.app,
            project: objects.project._id,
            name: namespace
          }
        };
        const { data: newDoc } = await translationNamespacesService.create(body, authData, {
          bypass_authorization: true
        });
        objects.namespace = newDoc;
        await this.saveNamespaceToCache(objects.project, newDoc);
      } else {
        // this.logger.debug('Namespace found', namespace);
      }

      /**
       * Check if the item exists, if not create it
       */
      let itemFound = await this.loadItem(objects.project, objects.namespace, key);

      if (!itemFound) {
        this.logger.error('Item not found', key);
        const body: Levelup.CMS.V1.Content.Translation.Api.Items.Create.Request = {
          data: {
            app: objects.project.app,
            project: objects.project._id,
            namespace: objects.namespace.name,
            key
          }
        };
        const { data: newDoc } = await translationItemsService.create(body, authData, {
          bypass_authorization: true
        });
        objects.item = newDoc;
        await this.saveItemToCache(objects.project, objects.namespace, key);
        this.logger.success(`Translation item ${key} created`);
      } else {
        // this.logger.debug('Item found', key);
      }

      /**
       * Log execution result before returning the result
       */
      // scenario.log();

      const hash = crypto.createHash('md5').update(key).digest('hex');
      return {
        key: `${project}.${namespace}.${key}`,
        hash: `${project}.${namespace}.${hash}`,
        isNew: !itemFound
      };
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }

  public async translateUsingGoogleAPI(authData: Levelup.CMS.V1.Security.AuthData = {}) {
    try {
      const translationItemsService = Container.get(TranslationItemsService);

      const proxiesData = fs.readFileSync(path.join(__dirname, '../../assets/proxies.txt'), 'utf8');
      const proxies = uniqBy(
        proxiesData
          .split('\n')
          // .map(line => line.split('\t'))
          // .map(line => ({
          //   url: `http${line[6] === 'yes' ? 's' : ''}://${line[0]}:${line[1]}`,
          //   google: line[5] === 'yes',
          //   https: line[6] === 'yes'
          // }))
          .filter(p => p.startsWith('http')),
        'url'
      );

      this.logger.debug('PROXY', proxies);
      let invalidProxies: string[] = [];
      function pickProxyURL() {
        let proxy: string | null = null;
        if (invalidProxies.length === proxies.length) invalidProxies = [];
        while (
          (proxy === null || invalidProxies.includes(proxy)) &&
          proxies.length > 0 &&
          invalidProxies.length < proxies.length
        ) {
          proxy = proxies[Math.floor(Math.random() * proxies.length)];
          // this.logger.debug('PROXY', proxy);
        }
        return proxy;
      }

      // return;
      const totalCount = await this.translationItemModel.countDocuments({ is_deleted: false });
      this.logger.value('items count', totalCount);
      await applyOnDocumentChunks({
        query: this.translationItemModel.find({ is_deleted: false }),
        onItem: async (item, index, page, progress) => {
          item = item.toObject() as any;
          const proxy_url = pickProxyURL();
          try {
            if (!proxy_url) throw new exceptions.LevelupException('No proxy available');
            const LANGUAGES = ['en', 'ar', 'fr'] as const;
            for (const LANG of SUPPORTED_LANGUAGES) {
              // this.logger.event('handling item', ` ${LANG} `.bgBlue, item.key);
              const translation = item.translations.find(tr => tr.language === LANG);
              if (translation?.is_approved || translation?.is_auto_translated) {
                this.logger.success(generateProgressBar(progress), `${index} of ${totalCount}`, {
                  key: item.key,
                  [LANG]: translation.translation,
                  approved: translation.is_approved,
                  auto_translated: translation.is_auto_translated
                });
              } else {
                let result;
                try {
                  result = await translate(
                    item.namespace === 'system' || (item.key.includes('_') && !item.key.includes(' '))
                      ? item.key.replaceAll('_', ' ')
                      : item.key,
                    {
                      from: 'en',
                      to: LANG,
                      forceFrom: true,
                      forceTo: true
                      // requestOptions: {
                      //   agent: new HttpProxyAgent(proxy_url)
                      // }
                    }
                  );
                } catch (error) {
                  try {
                    result = await translate(
                      item.namespace === 'system' || (item.key.includes('_') && !item.key.includes(' '))
                        ? item.key.replaceAll('_', ' ')
                        : item.key,
                      {
                        from: 'en',
                        to: LANG,
                        forceFrom: true,
                        forceTo: true,
                        requestOptions: {
                          agent: new HttpsProxyAgent(proxy_url)
                        }
                      }
                    );
                  } catch (error) {
                    this.logger.error(error.message, error);
                  }
                }

                if (result) {
                  this.logger.tree(generateProgressBar(progress), `${index} of ${totalCount}`, item._id.toString(), {
                    language: LANG,
                    key: item.key,
                    old_translation: translation?.translation || '',
                    api_translation: result?.text ? result?.text : result?.raw || result
                  });

                  await sleep(faker.number.int({ min: 10, max: 6000 }));
                  await translationItemsService.update(
                    item._id.toString(),
                    {
                      data: {
                        translation_updates: {
                          [LANG]: {
                            modified: true,
                            approvement_modified: false,
                            value: result.text,
                            approved: false
                          }
                        },
                        auto_translated: true
                      }
                    },
                    authData
                  );
                }
              }
            }
          } catch (error) {
            proxy_url && invalidProxies.push(proxy_url);
            this.logger.error(error.message, error);
          }
        },
        onChunk: null,
        totalCount,
        maxItems: -1,
        chunkSize: 100
      });
    } catch (error) {}
  }

  public async loadNamespaceTranslation(project: string, namespace: string, language: string) {
    const scenario = this.initScenario(this.logger, this.loadNamespaceTranslation);
    try {
      const pr = await this.translationProjectModel.findOne({ name: project });
      if (!pr) throw new exceptions.ItemNotFoundException('Project not found');
      const ns = await this.translationNamespaceModel.findOne({ project: pr._id, name: namespace });
      if (!pr) throw new exceptions.ItemNotFoundException('Namespace not found');
      const items = await this.translationItemModel.find({
        project: pr._id,
        namespace: namespace,
        is_deleted: false
      });

      return items.reduce(
        (prev, item) => ({
          ...prev,
          [item.key]: item.translations.find(tr => tr.language === language)?.translation || undefined
        }),
        {}
      );
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }
}
