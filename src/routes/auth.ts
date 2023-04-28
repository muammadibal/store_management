import express, { Express } from "express";
import { signIn, signOut, isSignIn } from "../controllers/auth";
const router = express.Router();

router.get("/me", isSignIn);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

module.exports = router;
