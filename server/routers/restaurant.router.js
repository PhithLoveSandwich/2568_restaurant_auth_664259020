import restaurantController from "../controllers/restaurant.controller.js"; // แก้ชื่อ import
import authMiddleware from "../middleware/authjwt.js"
import express from "express";
const router = express.Router();

// POST https://localhost:5000/api/v1/restaurant
router.post("/", authMiddleware.verifyToken, authMiddleware.isAdmin , restaurantController.create);
// GET https://localhost:5000/api/v1/restaurant
router.get("/",restaurantController.getAll);
// GET https://localhost:5000/api/v1/restaurant:id
router.get("/:id", authMiddleware.verifyToken ,restaurantController.getById);
// PUT https://localhost:5000/api/v1/restaurant/:id
router.put("/:id", authMiddleware.verifyToken, authMiddleware.isModOrAdmin , restaurantController.update);
// DELETE https://localhost:5000/api/v1/restaurant/:id
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.isAdmin , restaurantController.deleteById)
export default router; // แก้ชื่อให้ตรงกับที่ประกาศไว้
