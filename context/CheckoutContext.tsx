'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Address, CheckoutStage } from '@/types';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'stripe' | 'apple_pay';
  name: string;
  isDefault: boolean;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface CheckoutContextType {
  checkoutStage: CheckoutStage;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  paymentMethod: PaymentMethod | null;
  shippingMethod: ShippingMethod | null;
  orderNotes: string;
  discountCode: string;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  subtotal: number;
  total: number;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed';
  setCheckoutStage: (stage: CheckoutStage) => void;
  setShippingAddress: (address: Address) => void;
  setBillingAddress: (address: Address) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setOrderNotes: (notes: string) => void;
  applyDiscountCode: (code: string) => Promise<void>;
  calculateTotals: () => void;
  processPayment: () => Promise<void>;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [checkoutStage, setCheckoutStage] = useState<CheckoutStage>('cart');
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const applyDiscountCode = useCallback(async (code: string) => {
    try {
      const response = await fetch('/api/discount/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setDiscountCode(code);
        setDiscountAmount(data.discount);
      } else {
        throw new Error('Invalid discount code');
      }
    } catch (error) {
      console.error('Failed to apply discount:', error);
      setDiscountCode('');
      setDiscountAmount(0);
    }
  }, []);

  const calculateTotals = useCallback(() => {
    // This would normally use cart context data
    const baseSubtotal = 100; // Replace with actual cart total
    const tax = baseSubtotal * 0.08; // 8% tax rate
    const shipping = shippingMethod?.price || 0;
    const discount = discountAmount;
    
    setSubtotal(baseSubtotal);
    setTaxAmount(tax);
    setShippingAmount(shipping);
    setTotal(baseSubtotal + tax + shipping - discount);
  }, [shippingMethod, discountAmount]);

  const processPayment = useCallback(async () => {
    setPaymentStatus('processing');
    
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          billingAddress,
          total,
        }),
      });
      
      if (response.ok) {
        setPaymentStatus('success');
        setCheckoutStage('confirmation');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Payment error:', error);
    }
  }, [paymentMethod, shippingAddress, billingAddress, total]);

  const resetCheckout = useCallback(() => {
    setCheckoutStage('cart');
    setShippingAddress(null);
    setBillingAddress(null);
    setPaymentMethod(null);
    setShippingMethod(null);
    setOrderNotes('');
    setDiscountCode('');
    setDiscountAmount(0);
    setPaymentStatus('idle');
  }, []);

  const value: CheckoutContextType = {
    checkoutStage,
    shippingAddress,
    billingAddress,
    paymentMethod,
    shippingMethod,
    orderNotes,
    discountCode,
    discountAmount,
    taxAmount,
    shippingAmount,
    subtotal,
    total,
    paymentStatus,
    setCheckoutStage,
    setShippingAddress,
    setBillingAddress,
    setPaymentMethod,
    setShippingMethod,
    setOrderNotes,
    applyDiscountCode,
    calculateTotals,
    processPayment,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextType {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
