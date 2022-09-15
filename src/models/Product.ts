import Client from "./../database";

export type ProductType = {
    id?: number;
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

    async update(
        id: number,
        name: string,
        price: number
    ): Promise<ProductType> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql =
                "update products set name=($2), price=($3) where id =($1) RETURNING *";
            const result = await conn.query(sql, [id, name, price]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`unable to update products: ${err}`);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            await conn.query("delete from products where id=($1)", [id]);
            conn.release();
        } catch (err) {
            throw new Error(`unable to delete product: ${err}`);
        }
    }

    async show(id: number): Promise<ProductType> {
        try {
            const conn = await Client.connect();
            const result = await conn.query(
                "SELECT * FROM products where id=($1)",
                [id]
            );
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Couldn't get products, ${e}`);
        }
    }

    async create(product: ProductType): Promise<ProductType> {
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
