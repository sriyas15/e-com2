import express from "express";
import { getProducts,newProduct,getProductDetails,deleteProduct,
         updateProduct,getProductSuggestions
        } from "../controller/productController.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/products/suggestions").get(getProductSuggestions);
router.route("/admin/products").post(newProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);

export default router;