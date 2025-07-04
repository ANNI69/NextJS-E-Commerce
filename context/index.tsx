'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { ProductProvider } from './ProductContext';
import { CheckoutProvider } from './CheckoutContext';
import { UIProvider } from './UIContext';
import { OrderProvider } from './OrderContext';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <UIProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
              <CheckoutProvider>
                <OrderProvider>
                  {children}
                </OrderProvider>
              </CheckoutProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </UIProvider>
  );
}

// Re-export all hooks for convenience
export { useAuth } from './AuthContext';
export { useCart } from './CartContext';
export { useProducts } from './ProductContext';
export { useCheckout } from './CheckoutContext';
export { useUI } from './UIContext';
