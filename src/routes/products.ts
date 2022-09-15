import express from "express";
import { createProductMiddleware } from "./middlewares/products";
import { index, show, create, update, remove } from "../handlers/products";
import { verifyAuthToken } from "./middlewares/user";
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.put("/:id", verifyAuthToken, createProductMiddleware, update);
router.delete("/:id", verifyAuthToken, remove);
router.post("/", verifyAuthToken, createProductMiddleware, create);

export default router;
