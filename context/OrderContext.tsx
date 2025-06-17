'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Order, Address } from '@/types'; // Import your types

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  orderStatus: string;
  trackingInfo: string | null;
  orderFilters: Record<string, any>;
  fetchOrders: (userId: string, filters?: Record<string, any>) => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  setOrderStatus: (status: string) => void;
  setTrackingInfo: (info: string | null) => void;
  setOrderFilters: (filters: Record<string, any>) => void;
  clearFilters: () => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

interface OrderProviderProps {
  children: ReactNode;
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>('pending');
  const [trackingInfo, setTrackingInfo] = useState<string | null>(null);
  const [orderFilters, setOrderFilters] = useState<Record<string, any>>({});

  // Example: Fetch orders for a user (customer or seller)
  const fetchOrders = useCallback(async (userId: string, filters: Record<string, any> = {}) => {
    try {
      // Replace with your actual API call
      // For customers: /api/orders?userId={userId}&status={status}...
      // For sellers: /api/seller/orders?userId={userId}&status={status}...
      const response = await fetch(`/api/orders?userId=${userId}&${new URLSearchParams(filters)}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);

  // Example: Fetch a single order by ID
  const fetchOrderById = useCallback(async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) throw new Error('Order not found');
      const order = await response.json();
      setCurrentOrder(order);
      setOrderStatus(order.status);
      setTrackingInfo(order.trackingInfo || null);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setOrderFilters({});
  }, []);

  const value: OrderContextType = {
    orders,
    currentOrder,
    orderStatus,
    trackingInfo,
    orderFilters,
    fetchOrders,
    fetchOrderById,
    setOrderStatus,
    setTrackingInfo,
    setOrderFilters,
    clearFilters,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextType {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
