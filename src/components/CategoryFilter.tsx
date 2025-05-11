
import React, { useEffect, useState } from 'react';
import { getCategories } from '../lib/api';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  if (isLoading) {
    return <div className="w-full h-10 animate-pulse bg-gray-200 rounded-md"></div>;
  }

  return (
    <div className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            selectedCategory === category
              ? 'bg-shop-primary text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
