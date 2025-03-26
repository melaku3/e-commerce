import express from "express";
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.route("/")
    .get(getCategories)
    .post(createCategory);

categoryRouter.route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

export default categoryRouter;

