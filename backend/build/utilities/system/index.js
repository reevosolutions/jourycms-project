import axios from 'axios';
import mongoose from 'mongoose';
import config from '../../config';
import { getMongooseUri } from '../data/db/connection.utilities';
import initLogger from '../logging';
const logger = initLogger('UTILITY', 'system');
export const getServerStatusReport = async () => {
    logger.event(`Getting My public IP address`);
    const url = 'https://checkip.amazonaws.com/';
    const response = await axios(url);
    logger.value(`My public IP address is: ${response.data.trim()}`);
    return {
        service: config.currentService.name,
        server: 'UP',
        db: {
            connect_to: config.currentService.db.connectTo,
            status: mongoose.STATES[mongoose.connection.readyState],
            connection_utl: getMongooseUri(),
        },
        ip: response.data.trim(),
        env: {
            API_PREFIX: process.env.API_PREFIX,
            NODE_ENV: process.env.NODE_ENV,
            NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
            PORT: process.env.PORT,
            APPLICATION: process.env.APPLICATION,
            PWD: process.env.PWD,
            RXDB_NAME: process.env.RXDB_NAME
        },
        config: process.env.NODE_ENV === 'production' ? undefined : config
    };
};
//# sourceMappingURL=index.js.map