import express from "express";
import {
    createUserMiddleware,
    updateUserMiddleware,
    verifyAuthToken,
} from "./middlewares/user";
import { index, show, create, update, remove } from "../handlers/users";
const router = express.Router();

router.get("/", verifyAuthToken, index);
router.get("/:id", verifyAuthToken, show);
router.put("/:id", verifyAuthToken, updateUserMiddleware, update);
router.delete("/:id", verifyAuthToken, remove);
router.post("/", createUserMiddleware, create);

export default router;
