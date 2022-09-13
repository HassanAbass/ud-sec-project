import express, { Request, Response } from "express";
import {
    createUserMiddleware,
    verifyAuthToken,
    authenticateUserMiddleware,
} from "./middlewares/user";
import { login, index, show, create } from "../controllers/users";
const router = express.Router();

router.post("/users/login", authenticateUserMiddleware, login);
router.get("/users", verifyAuthToken, index);
router.get("/users/:id", verifyAuthToken, show);
router.post("/users", createUserMiddleware, verifyAuthToken, create);

export default router;
