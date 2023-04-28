import { Request, Response } from "express";
import User from "../models/user";
import argon from "argon2";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: any = await User.findOne({
    where: {
      email
    }
  });
  if (!user) return res.status(404).json({ msg: "User doesn't exists" });
  const matchPassword = await argon.verify(user.password, password);

  if (!matchPassword) return res.status(400).json({ msg: "Wrong password" });
  req.session.userId = user.uuid;
  console.log("req.session", req.session);

  const data = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role
  };
  res.status(200).json(data);
};

const isSignIn = async (req: Request, res: Response) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Please sign in to your account" });

  const user: any = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId
    }
  });
  if (!user) return res.status(404).json({ msg: "User doesn't exists" });
  res.status(200).json(user);
};

const signOut = async (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "Cannot logout" });
      res.status(200).json({ msg: "Sign out success" });
    });
  } else {
    res.status(500).json({ msg: "Already sign out" });
  }
};

export { signIn, signOut, isSignIn };
