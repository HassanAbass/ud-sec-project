import { ORDER_STATUS } from "../constants";
import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import {user, product} from './endpointsSpec';

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
