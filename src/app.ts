import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import appRoutes from './routes/index';
import swaggerSpec from './swagger/swaggerConfig';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set up rate limiting: 200 requests per minute per client (IP)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429,
  headers: true,
});

// Apply rate limiting globally for all routes
app.use(limiter);


/**
  * App routes.
  */
app.use('/products', appRoutes.productsRoutes);
app.get('/', (req, res) => {
  res.send('Hello, Taho AI');
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});