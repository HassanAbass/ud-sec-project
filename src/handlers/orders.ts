import { Request, Response } from "express";
import { VALIDATION_CODE } from "../constants";
import { OrderModel } from "../models/Order";
import { userRequest } from "../routes/middlewares/user";

const Order = new OrderModel();

export const index = async (req: userRequest, res: Response) => {
    res.json(await Order.getUserOrders(req.userId as number));
};

export const create = async (req: userRequest, res: Response) => {
    res.json(
        await Order.create({
            status: req.body.status,
            user_id: req.userId as number,
            product_id: req.body.product_id,
            product_quantity: req.body.product_quantity,
        })
    );
};
