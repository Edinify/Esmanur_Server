import express from "express";

import { authMiddleware, checkAdminAndSuperAdmin } from "../middleware/auth.js";
import {
  createFood,
  deleteFood,
  getFoodsForPagination,
  updateFood,
} from "../controllers/foodController.js";

const router = express.Router();

router.get("/", authMiddleware, checkAdminAndSuperAdmin, getFoodsForPagination);
router.post("/", authMiddleware, checkAdminAndSuperAdmin, createFood);
router.patch("/:id", authMiddleware, checkAdminAndSuperAdmin, updateFood);
router.delete("/:id", authMiddleware, checkAdminAndSuperAdmin, deleteFood);

export default router;
