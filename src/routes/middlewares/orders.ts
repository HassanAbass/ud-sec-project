import { Request, Response } from "express";
import { ORDER_STATUS, VALIDATION_CODE } from "../../constants";
import { validateNumber } from "../../helpers/request";

export const createOrderMiddleware = (
    req: Request,
    res: Response,
    next: Function
) => {
    const data: string[] = [];
    if (!req.body.status || !(req.body.status in ORDER_STATUS))
        data.push(
            `status field is required, and must be in ${Object.values(
                ORDER_STATUS
            )}`
        );
    if (!validateNumber(req.body.product_id))
        data.push("product_id field is required and must be a positive number");
    if (!validateNumber(req.body.product_quantity))
        data.push(
            "product_quantity field is required and must be a positive number"
        );

    if (data.length) {
        return res.status(VALIDATION_CODE).json(data);
    }
    next();
};
