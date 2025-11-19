import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MAX_PRODUCTS = 5;

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  imageUri?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductStore {
  products: Product[];
  productCount: number;
  loading: boolean;
  refreshing: boolean;
  isAtMaxLimit: boolean;

  // Actions
  loadProducts: () => void;
  refreshProducts: () => void;
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => boolean;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | null;
  searchProducts: (searchTerm: string) => Product[];
  initializeStore: () => void;
  setLoading: (loading: boolean) => void;
  checkProductLimit: () => boolean;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      productCount: 0,
      loading: false,
      refreshing: false,
      isAtMaxLimit: false,

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      checkProductLimit: () => {
        const { productCount } = get();
        return productCount >= MAX_PRODUCTS;
      },

      initializeStore: () => {
        const { products } = get();
        const count = products.length;
        const isAtMaxLimit = count >= MAX_PRODUCTS;
        set({ productCount: count, isAtMaxLimit, loading: false });
      },

      loadProducts: () => {
        const { products } = get();
        const count = products.length;
        const isAtMaxLimit = count >= MAX_PRODUCTS;
        set({ productCount: count, isAtMaxLimit, loading: false, refreshing: false });
      },

      refreshProducts: () => {
        const { products } = get();
        const count = products.length;
        const isAtMaxLimit = count >= MAX_PRODUCTS;
        set({ productCount: count, isAtMaxLimit, refreshing: false });
      },

      searchProducts: (searchTerm: string) => {
        const { products } = get();
        if (!searchTerm.trim()) {
          return products;
        }
        return products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      },

      getProductById: (id: number) => {
        const { products } = get();
        return products.find((product) => product.id === id) || null;
      },

      createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        const { products, productCount } = get();

        // Check if at maximum limit
        if (productCount >= MAX_PRODUCTS) {
          return false; // Indicate creation was blocked
        }

        const now = new Date().toISOString();
        const newProduct: Product = {
          ...product,
          id: Date.now(), // Simple ID generation
          createdAt: now,
          updatedAt: now,
        };

        const updatedProducts = [newProduct, ...products];
        const count = updatedProducts.length;
        const isAtMaxLimit = count >= MAX_PRODUCTS;

        set({
          products: updatedProducts,
          productCount: count,
          isAtMaxLimit,
        });

        return true; // Indicate success
      },

      updateProduct: (id: number, productUpdate: Partial<Product>) => {
        const { products } = get();
        const now = new Date().toISOString();

        const updatedProducts = products.map((product) =>
          product.id === id ? { ...product, ...productUpdate, updatedAt: now } : product
        );

        set({ products: updatedProducts });
      },

      deleteProduct: (id: number) => {
        const { products } = get();
        const updatedProducts = products.filter((product) => product.id !== id);
        const count = updatedProducts.length;
        const isAtMaxLimit = count >= MAX_PRODUCTS;

        set({
          products: updatedProducts,
          productCount: count,
          isAtMaxLimit,
        });
      },
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
