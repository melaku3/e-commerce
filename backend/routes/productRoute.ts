import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController";
import fileUpload from "express-fileupload";

const productRouter = express.Router();

productRouter.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

productRouter.route("/")
    .get(getProducts)
    .post(createProduct)

productRouter.route("/:id")
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)

export default productRouter;