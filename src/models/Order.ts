import { ORDER_STATUS } from "../constants";
import Client from "../database";

export type OrderType = {
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

    async create(order: OrderType): Promise<OrderType | string> {
        try {
            const conn = await Client.connect();
            const product = await conn.query(
                `select id from products where id=($1)`,
                [order.product_id]
            );
            if (!product.rowCount)
                return "This product doesn't exist, enter a valid product id";
            const result = await conn.query(
                `insert into orders(status, user_id) values('${order.status}', ${order.user_id}) RETURNING *`
            );
            const orderProducts = await conn.query(
                `insert into order_products(product_id, order_id, quantity) values(${order.product_id},${result.rows[0].id}, ${order.product_quantity}) RETURNING *`
            );

            conn.release();
            return { ...result.rows[0], product: orderProducts.rows };
        } catch (e) {
            throw new Error(`Couldn't insert into orders, ${e}`);
        }
    }
}
