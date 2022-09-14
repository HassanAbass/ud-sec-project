import dotenv from "dotenv";
import Client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

export type UserType = {
    first_name: string;
    last_name: string;
    password: string;
};

export class UserModel {
    async getUsers(): Promise<{ first_name: string; last_name: string }[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = "SELECT id, first_name, last_name FROM users";
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`unable get users: ${err}`);
        }
    }

    async show(id: number): Promise<UserType | null> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql =
                "SELECT id, first_name, last_name FROM users where id =($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length) {
                return result.rows[0];
            }
            return null;
        } catch (err) {
            throw new Error(`unable get users: ${err}`);
        }
    }

    async authenticate(
        first_name: string,
        password: string
    ): Promise<string | null> {
        // @ts-ignore
        const conn = await Client.connect();
        const sql = "SELECT id, password FROM users WHERE first_name=($1)";

        const result = await conn.query(sql, [first_name]);

        if (result.rows.length) {
            const user = result.rows[0];
            if (
                bcrypt.compareSync(
                    password + process.env.BCRYPT_PASSOWRD,
                    user.password
                )
            ) {
                return jwt.sign(
                    { user: user },
                    process.env.JSON_SECRET as jwt.Secret
                );
            }
        }

        return null;
    }

    async create(u: UserType): Promise<UserType> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql =
                "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
            const hash = bcrypt.hashSync(
                u.password + process.env.BCRYPT_PASSOWRD,
                parseInt(process.env.BCRYPT_ROUND as string)
            );
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                hash,
            ]);
            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`unable create user (${u.first_name}): ${err}`);
        }
    }
}
