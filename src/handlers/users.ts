import { Request, Response } from "express";
import { SERVER_ERROR_CODE, VALIDATION_CODE } from "../constants";
import { UserModel } from "../models/User";

const User = new UserModel();

export const index = async (req: Request, res: Response) => {
    try {
        const users = await User.getUsers();
        res.json(users);
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
        const user = await User.show(req.params.id as unknown as number);
        res.json(user);
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
        const user = await User.update(
            req.params.id as unknown as number,
            req.body.firstName,
            req.body.lastName
        );
        res.json(user);
    } catch (e) {
        console.log(e);
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
        await User.remove(req.params.id as unknown as number);
        res.json("deleted");
    } catch (e) {
        console.log(e);
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const user = await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        });
        res.json(user);
    } catch (e) {
        res.status(SERVER_ERROR_CODE).json("something went wrong");
    }
};
