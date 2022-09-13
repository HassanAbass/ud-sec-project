import Client from "./../database";

export type Product = {
    title: String;
    quantity: Number;
};

export class ProductTable {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const results = await conn.query("select * from products");
            conn.release();
            return results.rows;
        } catch (e) {
            throw new Error(`Couldn't get products, ${e}`);
        }
    }

    async create(product: Product): Promise<void> {
        try {
            const conn = await Client.connect();
            console.log(
                `insert into products(title, quantity) values('${product.title}', ${product.quantity})`
            );
            await conn.query(
                `insert into products(title, quantity) values('${product.title}', ${product.quantity})`
            );
            conn.release();
        } catch (e) {
            throw new Error(`Couldn't insert into products, ${e}`);
        }
    }
}
