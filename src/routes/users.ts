import express from "express";
import {
    createUserMiddleware,
    verifyAuthToken,
    // authenticateUserMiddleware,
} from "./middlewares/user";
import { index, show, create } from "../handlers/users";
const router = express.Router();

// router.post("/login", authenticateUserMiddleware, login);
router.get("/", verifyAuthToken, index);
router.get("/:id", verifyAuthToken, show);
router.post("/", createUserMiddleware, create);

export default router;
