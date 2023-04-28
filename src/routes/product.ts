import express, { Express } from "express";
import {
  findProduct,
  findProducts,
  insertProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product";
const router = express.Router();

router.get("/products", findProducts);
router.get("/product/:id", findProduct);
router.post("/product", insertProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
