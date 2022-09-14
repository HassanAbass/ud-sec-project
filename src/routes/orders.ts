import express from "express";
import { createOrderMiddleware } from "./middlewares/orders";
import { index, create } from "../handlers/orders";
import { verifyAuthToken } from "./middlewares/user";
const router = express.Router();

router.get("/", verifyAuthToken, index);
router.post("/", verifyAuthToken, createOrderMiddleware, create);

export default router;
