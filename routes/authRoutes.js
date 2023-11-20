import express from "express";
import {
  changeForgottenPassword,
  login,
  registerAdmin,
  refreshToken,
  sendCodeToEmail,
  checkOtpCode,
  registerSuperAdmin,
} from "../controllers/authController.js";
import { authMiddleware, checkSuperAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/sign/super-admin", registerSuperAdmin);
router.post("/sign/admin", authMiddleware, checkSuperAdmin, registerAdmin);
router.post("/login", login);
router.get("/refresh_token", refreshToken);
router.post("/login/forget/send_to_email", sendCodeToEmail);
router.post("/login/forget/check_otp", checkOtpCode);
router.patch("/login/forget/change_password", changeForgottenPassword);

export default router;
