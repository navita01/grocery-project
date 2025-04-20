import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, isOpen, onClose }) => {
  const { addToCart, isInCart, cartItems, updateQuantity } = useCart();
  
  if (!isOpen) return null;
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close product detail"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="p-6 w-full md:w-1/2 flex flex-col">
            <div className="mb-4">
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-gray-900 mr-2">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-gray-500">/ {product.weight}</span>
            </div>
            
            {isInCart(product.id) ? (
              <div className="mb-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-2 rounded-l border border-gray-300 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="px-4 py-2 border-t border-b border-gray-300 min-w-[40px] text-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-2 rounded-r border border-gray-300 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center w-full py-3 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors mb-4"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            )}
            
            <div className="mt-auto">
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Availability:</span>
                  <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Category:</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;