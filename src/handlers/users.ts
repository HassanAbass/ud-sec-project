import { Request, Response } from "express";
import { VALIDATION_CODE } from "../constants";
import { UserModel } from "../models/User";

const User = new UserModel();

export const login = async (req: Request, res: Response) => {
    res.json(await User.authenticate(req.body.firstName, req.body.password));
};
export const index = async (req: Request, res: Response) => {
    res.json(await User.getUsers());
};

export const show = async (req: Request, res: Response) => {
    const id = req.params.id as unknown as number;
    if (!id || isNaN(id))
        return res
            .status(VALIDATION_CODE)
            .json("please input product id, must be an integer.");
    res.json(await User.show(req.params.id as unknown as number));
};

export const create = async (req: Request, res: Response) => {
    res.json(
        await User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        })
    );
};
