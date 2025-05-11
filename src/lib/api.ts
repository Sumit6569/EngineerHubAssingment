
import { Product, ProductCategory } from "../types/product";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProduct(id: number | string): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products by category: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch products for category ${category}:`, error);
    throw error;
  }
}
