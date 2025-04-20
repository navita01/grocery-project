import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, searchQuery }) => {
  return (
    <div className="container mx-auto px-4 pb-12">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg mb-4">No products found.</p>
          {searchQuery && (
            <p className="text-gray-400">
              We couldn't find any products matching "{searchQuery}"
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;