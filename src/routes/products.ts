import express from "express";
import { createProductMiddleware } from "./middlewares/products";
import { index, show, create } from "../handlers/products";
import { verifyAuthToken } from "./middlewares/user";
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", verifyAuthToken, createProductMiddleware, create);

export default router;
