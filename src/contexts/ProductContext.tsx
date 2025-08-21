import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { api } from '../lib/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  featured: boolean;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, productData: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.get<Product[]>('/api/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch products from API, using fallback data:', err);

        // Fallback mock data for development/testing
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
            price: 299.99,
            category: 'Electronics',
            stock: 15,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            featured: true
          },
          {
            id: '2',
            name: 'Smart Fitness Watch',
            description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration.',
            price: 199.99,
            category: 'Electronics',
            stock: 8,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
            featured: true
          },
          {
            id: '3',
            name: 'Organic Cotton T-Shirt',
            description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
            price: 29.99,
            category: 'Clothing',
            stock: 25,
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
            featured: false
          },
          {
            id: '4',
            name: 'Professional Camera Lens',
            description: 'High-performance camera lens for professional photography with superior optics.',
            price: 899.99,
            category: 'Electronics',
            stock: 3,
            imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop',
            featured: true
          },
          {
            id: '5',
            name: 'Ergonomic Office Chair',
            description: 'Comfortable ergonomic office chair with lumbar support and adjustable height.',
            price: 449.99,
            category: 'Furniture',
            stock: 12,
            imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
            featured: false
          }
        ];

        setProducts(mockProducts);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      // Use the working endpoint: /api/products
      const newProduct = await api.post<Product>('/api/products', productData);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error("Failed to add product:", err);

      // Provide more helpful error message
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        throw new Error('Not authorized to add products. Please log in with an admin account.');
      }
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Omit<Product, 'id'>) => {
    try {
      // Use the working endpoint: /api/products
      const updatedProduct = await api.put<Product>(`/api/products/${id}`, productData);
      setProducts(prev => prev.map(p => (p.id === id ? updatedProduct : p)));
    } catch (err) {
      console.error("Failed to update product:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        throw new Error('Not authorized to update products. Please log in with an admin account.');
      }
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      // Use the working endpoint: /api/products
      await api.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        throw new Error('Not authorized to delete products. Please log in with an admin account.');
      }
      throw err;
    }
  };

  const value = { products, loading, error, addProduct, updateProduct, deleteProduct };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};