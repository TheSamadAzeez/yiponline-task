import * as SQLite from 'expo-sqlite';

export interface Product {
  id?: number;
  name: string;
  quantity: number;
  price: number;
  imageUri?: string;
  createdAt?: string;
  updatedAt?: string;
}

let db: SQLite.SQLiteDatabase | null = null;

// Initialize database
export const initDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync('storekeeper.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        imageUri TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    if (!db) await initDatabase();

    const result = await db!.getAllAsync<Product>('SELECT * FROM products ORDER BY updatedAt DESC');

    return result;
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
};

// Search products by name
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    if (!db) await initDatabase();

    const result = await db!.getAllAsync<Product>(
      'SELECT * FROM products WHERE name LIKE ? ORDER BY updatedAt DESC',
      [`%${searchTerm}%`]
    );

    return result;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    if (!db) await initDatabase();

    const result = await db!.getFirstAsync<Product>('SELECT * FROM products WHERE id = ?', [id]);

    return result || null;
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error;
  }
};

// Create new product
export const createProduct = async (
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<number> => {
  try {
    if (!db) await initDatabase();

    const result = await db!.runAsync(
      'INSERT INTO products (name, quantity, price, imageUri) VALUES (?, ?, ?, ?)',
      [product.name, product.quantity, product.price, product.imageUri || null]
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
  try {
    if (!db) await initDatabase();

    const updates: string[] = [];
    const values: any[] = [];

    if (product.name !== undefined) {
      updates.push('name = ?');
      values.push(product.name);
    }
    if (product.quantity !== undefined) {
      updates.push('quantity = ?');
      values.push(product.quantity);
    }
    if (product.price !== undefined) {
      updates.push('price = ?');
      values.push(product.price);
    }
    if (product.imageUri !== undefined) {
      updates.push('imageUri = ?');
      values.push(product.imageUri);
    }

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);

    await db!.runAsync(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`, values);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    if (!db) await initDatabase();

    await db!.runAsync('DELETE FROM products WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Get product count
export const getProductCount = async (): Promise<number> => {
  try {
    if (!db) await initDatabase();

    const result = await db!.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM products'
    );

    return result?.count || 0;
  } catch (error) {
    console.error('Error getting product count:', error);
    throw error;
  }
};
