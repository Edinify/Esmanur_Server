import express from "express";
import {
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
  updateAdminPassword,
  updateAdminPasswordWithoutCheckingOldPassword,
  updateSuperAdmin,
} from "../controllers/adminController.js";
import {
  authMiddleware,
  checkAdminAndSuperAdmin,
  checkSuperAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, checkSuperAdmin, getAdmins);
router.get("/current", authMiddleware, getAdmin);
router.patch("/:id", authMiddleware, checkSuperAdmin, updateAdmin);
router.patch("/super/:id", authMiddleware, checkSuperAdmin, updateSuperAdmin);
router.patch(
  "/me/password",
  authMiddleware,
  checkAdminAndSuperAdmin,
  updateAdminPassword
);
router.patch("/password/:id", updateAdminPasswordWithoutCheckingOldPassword);
router.delete("/:id", authMiddleware, checkSuperAdmin, deleteAdmin);

export default router;
