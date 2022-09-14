import { Request, Response } from "express";
import { VALIDATION_CODE } from "../../constants";
import { validateNumber } from "../../helpers/request";

export const createProductMiddleware = (
    req: Request,
    res: Response,
    next: Function
) => {
    const data: string[] = [];
    if (!req.body.name) data.push("name field is required");
    if (!validateNumber(req.body.price))
        data.push("price field is required and must be a positive number");
    if (data.length) {
        return res.status(VALIDATION_CODE).json(data);
    }
    next();
};
