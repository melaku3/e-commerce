// This file contains the types for the product and user data.

// product types
export interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    brand: string;
    category: {
        _id: string;
        name: string;
    };
    color: string[];
    countInStock: number;
    rating: number;
    reviews: string[];
    size: string[];
    slug: string;
    tags: string[];
}
