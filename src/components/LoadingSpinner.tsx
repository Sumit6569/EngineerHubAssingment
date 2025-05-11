
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`${sizeClasses[size]} rounded-full border-t-shop-primary border-r-shop-primary border-b-transparent border-l-transparent animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
