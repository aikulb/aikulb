import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../services/apiClient';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aikulb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const isInitialSyncDone = useRef(false);

  // Sync state to LocalStorage & Database
  useEffect(() => {
    try {
      localStorage.setItem('aikulb_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }

    const token = localStorage.getItem('aikulb_token');
    if (token) {
      // Async sync with database
      api.syncCart(cartItems).catch(err => {
        console.error('Failed to sync cart with database:', err);
      });
    }
  }, [cartItems]);

  // Load / Merge cart from Database when user logs in or page reloads with token
  useEffect(() => {
    const fetchDbCart = async () => {
      const token = localStorage.getItem('aikulb_token');
      if (!token || isInitialSyncDone.current) return;

      isInitialSyncDone.current = true;
      const res = await api.getCart();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setCartItems(prevLocal => {
          const mergedMap = new Map();

          // Add DB items first
          res.data.forEach(item => {
            if (item && item.itemKey) {
              mergedMap.set(item.itemKey, item);
            }
          });

          // Merge local items if they exist
          prevLocal.forEach(localItem => {
            if (localItem && localItem.itemKey) {
              if (mergedMap.has(localItem.itemKey)) {
                const dbItem = mergedMap.get(localItem.itemKey);
                mergedMap.set(localItem.itemKey, {
                  ...dbItem,
                  quantity: Math.max(dbItem.quantity, localItem.quantity)
                });
              } else {
                mergedMap.set(localItem.itemKey, localItem);
              }
            }
          });

          const mergedArray = Array.from(mergedMap.values());
          api.syncCart(mergedArray);
          return mergedArray;
        });
      }
    };

    fetchDbCart();
  }, []);

  const addToCart = (product, quantity = 1, customConfig = null) => {
    setCartItems(prev => {
      const itemKey = customConfig ? `${product.id}-${JSON.stringify(customConfig)}` : product.id;
      const existing = prev.find(item => item.itemKey === itemKey);

      if (existing) {
        return prev.map(item =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          itemKey,
          id: product.id,
          name: product.name,
          price: product.price,
          original_price: product.original_price,
          material: product.material,
          image_url: product.image_url,
          quantity,
          customConfig,
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.itemKey === itemKey ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    const token = localStorage.getItem('aikulb_token');
    if (token) {
      api.clearCartDb().catch(err => console.error('Failed to clear cart in DB:', err));
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
