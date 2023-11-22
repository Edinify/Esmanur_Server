import express from "express";

import { authMiddleware, checkAdminAndSuperAdmin } from "../middleware/auth.js";
import { createUniform, deleteUniform, getUniformsForPagination, updateUniform } from "../controllers/uniformController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkAdminAndSuperAdmin,
  getUniformsForPagination
);
router.post("/", authMiddleware, checkAdminAndSuperAdmin, createUniform);
router.patch("/:id", authMiddleware, checkAdminAndSuperAdmin, updateUniform);
router.delete("/:id", authMiddleware, checkAdminAndSuperAdmin, deleteUniform);

export default router;
