import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/categories';
import * as LucideIcons from 'lucide-react';

interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory, onSelectCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };
  
  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[
      iconName.charAt(0).toUpperCase() + iconName.slice(1)
    ];
    
    return Icon || LucideIcons.ShoppingCart;
  };

  return (
    <div className="relative mt-20 mb-6">
      {/* Left scroll button */}
      <button 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 md:flex hidden"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      
      {/* Categories container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide py-4 px-4 space-x-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map(category => {
          const isSelected = category.name === selectedCategory || 
                            (category.name === 'All' && selectedCategory === '');
          const Icon = getIconComponent(category.icon);
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.name === 'All' ? '' : category.name)}
              className={`flex flex-col items-center justify-center min-w-20 p-3 rounded-xl transition-all transform hover:scale-105 ${
                isSelected 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 shadow-sm hover:shadow'
              }`}
            >
              <div className={`p-2 rounded-full ${isSelected ? 'bg-green-400' : 'bg-gray-100'}`}>
                <Icon size={20} className={isSelected ? 'text-white' : 'text-gray-500'} />
              </div>
              <span className="mt-2 text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
      
      {/* Right scroll button */}
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 md:flex hidden"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};

export default CategoryList;