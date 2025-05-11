
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProduct } from '../lib/api';
import { Product } from '../types/product';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        setError('Product ID is missing');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, toast]);

  const handleRetry = () => {
    setProduct(null);
    setIsLoading(true);
    setError(null);
    
    if (id) {
      getProduct(id)
        .then((data) => {
          setProduct(data);
          setIsLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch product details. Please try again later.');
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center mb-6 text-shop-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all products
        </Link>

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

        {!isLoading && !error && product && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="p-8 bg-white flex items-center justify-center">
                <div className="w-full max-w-md h-[300px] md:h-[400px] flex items-center justify-center bg-gray-50 rounded-lg p-6">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              
              {/* Product Details */}
              <div className="p-8">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 capitalize">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center mr-4">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{product.rating.rate}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({product.rating.count} reviews)</span>
                </div>
                
                <p className="text-2xl font-bold text-shop-primary mb-6">
                  ${product.price.toFixed(2)}
                </p>
                
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-2">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-shop-primary hover:bg-shop-primary/90">
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
