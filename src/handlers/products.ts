import { Request, Response } from "express";
import { VALIDATION_CODE } from "../constants";
import { ProductModel } from "../models/Product";

const Product = new ProductModel();

export const index = async (req: Request, res: Response) => {
    res.json(await Product.getProducts());
};

export const show = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    if (!id || isNaN(id))
        return res
            .status(VALIDATION_CODE)
            .json("please input product id, must be an integer.");
    res.json(await Product.show(req.params.id as unknown as number));
};

export const create = async (req: Request, res: Response) => {
    res.json(
        await Product.create({
            name: req.body.firstName,
            price: req.body.price,
        })
    );
};
