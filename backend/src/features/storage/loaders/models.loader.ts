
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-09 05:33:01
 */


// import the service-specific models
import { UploadedFile } from '../models/uploaded-file.model';

/**
 * Load the service models.
 *
 * @returns A dictionary of service models.
 */
const getServiceModels: () => { [name: string]: any } = () => {
	return {
		/**
		 * The content feature models.
		 */
		uploadedFileModel: UploadedFile,

	}
}

export default getServiceModels;
