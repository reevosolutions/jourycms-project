import mongoose from 'mongoose';
export const getMongooseUri = () => {
    // Assuming you have already established a connection
    const conn = mongoose.connection;
    if (!conn) {
        return 'No active Mongoose connection';
    }
    const host = conn.host;
    const port = conn.port;
    const databaseName = conn.name;
    const user = conn.user;
    const pass = conn.pass; // Be careful with password, it's sensitive data
    // Constructing URI
    let uri = 'mongodb://';
    if (user && pass) {
        // uri += `${user}:${pass}@`;
    }
    uri += `${host}:${port}/${databaseName}`;
    return uri;
};
//# sourceMappingURL=connection.utilities.js.map