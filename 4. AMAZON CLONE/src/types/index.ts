export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  specifications?: Record<string, string>;
  features?: string[];
  inStock: boolean;
  brand: string;
  seller?: string;
  deliveryDate?: string;
  primeEligible?: boolean;
  freeDelivery?: boolean;
  offers?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: { id: string; name: string; slug: string; }[];
}

export interface Deal {
  id: string;
  title: string;
  discount: number;
  products: Product[];
  endTime?: Date;
  type: 'lightning' | 'deal-of-day' | 'best-seller';
}

export interface Banner {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  link?: string;
  category?: string;
}