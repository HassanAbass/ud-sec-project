import { ORDER_STATUS } from "../constants";
import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product";
import { UserModel } from "../models/User";
import { user, product, order } from "./endpointsSpec";

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
    it("Check update method", async () => {
        await User.update(user.id, "new firstname", "new lastname");
        expect(await User.show(user.id)).toEqual({
            id: user.id,
            first_name: "new firstname",
            last_name: "new lastname",
        });
    });
    it("Check delete method", async () => {
        const newUser = await User.create({
            first_name: "test user 2",
            last_name: "last name",
            password: "secret",
        });
        await User.remove(newUser.id as number);
        expect(await User.show(newUser.id as number)).toBeUndefined();
    });
});
const Product = new ProductModel();
describe("Test Product model", () => {
    it("Check getProducts method", async () => {
        const result = await Product.getProducts();
        expect(result).toContain(product);
    });

    it("Check create method", async () => {
        const result = await Product.create({
            name: "cool product",
            price: 25,
        });
        expect(Object.keys(result)).toContain("id");
    });

    it("Check show method", async () => {
        const result = await Product.show(product.id);
        expect(result).toEqual(product);
    });

    it("Check update method", async () => {
        const newProduct = await Product.create({
            name: "cool product",
            price: 25,
        });
        await Product.update(newProduct.id as number, "new name", 55);
        expect(await Product.show(newProduct.id as number)).toEqual({
            id: newProduct.id,
            name: "new name",
            price: 55,
        });
    });
    it("Check delete method", async () => {
        const newProduct = await Product.create({
            name: "cool product",
            price: 25,
        });
        await Product.remove(newProduct.id as number);
        expect(await Product.show(newProduct.id as number)).toBeUndefined();
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
    it("Check show method", async () => {
        const result = await Order.show(order.id);
        expect(result).toEqual({
            id: order.id,
            user_id: order.user_id,
            status: order.status,
        });
    });

    it("Check update method", async () => {
        const newOrder = await Order.create({
            status: ORDER_STATUS.ACTIVE,
            product_id: product.id,
            product_quantity: 4,
            user_id: user.id,
        });
        await Order.update(newOrder.id as number, ORDER_STATUS.COMPLETED);
        expect(await Order.show(newOrder.id as number)).toEqual({
            id: newOrder.id as number,
            user_id: newOrder.user_id,
            status: ORDER_STATUS.COMPLETED,
        });
    });
    it("Check delete method", async () => {
        const newOrder = await Order.create({
            user_id: user.id,
            status: ORDER_STATUS.ACTIVE,
            product_id: product.id,
            product_quantity: 25,
        });
        await Order.remove(newOrder.id as number);
        expect(await Order.show(newOrder.id as number)).toBeUndefined();
    });
});
