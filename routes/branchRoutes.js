import express from "express";

import { authMiddleware, checkSuperAdmin } from "../middleware/auth.js";
import {
  createBranch,
  deleteBranch,
  getBranches,
  updateBranch,
} from "../controllers/branchController.js";

const router = express.Router();

router.get("/", authMiddleware, checkSuperAdmin, getBranches);
router.post("/", authMiddleware, checkSuperAdmin, createBranch);
router.patch("/:id", authMiddleware, checkSuperAdmin, updateBranch);
router.delete("/:id", authMiddleware, checkSuperAdmin, deleteBranch);

export default router;
