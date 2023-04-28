import Products from "../models/product";
import { Request, Response, NextFunction } from "express";

const findProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const findProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const insertProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export {
  findProducts,
  findProduct,
  insertProduct,
  updateProduct,
  deleteProduct
};
