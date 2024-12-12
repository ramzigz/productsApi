import express from "express";
import {
  getAllProducts,
  getProductById,
  searchForProducts,
  getProductsByCategory,
} from "../controllers/products.controller";
// import { validateRequest } from "../middlewares/validateRequest";
// import { searchProductsSchema } from "../validations/products.validation";

const routes = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products with pagination
 *     description: This endpoint allows you to retrieve all products with pagination support.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Number of products to fetch (default is 10)
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: skip
 *         description: Number of products to skip (for pagination)
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *       500:
 *         description: Internal server error
 */
// Retrieve all products with pagination
routes.get("/", /*validateRequest(paginationAndSelectSchema)*/ getAllProducts);

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Retrieve products by category
 *     description: Fetch products that belong to a specific category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of products to retrieve.
 *     responses:
 *       200:
 *         description: A list of products from the specified category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *       404:
 *         description: Category not found.
 */
// Retrieve products by category
routes.get("/category/:category", getProductsByCategory);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for products
 *     description: Search for products by a query string.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query string.
 *     responses:
 *       200:
 *         description: A list of matching products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *       400:
 *         description: Invalid search query.
 */
// Search for products
routes.get(
  "/search",
  /*validateRequest(searchProductsSchema),*/ searchForProducts
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: This endpoint fetches a single product based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to fetch
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
// Retrieve a single product by ID
routes.get("/:id", getProductById);

export default routes;
