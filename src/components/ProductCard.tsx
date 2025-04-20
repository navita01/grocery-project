import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import ProductDetail from './ProductDetail';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const alreadyInCart = isInCart(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!alreadyInCart) {
      setIsAdding(true);
      addToCart(product);
      
      setTimeout(() => {
        setIsAdding(false);
      }, 1500);
    }
  };
  
  const openProductDetail = () => {
    setIsDetailOpen(true);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
        onClick={openProductDetail}
      >
        {/* Product Image */}
        <div className="h-48 overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
            {product.weight}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-800 font-medium leading-tight">{product.name}</h3>
              <p className="text-green-600 font-semibold text-lg mt-1">
                {formatCurrency(product.price)}
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={alreadyInCart || isAdding}
              className={`p-2 rounded-full transition-all transform ${
                alreadyInCart 
                  ? 'bg-green-100 text-green-500' 
                  : isAdding
                    ? 'bg-green-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-600 hover:bg-green-500 hover:text-white hover:scale-110'
              }`}
              aria-label={alreadyInCart ? 'Added to cart' : 'Add to cart'}
            >
              {alreadyInCart ? (
                <Check className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
      
      {/* Product Detail Modal */}
      <ProductDetail 
        product={product} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
      />
    </>
  );
};

export default ProductCard;