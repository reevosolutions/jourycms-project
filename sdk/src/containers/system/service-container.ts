import BaseServiceContainer from '../../base.service-container';

/**
 * @description Typing aliasing
 */
import SDK = Levelup.CMS.V1.SDK;
import AppsClient from './clients/apps.client';
type TClientName =
  'apps';

export default class SystemServiceContainer extends BaseServiceContainer<TClientName> {

  constructor(sdk: SDK.ISdk) {
    super(sdk, '/api/v1/system');
  }


  get apps() {
    if (!this.clients.apps) this.clients.apps = new AppsClient(this);
    return this.clients.apps as AppsClient;
  }


}
