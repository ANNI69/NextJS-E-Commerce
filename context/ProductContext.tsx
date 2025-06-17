'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '@/types';

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  productCategories: string[];
  currentProduct: Product | null;
  productLoading: boolean;
  productError: string | null;
  searchQuery: string;
  filterOptions: ProductFilters;
  sortOption: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popularity';
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  searchProducts: (query: string) => void;
  setFilterOptions: (filters: ProductFilters) => void;
  setSortOption: (sort: ProductContextType['sortOption']) => void;
  clearFilters: () => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<ProductFilters>({});
  const [sortOption, setSortOption] = useState<ProductContextType['sortOption']>('popularity');

  const fetchProducts = useCallback(async () => {
    setProductLoading(true);
    setProductError(null);
    
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.products);
      setFeaturedProducts(data.featured || []);
      setProductCategories(data.categories || []);
    } catch (error) {
      setProductError(error instanceof Error ? error.message : 'Failed to fetch products');
    } finally {
      setProductLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id: string) => {
    setProductLoading(true);
    setProductError(null);
    
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      
      const product = await response.json();
      setCurrentProduct(product);
    } catch (error) {
      setProductError(error instanceof Error ? error.message : 'Failed to fetch product');
      setCurrentProduct(null);
    } finally {
      setProductLoading(false);
    }
  }, []);

  const searchProducts = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearFilters = useCallback(() => {
    setFilterOptions({});
    setSearchQuery('');
    setSortOption('popularity');
  }, []);

  const value: ProductContextType = {
    products,
    featuredProducts,
    productCategories,
    currentProduct,
    productLoading,
    productError,
    searchQuery,
    filterOptions,
    sortOption,
    fetchProducts,
    fetchProductById,
    searchProducts,
    setFilterOptions,
    setSortOption,
    clearFilters,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextType {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
