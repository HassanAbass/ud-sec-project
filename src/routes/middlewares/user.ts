import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UNAUTHORIZED_CODE, VALIDATION_CODE } from "../../constants";
export type userRequest = Request & { userId?: number };

export const createUserMiddleware = (
    req: Request,
    res: Response,
    next: Function
) => {
    const data: string[] = [];
    if (!req.body.firstName) data.push("firstName field is required");
    if (!req.body.lastName) data.push("lastName field is required");
    if (!req.body.password) data.push("password field is required");
    if (data.length) {
        return res.status(VALIDATION_CODE).json(data);
    }
    next();
};

export const updateUserMiddleware = (
    req: Request,
    res: Response,
    next: Function
) => {
    const data: string[] = [];
    if (!req.body.firstName) data.push("firstName field is required");
    if (!req.body.lastName) data.push("lastName field is required");
    if (data.length) {
        return res.status(VALIDATION_CODE).json(data);
    }
    next();
};

export const authenticateUserMiddleware = (
    req: Request,
    res: Response,
    next: Function
) => {
    const data: string[] = [];
    if (!req.body.firstName) data.push("firstName field is required");
    if (!req.body.password) data.push("password field is required");
    if (data.length) {
        return res.status(VALIDATION_CODE).json(data);
    }
    next();
};

export const verifyAuthToken = (
    req: userRequest,
    res: Response,
    next: Function
) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JSON_SECRET as jwt.Secret
        );
        req.userId = (decoded as JwtPayload).user?.id;
    } catch (err) {
        return res
            .status(UNAUTHORIZED_CODE)
            .json("Access denied, invalid token");
    }
    next();
};
