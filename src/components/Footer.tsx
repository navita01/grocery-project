import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">About FreshMart</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your one-stop destination for fresh groceries and everyday essentials delivered right to your doorstep.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'FAQs', 'Shipping Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'].map(category => (
                <li key={category}>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="px-6 py-2 bg-green-500 text-white rounded-r-full hover:bg-green-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 FreshMart. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;