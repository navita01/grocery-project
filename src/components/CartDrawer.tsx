import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    getTotalPrice, 
    updateQuantity 
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-gray-700 mr-2" />
              <h2 className="text-lg font-medium">Your Cart</h2>
              <span className="ml-2 text-sm text-gray-500">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {/* Body - Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.id} className="py-4 flex">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.weight}</p>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4 text-gray-500" />
                          </button>
                          <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-green-600 hover:text-green-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer - Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between mb-4">
                <span className="text-base font-medium text-gray-900">Subtotal</span>
                <span className="text-base font-medium text-gray-900">{formatCurrency(getTotalPrice())}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout</p>
              <button
                className="w-full bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full text-center mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;