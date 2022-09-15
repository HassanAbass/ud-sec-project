import { Request, Response } from "express";
import { SERVER_ERROR_CODE } from "../constants";
import { OrderModel } from "../models/Order";
import { userRequest } from "../routes/middlewares/user";

const Order = new OrderModel();

export const index = async (req: userRequest, res: Response) => {
    try {
        const orders = await Order.getUserOrders(req.userId as number);
        res.json(orders);
    } catch (e) {
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};

export const create = async (req: userRequest, res: Response) => {
    try {
        const order = await Order.create({
            status: req.body.status,
            user_id: req.userId as number,
            product_id: req.body.product_id,
            product_quantity: req.body.product_quantity,
        });
        res.json(order);
    } catch (e) {
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};
