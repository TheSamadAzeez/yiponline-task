import { create } from 'zustand';
import {
  Product,
  getAllProducts,
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
  deleteProduct as dbDeleteProduct,
  getProductCount,
  initDatabase,
} from '../services/database';

export const MAX_PRODUCTS = 5;

interface ProductStore {
  products: Product[];
  productCount: number;
  loading: boolean;
  refreshing: boolean;
  isAtMaxLimit: boolean;

  // Actions
  loadProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  initializeStore: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  checkProductLimit: () => boolean;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  productCount: 0,
  loading: true,
  refreshing: false,
  isAtMaxLimit: false,

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  checkProductLimit: () => {
    const { productCount } = get();
    return productCount >= MAX_PRODUCTS;
  },

  initializeStore: async () => {
    try {
      await initDatabase();
      await get().loadProducts();
    } catch (error) {
      console.error('Error initializing store:', error);
      throw error;
    }
  },

  loadProducts: async () => {
    try {
      set({ loading: true });
      const products = await getAllProducts();
      const count = await getProductCount();
      const isAtMaxLimit = count >= MAX_PRODUCTS;

      set({
        products,
        productCount: count,
        isAtMaxLimit,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      console.error('Error loading products:', error);
      set({ loading: false, refreshing: false });
      throw error;
    }
  },

  refreshProducts: async () => {
    try {
      set({ refreshing: true });
      const products = await getAllProducts();
      const count = await getProductCount();
      const isAtMaxLimit = count >= MAX_PRODUCTS;

      set({
        products,
        productCount: count,
        isAtMaxLimit,
        refreshing: false,
      });
    } catch (error) {
      console.error('Error refreshing products:', error);
      set({ refreshing: false });
      throw error;
    }
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { productCount } = get();

    // Check if at maximum limit
    if (productCount >= MAX_PRODUCTS) {
      return false; // Indicate creation was blocked
    }

    try {
      await dbCreateProduct(product);
      await get().loadProducts(); // Reload to get updated state
      return true; // Indicate success
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id: number, product: Partial<Product>) => {
    try {
      await dbUpdateProduct(id, product);
      await get().loadProducts(); // Reload to get updated state
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: number) => {
    try {
      await dbDeleteProduct(id);
      await get().loadProducts(); // Reload to get updated state
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
}));
