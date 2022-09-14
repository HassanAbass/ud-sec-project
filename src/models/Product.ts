import Client from "./../database";

export type ProductType = {
    name: String;
    price: number;
};

export class ProductModel {
    async getProducts(): Promise<ProductType[]> {
        try {
            const conn = await Client.connect();
            const results = await conn.query("SELECT * FROM products");
            conn.release();
            return results.rows;
        } catch (e) {
            throw new Error(`Couldn't get products, ${e}`);
        }
    }

    async show(id: number): Promise<ProductType | null> {
        try {
            const conn = await Client.connect();
            const result = await conn.query(
                "SELECT * FROM products where id=($1)",
                [id]
            );
            conn.release();
            if (result.rows.length) {
                return result.rows[0];
            }
            return null;
        } catch (e) {
            throw new Error(`Couldn't get products, ${e}`);
        }
    }

    async create(product: ProductType): Promise<ProductType | void> {
        try {
            const conn = await Client.connect();
            const result = await conn.query(
                `insert into products(name, price) values('${product.name}', ${product.price}) RETURNING *`
            );
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Couldn't insert into products, ${e}`);
        }
    }
}
