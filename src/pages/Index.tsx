
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getProducts, getProductsByCategory } from '../lib/api';
import { Product } from '../types/product';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Handle category selection
  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setIsLoading(true);
    setError(null);
    
    try {
      let filteredData;
      
      if (category === 'all') {
        filteredData = products;
      } else {
        filteredData = await getProductsByCategory(category);
      }
      
      setFilteredProducts(filteredData);
    } catch (err) {
      setError(`Failed to fetch ${category} products. Please try again later.`);
      toast({
        title: "Error",
        description: `Failed to load ${category} products. Please try again.`,
        variant: "destructive",
      });
      setFilteredProducts([]); // Clear the list on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (selectedCategory === 'all') {
      // Retry fetching all products
      setProducts([]);
      setFilteredProducts([]);
      handleCategoryChange('all');
    } else {
      // Retry fetching category products
      handleCategoryChange(selectedCategory);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Our Products</h1>
        
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>

        {isLoading && (
          <div className="my-12">
            <LoadingSpinner size="large" />
          </div>
        )}

        {error && !isLoading && (
          <div className="my-12">
            <ErrorDisplay message={error} onRetry={handleRetry} />
          </div>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-500">No products found</h2>
            <p className="text-gray-400 mt-2">Try selecting a different category</p>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} />
        )}
      </main>
    </div>
  );
};

export default Index;
