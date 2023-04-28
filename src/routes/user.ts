import express, { Express } from "express";
import {
  findUser,
  findUsers,
  insertUser,
  updateUser,
  deleteUser
} from "../controllers/user";
import verifyUser from "../middlewares/auth";
const router = express.Router();

router.get("/users", verifyUser, findUsers);
router.get("/user/:id", verifyUser, findUser);
router.post("/user", verifyUser, insertUser);
router.put("/user/:id", verifyUser, updateUser);
router.delete("/user/:id", verifyUser, deleteUser);

module.exports = router;
