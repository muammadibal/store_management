import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import argon from "argon2";

const findUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

const findUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id
      }
    });
    if (!user) return res.status(404).json({ msg: "User doesn't exists" });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

const insertUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password doesn't match" });

  const hashPassword = await argon.hash(password);

  try {
    await User.create({ name, email, password: hashPassword, role });

    res.status(201).json({ msg: "Create user success" });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword, role } = req.body;

  const user: any = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User doesn't exists" });

  try {
    let hashPassword;
    if (
      !password ||
      password === "" ||
      password === null ||
      password === undefined
    ) {
      hashPassword = user.password;
    } else {
      hashPassword = await argon.hash(password);
    }

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password doesn't match" });

    await User.update(
      { name, email, password: hashPassword, role },
      {
        where: {
          id: user.id
        }
      }
    );

    res.status(201).json({ msg: "User updated" });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: any = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ msg: "User doesn't exists" });

  try {
    await User.destroy({
      where: {
        id: user.id
      }
    });

    res.status(201).json({ msg: "User deleted" });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export { findUsers, findUser, insertUser, updateUser, deleteUser };
