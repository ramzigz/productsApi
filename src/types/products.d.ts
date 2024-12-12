// src/types/products.d.ts

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
    // Include additional fields if needed
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface SearchResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }

export type PaginationParams = {
    limit: number;
    skip: number;
    select?: string;
  };
  
  export type SearchParams = {
    query: string;
  };
  
  