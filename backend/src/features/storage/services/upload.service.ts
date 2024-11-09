/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:42
 */

import Container, { Inject, Service } from 'typedi';
import { mapDocumentToExposed } from '../../../utils/mappers/general.mappers';

import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import { UploadedFileSchemaFields } from '../models/uploaded-file.model';
import userCan from '../../../utilities/security/user-can';
import UploadedFilesService from './uploaded-files.service';
import * as fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { formatBytes } from '../../../utilities/strings/index';
import { md5 } from 'hash-wasm';
import downloadRemoteFile from '../../../utilities/remote/download-remote-file';
import { getFileExtensionFromUrl } from '../../../utilities/remote';
import BaseService from '../../../common/base.service';
import mime from 'mime-types';

import EntityAlias = Levelup.CMS.V1.Storage.Entity.UploadedFile;
import ApiAlias = Levelup.CMS.V1.Storage.Api.UploadedFiles;
import DocumentAlias = Levelup.CMS.V1.Storage.Model.UploadedFileDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Storage.UploadedFile;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;

/**
 * @description
 */
@Service()
export default class UploadService extends BaseService {
  constructor(
    @Inject('uploadedFileModel') private uploadedFileModel: Levelup.CMS.V1.Storage.Model.UploadedFile,
    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
  }

  public async saveMultipleFilesToDB(
    files:
      | Express.Multer.File[]
      | {
        [fieldname: string]: Express.Multer.File[];
      },
    authData: Levelup.CMS.V1.Security.AuthData,
    opt?: {
      bypass_authorization?: boolean;
    }
  ): Promise<EntityAlias[]> {
    try {
      const uploadedFilesService = Container.get(UploadedFilesService);

      this.logger.silly('saving uploaded files to database');

      const data: Partial<EntityAlias> = {};
      /**
       * Auto-fill system data
       */
      data.app = authData?.current?.app?._id
        ? authData?.current?.app?._id
        : opt?.bypass_authorization || (authData?.current?.service?.name && !authData?.current?.service?.is_external)
          ? data.app
          : undefined;
      
          data.created_by = authData?.current?.user?._id;

      if (!data.attributes) data.attributes = {};

      /**
       * Check if the user can create the object
       */
      if (authData?.current?.app?._id && authData?.current?.app?._id !== data.app)
        throw new exceptions.UnauthorizedException('You are not allowed to create this object on this app');
      if (!userCan.createObject('uploadedFile', data, authData))
        throw new exceptions.UnauthorizedException('You are not allowed to create this object');

      const addPromises: Promise<EntityAlias>[] = [];
      let results: EntityAlias[] = [];

      const saveFileToDB = async (file: Express.Multer.File) => {
        const docObject: Partial<EntityAlias> = {
          ...data,
          ...file,
          original_name: file.originalname,
          file_name: file.filename,
          file_path: file.path,
          destination: file.destination,
          field_name: file.fieldname
        };

        docObject.snapshots = await uploadedFilesService._generateSnapshotsObject(docObject, null, authData);
        docObject.search_meta = uploadedFilesService._createSearchMeta(docObject, null);

        const fileDoc = await this.uploadedFileModel.create(docObject);

        return fileDoc;
      };

      (files as Express.Multer.File[]).forEach(file => {
        addPromises.push(saveFileToDB(file));
      });

      results = await Promise.all(addPromises).then(res => {
        return res;
      });

      return results.map(doc => mapDocumentToExposed(doc));
    } catch (error) {
      this.logError(this.saveMultipleFilesToDB, error);
      
      throw error;
    }
  }

  public async loadRemoteFile(
    { data: { url } }: Levelup.CMS.V1.Storage.Api.LoadRemote.Request,
    authData?: Levelup.CMS.V1.Security.AuthData
  ): Promise<Levelup.CMS.V1.Storage.Api.LoadRemote.Response> {
    const scenario = this.initScenario(this.logger, this.loadRemoteFile, [url]);
    try {
      const uploadedFilesService = Container.get(UploadedFilesService);
      const {
        data: [record]
      } = await uploadedFilesService.list({ filters: { remote_url: url } }, authData);
      if (record) {
        scenario.set({ found: true, record });
        const file = path.join(__dirname, '../../', record.file_path);
        if (fs.existsSync(file)) {
          scenario.log();
          return { data: record };
        }
      }

      scenario.set({ found: false });

      const folder = `uploads/${authData?.current?.user?._id ?? 'unknown'}/`;
      const folderPath = path.join(__dirname, `../../`, folder);
      fs.mkdirSync(folderPath, { recursive: true });

      const ext = getFileExtensionFromUrl(url);
      const filename = `remote.${Date.now()}.${uuid()}${ext ? `.${ext}` : ''}`;

      const destination = path.join(folderPath, filename);

      scenario.set({ destination });

      await downloadRemoteFile(url, destination);

      const mimetype: string = mime.lookup(destination) || 'application/octet-stream';
      const stats = fs.statSync(destination);

      let data: Partial<EntityAlias> = {};
      /**
       * Auto-fill system data
       */
      data.app = authData?.current?.app?._id
        ? authData?.current?.app?._id
        : authData?.current?.service?.name && !authData?.current?.service?.is_external
          ? data.app
          : undefined;
      
          data.created_by = authData?.current?.user?._id;

      if (!data.attributes) data.attributes = {};

      data = {
        ...data,
        remote_url: url,
        original_name: 'remote',
        file_name: 'remote',
        file_path: `${folder}${filename}`,
        destination: folder,
        field_name: 'remote',
        mimetype: mimetype,
        size: stats.size
      };

      data.snapshots = await uploadedFilesService._generateSnapshotsObject(data, null, authData);
      data.search_meta = uploadedFilesService._createSearchMeta(data, null);

      const doc = await this.uploadedFileModel.create(data);

      // log scenario
      scenario.log();
      // return result
      return { data: mapDocumentToExposed(doc) };
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }
}
