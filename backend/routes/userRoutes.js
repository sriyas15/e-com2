import express from "express";
import { registerUser,login } from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);

export default router;
