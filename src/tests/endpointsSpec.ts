import supertest from "supertest";
import { ORDER_STATUS, SUCCESS_STATUS, UNAUTHORIZED_CODE } from "../constants";
import { validateNumber } from "../helpers/request";
import { OrderModel, OrderType } from "../models/Order";
import { ProductModel, ProductType } from "../models/Product";
import { UserModel, UserType } from "../models/User";
import app from "../server";

const request = supertest(app);
let user: UserType & {
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

    it("Validate number is positive, non zero", async () => {
        expect(validateNumber("-1")).toEqual(false);
        expect(validateNumber("0")).toEqual(false);
        expect(validateNumber("100a")).toEqual(false);
        expect(validateNumber("00")).toEqual(false);
        expect(validateNumber("100")).toEqual(true);
    });
});

let product: ProductType & { id: number };
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
});

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
        expect(response.status).toBe(SUCCESS_STATUS);
    });

    it("Check get orders endpoint", async () => {
        const response = await request
            .get("/orders")
            .set("Authorization", `Bearer ${user.token}`);
        expect(response.status).toBe(SUCCESS_STATUS);
    });
});
let User = new UserModel();
describe("Test User model", () => {
    it("Check getUsers method", async () => {
        const result = await User.getUsers();
        expect(result).toContain({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    });

    it("Check show method", async () => {
        const result = await User.show(user.id);
        expect(result).toEqual({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
        });
    });

    it("Check create method", async () => {
        const result = await User.create({
            first_name: "test user 2",
            last_name: "last name",
            password: "secret",
        });
        expect(Object.keys(result)).toContain("token");
    });
});
const Product = new ProductModel();
describe("Test Product model", () => {
    it("Check getProducts method", async () => {
        const result = await Product.getProducts();
        expect(result).toContain(product);
    });

    it("Check show method", async () => {
        const result = await Product.show(product.id);
        expect(result).toEqual(product);
    });

    it("Check create method", async () => {
        const result = await Product.create({
            name: "cool product",
            price: 25,
        });
        expect(Object.keys(result)).toContain("id");
    });
});
const Order = new OrderModel();
describe("Test orders model", () => {
    it("Check create method", async () => {
        const result = await Order.create({
            status: ORDER_STATUS.ACTIVE,
            product_id: product.id,
            product_quantity: 4,
            user_id: user.id,
        });
        expect(Object.keys(result)).toContain("id");
    });
    it("Check get orders method", async () => {
        const result = await Order.getUserOrders(user.id);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
});
