// src/types/index.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
    avatar?: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    rating: number;
    reviews: number;
  }
  
  export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selectedVariant?: string;
  }
  
  export interface Address {
    id: string;
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    shippingAddress: Address;
    paymentMethod: string;
  }
  
  export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    duration?: number;
  }
  
  export type Theme = 'light' | 'dark';
  export type Language = 'en' | 'es' | 'fr' | 'de';
  export type CheckoutStage = 'cart' | 'shipping' | 'payment' | 'review' | 'confirmation';
  