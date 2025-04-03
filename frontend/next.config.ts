import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['https://res.cloudinary.com', 'res.cloudinary.com', 'images.unsplash.com', 'cdn.shopify.com', 'cdn.pixabay.com'],
  }
};

export default nextConfig;
