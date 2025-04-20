import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryList from './components/CategoryList';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { debounce } from './utils/helpers';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create a debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setSearchQuery(query);
    }, 300),
    []
  );
  
  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };
  
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Filter by category if one is selected
      const matchesCategory = selectedCategory 
        ? product.category === selectedCategory 
        : true;
      
      // Filter by search query if one exists
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);
  
  // Scroll to top when changing categories
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar onSearch={handleSearch} />
          
          <main className="pt-16">
            <CategoryList 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            
            <div className="container mx-auto px-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedCategory ? selectedCategory : 'All Products'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
            
            <ProductGrid products={filteredProducts} searchQuery={searchQuery} />
          </main>
          
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;