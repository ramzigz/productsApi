import { Request, Response } from 'express';
import { fetchAllProducts, fetchProductById, searchProducts, fetchProductsByCategory } from '../services/products.service';

/**
 * Get all products with pagination
 */
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string, 10) || 10;  // Default to 10 products per page
  const skip = parseInt(req.query.skip as string, 10) || 0;    // Default to skip 0 products
  const select = req.query.select as string || '';              // Optional fields to select
  
  try {
    const products = await fetchAllProducts(limit, skip, select);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a product by ID
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await fetchProductById(productId);
    res.status(200).json(product);
  } catch (error: any) {
    if (error.message === 'Product not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

/**
 * Search for products
 */
export const searchForProducts = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ message: 'Query parameter "q" is required' });
    return;
  }

  try {
    const products = await searchProducts(query);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  const category = req.params.category;

  try {
    const products = await fetchProductsByCategory(category);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
