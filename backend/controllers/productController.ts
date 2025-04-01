import productModel from "../models/productModel";
import categoryModel from "../models/CategoryModel";
import expressAsyncHandler from "express-async-handler";
import { productSchema } from "../utils/validation";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// upload image to cloudinary
async function uploadImage(image: UploadedFile): Promise<string> {
    return new Promise((resolve, reject) => {
        const { tempFilePath } = image;

        // Ensure the tempFilePath is valid
        if (!tempFilePath) {
            reject("No temporary file path available");
        }

        cloudinary.uploader.upload(tempFilePath, { resource_type: 'auto' }, (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
            } else {
                console.log("Upload success:", result?.secure_url);
                resolve(result?.secure_url || "");
            }
        });
    });
}

// @docs   Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = expressAsyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const products = await productModel.find().skip(skip).limit(limitNumber).populate("category", "name").populate("reviews", "rating comment").select('-createdAt -updatedAt -__v');
    const totalProducts = await productModel.countDocuments();
    res.json({ page: pageNumber, totalPages: Math.ceil(totalProducts / limitNumber), totalProducts, products });
});

// @docs   Fetch single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = expressAsyncHandler(async (req, res) => {
    const validate = productSchema.partial().safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const product = await productModel.findById(validate.data.id).populate("category", "name").populate("reviews", "rating comment").select('-createdAt -updatedAt -__v');
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }

    res.json(product);
});

// @docs   Create a product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = expressAsyncHandler(async (req, res) => {
    const images = req.files?.images as UploadedFile | UploadedFile[];
    const body = req.body;
    body.name = body.name.toLowerCase().trim();
    body.slug = body.slug.toLowerCase().trim();
    body.price = body.price ? parseInt(body.price) : undefined;
    body.countInStock = body.countInStock ? parseInt(body.countInStock) : undefined;
    body.rating = body.rating ? parseFloat(body.rating) : undefined;
    body.discountPrice = body.discountPrice ? parseFloat(body.discountPrice) : undefined;
    body.discountStartDate = body.discountStartDate ? new Date(body.discountStartDate) : undefined;
    body.discountEndDate = body.discountEndDate ? new Date(body.discountEndDate) : undefined;
    body.tags = body.tags ? body.tags.split(",").map((tag: string) => tag.trim()) : undefined;
    body.size = body.size ? body.size.split(",").map((size: string) => size.trim()) : undefined;
    body.color = body.color ? body.color.split(",").map((color: string) => color.trim()) : undefined;
    body.reviews = body.reviews ? body.reviews.split(",").map((review: string) => review.trim()) : undefined;


    const validate = productSchema.partial({ images: true }).safeParse(req.body);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    // check category id is valid or not
    const category = await categoryModel.findById(validate.data.category);
    if (!category) {
        res.status(400).json({ message: "Category not found" });
        return;
    }
    const productExists = await productModel.findOne({ $or: [{ name: validate.data.name }, { slug: validate.data.slug }] });
    if (productExists) {
        res.status(400).json({ message: "Product already exists" });
        return;
    }

    // Check if images is empty or not provided
    if (!images || (Array.isArray(images) && images.length === 0)) {
        res.status(400).json({ message: "Images are required" });
        return;
    }

    // Array to store image URLs
    let imagesUrl: string[] = [];

    // upload each image and push the secure URL to imagesUrl array
    if (Array.isArray(images)) {
        for (let i = 0; i < images.length; i++) {
            const secureUrl = await uploadImage(images[i]);
            imagesUrl.push(secureUrl);
        }
    } else {
        const secureUrl = await uploadImage(images);
        imagesUrl.push(secureUrl);
    }

    validate.data.images = imagesUrl;


    const product = await productModel.create(validate.data);
    await product.save();


    res.status(201).json({ message: "Product created successfully" });

});


// @docs   Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = expressAsyncHandler(async (req, res) => {
    res.json({ message: "update product endpoint " });
});


// @docs   Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = expressAsyncHandler(async (req, res) => {
    const validate = productSchema.partial().safeParse(req.params);
    if (!validate.success) {
        let errMsg = validate.error.errors[0].message;
        res.status(400).json({ message: `${errMsg === 'Required' ? `${validate.error.issues[0].path} is ${errMsg.toLocaleLowerCase()}` : errMsg}` });
        return;
    }

    const product = await productModel.findById(validate.data.id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
    }

    await productModel.findByIdAndDelete(validate.data.id);
    res.json({ message: "Product deleted" });
});

