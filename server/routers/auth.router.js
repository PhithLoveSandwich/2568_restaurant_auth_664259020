import authController from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

// POST https://localhost:5000/api/v1/auth/register
router.post("/", authController.signup);

export default router;