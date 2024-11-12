
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-09 05:33:01
 */


// import the service-specific models
import AuthModels from '../features/auth/loaders/models.loader';
import ContentModels from '../features/content/loaders/models.loader';
import StorageModels from '../features/storage/loaders/models.loader';


/**
 * Load the service models.
 *
 * @returns A dictionary of service models.
 */
const getServiceModels: () => { [name: string]: any } = () => {

	return {
		...AuthModels(),
		...ContentModels(),
		...StorageModels(),
	}
}

export default getServiceModels;
