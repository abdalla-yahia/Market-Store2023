import dotenv from 'dotenv';

dotenv.config();

const { port, ENV, user, DB_port, password, host, DB_NAME, DB_TEST } =
    process.env;

export default {
    port: port,
    db_port: DB_port,
    user: user,
    password: password,
    host: host,
    DB_name: ENV === 'dev' ? DB_NAME : DB_TEST,
};
