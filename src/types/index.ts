export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  weight: string;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}