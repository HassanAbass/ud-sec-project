import { Request, Response } from "express";
import { SERVER_ERROR_CODE, VALIDATION_CODE } from "../constants";
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

export const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        if (!id || isNaN(id))
            return res
                .status(VALIDATION_CODE)
                .json("please input order id, must be an integer.");
        const product = await Order.show(req.params.id as unknown as number);
        res.json(product);
    } catch (e) {
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        if (!id || isNaN(id))
            return res
                .status(VALIDATION_CODE)
                .json("please input product id, must be an integer.");
        const product = await Order.update(
            req.params.id as unknown as number,
            req.body.status
        );
        res.json(product);
    } catch (e) {
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number;
        if (!id || isNaN(id))
            return res
                .status(VALIDATION_CODE)
                .json("please input order id, must be an integer.");
        await Order.remove(req.params.id as unknown as number);
        res.json("deleted");
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
