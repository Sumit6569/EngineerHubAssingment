
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square w-full overflow-hidden bg-gray-100 p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-2 font-medium text-gray-900" title={product.title}>
            {product.title}
          </h3>
          <div className="mb-1 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs capitalize">
            {product.category}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <p className="font-semibold text-shop-primary">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm text-yellow-500">★</span>
            <span className="text-xs text-gray-600">{product.rating.rate}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
