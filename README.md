# Product Service API

This project is an Express-based API that interacts with the DummyJSON API to manage products. It implements the following features:

- **Rate Limiting**: Limits the number of requests per client to prevent abuse.
- **Redis Caching**: Caches product data for faster retrieval and reduces unnecessary API calls.
- **Validation**: Validates query parameters, ensuring requests are well-formed and follow the correct format.
- **API Documentation**: Provides Swagger-based documentation for easy integration and usage of the API.

## Features

- **Search Products**: Search for products using various filters (e.g., category, title).
- **Fetch Products by Category**: Retrieve products based on categories.
- **Fetch Single Product**: Retrieve information about a single product by its ID.
- **Rate Limiting**: Allows up to 200 requests per minute per client.
- **Caching with Redis**: Caches responses to reduce external API calls.

## Technologies Used

- **Node.js**: JavaScript runtime used for building the server.
- **Express**: Web framework for handling HTTP requests.
- **Redis**: In-memory data store used for caching product data.
- **Swagger**: Provides auto-generated API documentation.
- **express-validator**: Library for validating incoming requests.
- **dotenv**: Loads environment variables from a `.env` file for configuration.

## Getting Started

### Prerequisites

To run this project, you need to have the following installed:

- Node.js (v14+ recommended)
- Redis (local or remote)
- NPM (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone [https://github.com/ramzigz/productsApi.git](https://github.com/ramzigz/productsApi.git)
   cd productsApi
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up a `.env` file in the root directory to configure your environment variables. Below is a sample `.env` file:

   ```env
    PORT=5000
    DUMMYJSON_BASE_URL=https://dummyjson.com/products
   ```

4. Start Redis locally (if you don't have Redis running yet):

   ```bash
   redis-server
   ```

5. Run the application:

   ```bash
   npm run dev
   ```

6. The application should now be running at `http://localhost:5000`.

## API Endpoints Examples

The following API endpoints are available:

### `GET /search`

Search products with optional query parameters:

- `limit` (optional): Number of products to return (between 1 and 100).
- `skip` (optional): Number of products to skip.
- `select` (optional): Comma-separated list of fields to select (e.g., `title,price`).

Example Request:

```http
GET /search?limit=10&skip=0&select=title,price
```

Example Response:

```json
{
  "success": true,
  "data": [
    {
      "title": "Product 1",
      "price": 100
    },
    {
      "title": "Product 2",
      "price": 150
    }
  ]
}
```

#### `GET /category/:category`

Retrieve products by category.

Example Request:

```http
GET /category/smartphones
```

Example Response:

```json
{
  "success": true,
  "data": [
    {
      "title": "Smartphone 1",
      "category": "smartphones",
      "price": 200
    }
  ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
