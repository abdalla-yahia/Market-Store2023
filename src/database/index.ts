import { Pool } from 'pg';
import config from '../config';
const pool = new Pool({
    user: config.user,
    database: config.DB_name,
    password: config.password,
    host: config.host,
    port: parseInt(config.db_port as string, 10),
});
pool.on('error', (client) => {
    console.log(client.stack);
});
export default pool;
