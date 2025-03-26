import categoryModel from "../models/CategoryModel";
import expressAsyncHandler from "express-async-handler";
import { categorySchema } from "../utils/validation";

// @desc    Fetch all categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategories = expressAsyncHandler(async (_req, res) => {
    const categories = await categoryModel.find({});
    res.json(categories);
});

// @desc    Fetch single category
// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategory = expressAsyncHandler(async (req, res) => {
    const validate = categorySchema.pick({ id: true }).safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const category = await categoryModel.findById(validate.data.id);
    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    res.json(category);

});

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
export const createCategory = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    body.name = body.name.toLowerCase().trim();
    const validate = categorySchema.safeParse(body);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const categoryExists = await categoryModel.findOne({ name: req.body.name });
    if (categoryExists) {
        res.status(400).json({ message: "Category already exists" });
        return;
    }

    const category = new categoryModel(validate.data);
    const createdCategory = await category.save();
    res.status(201).json({ message: "Category created" });
});

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
export const updateCategory = expressAsyncHandler(async (req, res) => {
    const body = req.body;
    body.name = body.name.toLowerCase().trim();
    const validate = categorySchema.pick({ id: true }).merge(categorySchema.partial().omit({ id: true })).safeParse({ ...req.params, ...body });
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const category = await categoryModel.findById(validate.data.id);
    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    if (validate.data.name) {
        const categoryExists = await categoryModel.findOne({ name: validate.data.name });
        if (categoryExists && categoryExists._id.toString() !== validate.data.id) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }
    }

    await categoryModel.findByIdAndUpdate(validate.data.id, validate.data, { new: true });
    res.json({ message: "Category updated" });

});

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
export const deleteCategory = expressAsyncHandler(async (req, res) => {
    const validate = categorySchema.pick({ id: true }).safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const category = await categoryModel.findById(validate.data.id);
    if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
    }

    await categoryModel.findByIdAndDelete(validate.data.id);
    res.json({ message: "Category removed" });
});

