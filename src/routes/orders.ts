import express from "express";
import {
    createOrderMiddleware,
    updateOrderMiddleware,
} from "./middlewares/orders";
import { index, create, show, update, remove } from "../handlers/orders";
import { verifyAuthToken } from "./middlewares/user";
const router = express.Router();

router.get("/", verifyAuthToken, index);
router.get("/:id", verifyAuthToken, show);
router.put("/:id", verifyAuthToken, updateOrderMiddleware, update);
router.delete("/:id", verifyAuthToken, remove);
router.post("/", verifyAuthToken, createOrderMiddleware, create);

export default router;
