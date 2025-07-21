import restaurantController from "../controllers/restaurant.controller.js"; // แก้ชื่อ import

import express from "express";
const router = express.Router();

// POST https://localhost:5000/api/v1/restaurant
router.post("/", restaurantController.create);
// GET https://localhost:5000/api/v1/restaurant
router.get("/",restaurantController.getAll);
// GET https://localhost:5000/api/v1/restaurant:id
router.get("/:id",restaurantController.getById);
// PUT https://localhost:5000/api/v1/restaurant/:id
router.put("/:id", restaurantController.update);
// DELETE https://localhost:5000/api/v1/restaurant/:id
router.delete("/:id", restaurantController.deleteById)
export default router; // แก้ชื่อให้ตรงกับที่ประกาศไว้
