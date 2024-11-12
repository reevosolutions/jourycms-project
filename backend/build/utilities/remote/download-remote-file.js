import axios from "axios";
import * as fs from 'fs';
const downloadRemoteFile = async (url, filePath) => {
    try {
        const response = await axios({
            method: 'GET',
            url,
            responseType: 'stream'
        });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export default downloadRemoteFile;
//# sourceMappingURL=download-remote-file.js.map