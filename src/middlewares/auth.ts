import { NextFunction, Request, Response } from "express";
import User from "../models/user";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Please sign in to your account" });

  const user: any = await User.findOne({
    where: {
      uuid: req.session.userId
    }
  });
  if (!user) return res.status(404).json({ msg: "User doesn't exists" });
  const userData = {
    userId: user.id,
    role: user.role
  };
  req.body = userData;
  next();
};

export default verifyUser;
