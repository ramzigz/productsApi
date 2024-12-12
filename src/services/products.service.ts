import fetch from 'node-fetch';
import redis from '../utils/redisClient';
import { ProductsResponse } from '../types/products';
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();
const baseUrl = process.env.DUMMYJSON_BASE_URL;

/**
 * Fetch all products from DummyJSON API with pagination and cache the response.
 * @param limit - Number of products to fetch
 * @param skip - Number of products to skip (for pagination)
 * @param select - Optional comma-separated list of fields to fetch (e.g. "title,price")
 */
export const fetchAllProducts = async (
  limit: number = 10,
  skip: number = 0,
  select: string = ''
) => {
  const cacheKey = `products:all:${limit}:${skip}:${select}`;  // Cache key for all products

  // Check Redis cache first
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache');
    return JSON.parse(cachedData);  // Return cached data if available
  }

  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
  });

  if (select) {
    queryParams.append('select', select);
  }

  const response = await fetch(
    `${baseUrl}?${queryParams.toString()}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ProductsResponse = await response.json();

  // Cache the data in Redis for 1 hour (3600 seconds)
  redis.setex(cacheKey, 3600, JSON.stringify(data.products));

  return data.products;
};

/**
 * Fetch a single product by ID from DummyJSON API and cache the response.
 */
export const fetchProductById = async (id: number) => {
  const cacheKey = `product:${id}`;

  // Check Redis cache first
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache');
    return JSON.parse(cachedData);  // Return cached data if available
  }

  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }

  const data = await response.json();

  // Cache the product data for 1 hour
  redis.setex(cacheKey, 3600, JSON.stringify(data));

  return data;
};

/**
 * Search for products using a query and cache the response.
 */
export const searchProducts = async (query: string) => {
  const cacheKey = `products:search:${query}`;

  // Check Redis cache first
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache');
    return JSON.parse(cachedData);  // Return cached data if available
  }

  const response = await fetch(
    `${baseUrl}/search?q=${query}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();

  // Cache the search results for 1 hour
  redis.setex(cacheKey, 3600, JSON.stringify(data.products));

  return data.products;
};

/**
 * Fetch products by category and cache the response.
 */
export const fetchProductsByCategory = async (category: string) => {
  const cacheKey = `products:category:${category}`;

  // Check Redis cache first
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('Serving from cache');
    return JSON.parse(cachedData);  // Return cached data if available
  }

  const response = await fetch(
    `${baseUrl}/category/${category}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }

  const data = await response.json();

  // Cache the products by category for 1 hour
  redis.setex(cacheKey, 3600, JSON.stringify(data.products));

  return data.products;
};
