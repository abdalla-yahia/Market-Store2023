import db from '../database';
import User from '../types/users.Types';

class UserModels {
    //Create New User
    async create(u: User): Promise<User> {
        const connecting = await db.connect();
        const sql =
            'INSERT INTO users (email, user_name, first_name, last_name, password) values ($1,$2,$3,$4,$5) returning *';
        const result = await connecting.query(sql, [
            u.email,
            u.user_name,
            u.first_name,
            u.last_name,
            u.password,
        ]);
        connecting.release();
        return result.rows[0];
    }
    //Get Specific User
    async GetUser(id: string): Promise<User[]> {
        const con = await db.connect();
        const sql = 'SELECT * FROM users WHERE id = $1 ';
        const result = await con.query(sql, [id]);
        con.release();
        return result.rows[0];
    }
    //Get ALl Users
    async GetAllUsers(): Promise<User[]> {
        const con = await db.connect();
        const sql = 'SELECT * FROM users ';
        const result = await con.query(sql);
        con.release();
        return result.rows;
    }
    //Update Specific User
    async update(u: User, id: string): Promise<User> {
        const connection = await db.connect();
        const sql =
            'UPDATE users SET email =$1,user_name=$2,first_name=$3,last_name=$4,password=$5 where id= $6 returning *';
        const result = await connection.query(sql, [
            u.email,
            u.user_name,
            u.first_name,
            u.last_name,
            u.password,
            id,
        ]);
        connection.release();
        return result.rows[0];
    }
    //Delete Specific User

    async Delete(id: string): Promise<User[]> {
        const connection = await db.connect();
        const sql = `DELETE FROM users WHERE id =$1;
            \nALTER SEQUENCE users_id_seq RESTART WITH 1`;
        const reult = await connection.query(sql, [id]);
        connection.release();
        return reult.rows;
    }
    //Delete All Users

    async DeleteAllUsers(): Promise<User[]> {
        const connection = await db.connect();
        const sql =
            `DELETE FROM users ;
            \nALTER SEQUENCE users_id_seq RESTART WITH 1`
        const reult = await connection.query(sql);
        connection.release();
        return reult.rows;
    }
}

export default UserModels;
