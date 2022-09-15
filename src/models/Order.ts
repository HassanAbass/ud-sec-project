import { ORDER_STATUS } from "../constants";
import Client from "../database";

export type OrderType = {
    id?: number;
    user_id: number;
    status: ORDER_STATUS;
    product_id?: number;
    product_quantity?: number;
};

export class OrderModel {
    async getUserOrders(id: number): Promise<OrderType[]> {
        try {
            const conn = await Client.connect();
            const results = await conn.query(
                `SELECT *, orders.id as id FROM orders 
                INNER JOIN order_products ON order_products.order_id = orders.id
                INNER JOIN products ON order_products.product_id = products.id
                WHERE user_id=($1)`,
                [id]
            );
            conn.release();
            return results.rows;
        } catch (e) {
            throw new Error(`Couldn't get orders, ${e}`);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            await conn.query("delete from orders where id=($1)", [id]);
            conn.release();
        } catch (err) {
            throw new Error(`unable to delete order: ${err}`);
        }
    }

    async show(
        id: number
    ): Promise<{ id: number; user_id: number; status: ORDER_STATUS }> {
        try {
            const conn = await Client.connect();
            const result = await conn.query(
                "SELECT * FROM orders where id=($1)",
                [id]
            );
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Couldn't get order, ${e}`);
        }
    }

    async update(id: number, status: ORDER_STATUS): Promise<OrderType> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql =
                "update orders set status=($2) where id =($1) RETURNING *";
            const result = await conn.query(sql, [id, status]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`unable to update order: ${err}`);
        }
    }

    async create(order: OrderType): Promise<OrderType> {
        try {
            const conn = await Client.connect();
            const product = await conn.query(
                `select id from products where id=($1)`,
                [order.product_id]
            );
            const result = await conn.query(
                `insert into orders(status, user_id) values('${order.status}', ${order.user_id}) RETURNING *`
            );
            const orderProducts = await conn.query(
                `insert into order_products(product_id, order_id, quantity) values(${order.product_id},${result.rows[0].id}, ${order.product_quantity}) RETURNING *`
            );

            conn.release();
            return { ...result.rows[0], product: orderProducts.rows[0] };
        } catch (e) {
            throw new Error(`Couldn't insert into orders, ${e}`);
        }
    }
}
