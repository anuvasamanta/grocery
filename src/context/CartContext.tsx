'use client';
import { createContext, useContext, useState } from 'react';
import { CartItem, GroceryItem } from '@/lib/type';

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (item: GroceryItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItem:any
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (item: GroceryItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  const getTotalItem = (): number => {
    let totalItem: number = 0;
    for (const item in cart) {
      const quantity = cart[item] as any;
      if (quantity > 0) {
        totalItem += quantity;
      }
    }
    return totalItem;
  };
  
  
  
  
  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, updateQuantity,getTotalItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};