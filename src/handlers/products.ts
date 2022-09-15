import { Request, Response } from "express";
import { SERVER_ERROR_CODE, VALIDATION_CODE } from "../constants";
import { ProductModel } from "../models/Product";

const Product = new ProductModel();

export const index = async (req: Request, res: Response) => {
    try {
        const products = await Product.getProducts();
        res.json(products);
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
                .json("please input product id, must be an integer.");
        const product = await Product.show(req.params.id as unknown as number);
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
        const product = await Product.update(
            req.params.id as unknown as number,
            req.body.name,
            req.body.price
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
                .json("please input product id, must be an integer.");
        await Product.remove(req.params.id as unknown as number);
        res.json("deleted");
    } catch (e) {
        console.log(e);
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
        });
        res.json(product);
    } catch (e) {
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};
