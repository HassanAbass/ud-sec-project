import supertest from "supertest";
import { ORDER_STATUS, SUCCESS_STATUS, UNAUTHORIZED_CODE } from "../constants";
import { validateNumber } from "../helpers/request";
import { OrderModel, OrderType } from "../models/Order";
import { ProductModel, ProductType } from "../models/Product";
import { UserModel, UserType } from "../models/User";
import app from "../server";

const request = supertest(app);
export let user: UserType & {
    token?: string;
    id: number;
    firstName?: string;
    lastName?: string;
};
describe("Test users endpoints", () => {
    beforeAll(async () => {
        const response = await request.post("/users").send({
            firstName: "test",
            lastName: "user",
            password: "secret",
        });
        user = response.body;
    });

    it("Check create users endpoint", async () => {
        const response = await request.post("/users").send({
            firstName: "test",
            lastName: "user",
            password: "secret",
        });
        expect(response.status).toBe(SUCCESS_STATUS);
    });

    it("Check get all users endpoint", async () => {
        const response = await request
            .get("/users")
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toContain({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    });

    it("Check get user by id endpoint", async () => {
        const response = await request
            .get(`/users/${user.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toEqual({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    });

    it("Check update user by id endpoint", async () => {
        const result = await request.post("/users").send({
            firstName: "new",
            lastName: "user",
            password: "123",
        });
        let newUser = result.body;
        const response = await request
            .put(`/users/${newUser.id}`)
            .send({
                firstName: "new firstname",
                lastName: "new lastname",
            })
            .set("Authorization", `Bearer ${newUser.token}`);
        expect(response.body).toEqual({
            id: newUser.id,
            first_name: "new firstname",
            last_name: "new lastname",
            password: newUser.password,
        });
    });

    it("Check delete user by id endpoint", async () => {
        const result = await request.post("/users").send({
            firstName: "new",
            lastName: "user",
            password: "123",
        });
        let newUser = result.body;
        await request
            .delete(`/users/${newUser.id}`)
            .set("Authorization", `Bearer ${newUser.token}`);
        const response = await request
            .get(`/users/${newUser.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toBe("");
    });

    it("Validate number is positive, non zero", async () => {
        expect(validateNumber("-1")).toEqual(false);
        expect(validateNumber("0")).toEqual(false);
        expect(validateNumber("100a")).toEqual(false);
        expect(validateNumber("00")).toEqual(false);
        expect(validateNumber("100")).toEqual(true);
    });
});

export let product: ProductType & { id: number };
describe("Test products endpoints", () => {
    beforeAll(async () => {
        const response = await request
            .post("/products")
            .send({
                name: "TEST product",
                price: 255,
            })
            .set("Authorization", `Bearer ${user.token}`);
        product = response.body;
    });

    it("Check create products endpoint", async () => {
        const response = await request
            .post("/products")
            .send({
                name: "TEST product",
                price: 255,
            })
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.status).toBe(SUCCESS_STATUS);
    });

    it("Check get products endpoint", async () => {
        const response = await request.get("/products");
        expect(response.body).toContain({
            name: product.name,
            price: product.price,
            id: product.id,
        });
    });

    it("Check get product by id endpoint", async () => {
        const response = await request.get(`/products/${product.id}`);
        expect(response.body).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });
    it("Check update product by id endpoint", async () => {
        const result = await request
            .post("/products")
            .set("Authorization", `Bearer ${user.token}`)
            .send({
                name: "cool",
                price: 255,
            });
        let newProduct = result.body;
        const response = await request
            .put(`/products/${newProduct.id}`)
            .send({
                name: "new name",
                price: 255,
            })
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toEqual({
            id: newProduct.id,
            name: "new name",
            price: 255,
        });
    });

    it("Check delete Product", async () => {
        const result = await request
            .post("/products")
            .set("Authorization", `Bearer ${user.token}`)
            .send({
                name: "coosdl",
                price: 255,
            });
        let newProduct = result.body;
        await request
            .delete(`/products/${newProduct.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        const response = await request.get(`/products/${newProduct.id}`);
        expect(response.body).toBe("");
    });
});
export let order: OrderType & { id: number };
describe("Test orders endpoints", () => {
    it("Check create orders endpoint", async () => {
        const response = await request
            .post("/orders")
            .send({
                status: "ACTIVE",
                product_id: product.id,
                product_quantity: 4,
            })
            .set("Authorization", `Bearer ${user.token}`);
        order = response.body;
        expect(response.status).toBe(SUCCESS_STATUS);
    });

    it("Check get orders endpoint", async () => {
        const response = await request
            .get("/orders")
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.status).toBe(SUCCESS_STATUS);
    });
    it("Check order by id endpoint", async () => {
        const response = await request
            .get(`/orders/${order.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toEqual({
            id: order.id,
            user_id: order.user_id,
            status: order.status,
        });
    });
    it("Check update order by id endpoint", async () => {
        const result = await request
            .post("/orders")
            .set("Authorization", `Bearer ${user.token}`)
            .send({
                status: ORDER_STATUS.ACTIVE,
                product_id: product.id,
                product_quantity: 4,
                user_id: user.id,
            });
        let newOrder = result.body;
        const response = await request
            .put(`/orders/${newOrder.id}`)
            .send({ status: ORDER_STATUS.COMPLETED })
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toEqual({
            id: newOrder.id as number,
            user_id: newOrder.user_id,
            status: ORDER_STATUS.COMPLETED,
        });
    });
    it("Check delete order", async () => {
        const result = await request
            .post("/orders")
            .set("Authorization", `Bearer ${user.token}`)
            .send({
                status: ORDER_STATUS.ACTIVE,
                product_id: product.id,
                product_quantity: 4,
                user_id: user.id,
            });
        let newOrder = result.body;
        await request
            .delete(`/orders/${newOrder.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        const response = await request
            .get(`/orders/${newOrder.id}`)
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.body).toBe("");
    });
});
