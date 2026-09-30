import React, { createContext, useContext, useState } from 'react';
import { INITIAL_MOCK_ORDERS } from '../data/mockOrders';

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  // Initialize with realistic mock orders so the screen has active/historical orders on launch
  const [orders, setOrders] = useState(INITIAL_MOCK_ORDERS);

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
