'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const wishlistCount = wishlistItems.length;

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse saved wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.product.id === product.id);
      if (exists) return prev;
      
      return [...prev, {
        id: `wishlist_${product.id}_${Date.now()}`,
        product,
        addedAt: new Date().toISOString(),
      }];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.product.id === productId);
  }, [wishlistItems]);

  const moveToCart = useCallback((productId: string) => {
    const item = wishlistItems.find(item => item.product.id === productId);
    if (item) {
      // This would integrate with cart context
      console.log('Moving to cart:', item.product);
      removeFromWishlist(productId);
    }
  }, [wishlistItems, removeFromWishlist]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const value: WishlistContextType = {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
