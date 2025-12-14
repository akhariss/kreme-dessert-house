-- ============================================================
-- KREME DESSERT HOUSE - DATABASE SCHEMA
-- Supabase PostgreSQL
-- 6 Tables: users, products, prices, product_images, product_details, cart
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USERS TABLE (Sync dari Clerk OAuth)
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes untuk performa
CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX idx_users_email ON users(email);

-- ============================================================
-- 2. PRODUCTS TABLE (Info Utama Produk)
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_available ON products(is_available);

-- ============================================================
-- 3. PRICES TABLE (Harga Current)
-- ============================================================
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  currency TEXT DEFAULT 'USD',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IndexesQ
CREATE INDEX idx_prices_product ON prices(product_id);

-- ============================================================
-- 4. PRODUCT_IMAGES TABLE (1 Foto per Produk - Supabase Storage)
-- ============================================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================================
-- 5. PRODUCT_DETAILS TABLE (Info Detail Lengkap)
-- ============================================================
CREATE TABLE product_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  allergen_information TEXT,
  storage_care TEXT,
  ingredients TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_product_details_product ON product_details(product_id);

-- ============================================================
-- 6. CART TABLE (Keranjang Belanja)
-- ============================================================
CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User tidak bisa add produk yang sama 2x (update quantity aja)
  UNIQUE(user_id, product_id)
);

-- Indexes
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_cart_product ON cart(product_id);

-- ============================================================
-- 7. ORDERS TABLE (Riwayat Pesanan)
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);

-- ============================================================
-- 8. ORDER ITEMS TABLE (Detail Barang per Pesanan)
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL, -- Keep record even if product deleted
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_time NUMERIC(10,2) NOT NULL, -- Harga saat beli (penting jika harga berubah)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================================
-- SEED DATA - 8 Produk Existing
-- ============================================================

-- Insert Products
INSERT INTO products (id, name, description, category, is_available) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Rose Macaron', 'Delicate rose-flavored macaron with smooth buttercream filling. A timeless classic that captures the essence of French patisserie elegance.', 'Macarons', true),
('550e8400-e29b-41d4-a716-446655440002', 'Golden Raspberry Tart', 'Buttery tart shell filled with luscious raspberry cream and topped with fresh raspberries. A perfect balance of sweet and tart.', 'Tarts', true),
('550e8400-e29b-41d4-a716-446655440003', 'Chocolate Velvet Cake', 'Rich, moist chocolate cake layered with silky chocolate ganache. Pure indulgence for chocolate lovers.', 'Cakes', true),
('550e8400-e29b-41d4-a716-446655440004', 'Pistachio Choux', 'Light and airy choux pastry filled with creamy pistachio cream. Topped with crushed pistachios for extra crunch.', 'Pastries', true),
('550e8400-e29b-41d4-a716-446655440005', 'Lemon Meringue Pie', 'Tangy lemon custard in a crispy pastry shell, crowned with fluffy torched meringue. A refreshing citrus delight.', 'Pies', true),
('550e8400-e29b-41d4-a716-446655440006', 'Matcha Opera Cake', 'Elegant layers of matcha-infused sponge cake and white chocolate cream. A modern twist on a French classic.', 'Cakes', true),
('550e8400-e29b-41d4-a716-446655440007', 'Vanilla Bean Éclair', 'Classic éclair filled with rich vanilla bean pastry cream and topped with glossy chocolate glaze.', 'Pastries', true),
('550e8400-e29b-41d4-a716-446655440008', 'Strawberry Mille-Feuille', 'Delicate puff pastry layers with vanilla cream and fresh strawberries. The epitome of French pastry artistry.', 'Pastries', true);

-- Insert Prices
INSERT INTO prices (product_id, price, currency) VALUES
('550e8400-e29b-41d4-a716-446655440001', 8.50, 'USD'),
('550e8400-e29b-41d4-a716-446655440002', 12.50, 'USD'),
('550e8400-e29b-41d4-a716-446655440003', 15.00, 'USD'),
('550e8400-e29b-41d4-a716-446655440004', 9.50, 'USD'),
('550e8400-e29b-41d4-a716-446655440005', 13.50, 'USD'),
('550e8400-e29b-41d4-a716-446655440006', 14.50, 'USD'),
('550e8400-e29b-41d4-a716-446655440007', 9.00, 'USD'),
('550e8400-e29b-41d4-a716-446655440008', 15.50, 'USD');

-- Insert Product Images (placeholder URLs - akan di-update setelah upload ke Supabase Storage)
INSERT INTO product_images (product_id, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'https://placeholder.supabase.co/storage/v1/object/public/products/rose-macaron.png'),
('550e8400-e29b-41d4-a716-446655440002', 'https://placeholder.supabase.co/storage/v1/object/public/products/raspberry-tart.png'),
('550e8400-e29b-41d4-a716-446655440003', 'https://placeholder.supabase.co/storage/v1/object/public/products/chocolate-cake.png'),
('550e8400-e29b-41d4-a716-446655440004', 'https://placeholder.supabase.co/storage/v1/object/public/products/pistachio-choux.png'),
('550e8400-e29b-41d4-a716-446655440005', 'https://placeholder.supabase.co/storage/v1/object/public/products/lemon-pie.png'),
('550e8400-e29b-41d4-a716-446655440006', 'https://placeholder.supabase.co/storage/v1/object/public/products/matcha-opera.png'),
('550e8400-e29b-41d4-a716-446655440007', 'https://placeholder.supabase.co/storage/v1/object/public/products/vanilla-eclair.png'),
('550e8400-e29b-41d4-a716-446655440008', 'https://placeholder.supabase.co/storage/v1/object/public/products/strawberry-mille.png');

-- Insert Product Details
INSERT INTO product_details (product_id, allergen_information, storage_care, ingredients) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Contains: Eggs, Dairy, Almonds', 'Store in refrigerator. Best consumed within 3 days.', 'Almond flour, Egg whites, Sugar, Rose extract, Buttercream'),
('550e8400-e29b-41d4-a716-446655440002', 'Contains: Wheat, Dairy, Eggs', 'Refrigerate. Consume within 2 days for best quality.', 'Flour, Butter, Raspberries, Cream, Sugar, Eggs'),
('550e8400-e29b-41d4-a716-446655440003', 'Contains: Wheat, Dairy, Eggs, Soy', 'Store at room temperature or refrigerate. Lasts 5 days.', 'Chocolate, Flour, Sugar, Eggs, Butter, Cocoa powder'),
('550e8400-e29b-41d4-a716-446655440004', 'Contains: Wheat, Dairy, Eggs, Pistachios', 'Best served fresh. Refrigerate if not consumed same day.', 'Choux pastry, Pistachio cream, Crushed pistachios, Eggs, Butter'),
('550e8400-e29b-41d4-a716-446655440005', 'Contains: Wheat, Dairy, Eggs', 'Refrigerate immediately. Consume within 2 days.', 'Lemon juice, Sugar, Eggs, Butter, Flour, Meringue'),
('550e8400-e29b-41d4-a716-446655440006', 'Contains: Wheat, Dairy, Eggs, Soy', 'Refrigerate. Best quality within 4 days.', 'Matcha powder, Flour, Sugar, White chocolate, Cream, Eggs'),
('550e8400-e29b-41d4-a716-446655440007', 'Contains: Wheat, Dairy, Eggs', 'Refrigerate. Consume within 2 days for optimal freshness.', 'Choux pastry, Vanilla beans, Pastry cream, Chocolate, Eggs'),
('550e8400-e29b-41d4-a716-446655440008', 'Contains: Wheat, Dairy, Eggs', 'Refrigerate. Best consumed same day.', 'Puff pastry, Strawberries, Vanilla cream, Sugar, Eggs');

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

-- USERS: Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = clerk_user_id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = clerk_user_id);

-- PRODUCTS: Public read, admin only write
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view prices" ON prices
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product images" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product details" ON product_details
  FOR SELECT USING (true);

-- CART: Users can only manage their own cart
CREATE POLICY "Users can view own cart" ON cart
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = cart.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert to own cart" ON cart
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = cart.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can update own cart" ON cart
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = cart.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete from own cart" ON cart
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = cart.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- ORDERS & ORDER ITEMS: Users can manage their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = orders.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = orders.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN users ON users.id = orders.user_id
      WHERE orders.id = order_items.order_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      JOIN users ON users.id = orders.user_id
      WHERE orders.id = order_items.order_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Function untuk auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk auto-update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prices_updated_at BEFORE UPDATE ON prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_details_updated_at BEFORE UPDATE ON product_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- View: Complete Product Info (join semua tabel)
CREATE OR REPLACE VIEW products_complete AS
SELECT 
  p.id,
  p.name,
  p.description,
  p.category,
  p.is_available,
  pr.price,
  pr.currency,
  pi.image_url,
  pd.allergen_information,
  pd.storage_care,
  pd.ingredients,
  p.created_at,
  p.updated_at
FROM products p
LEFT JOIN prices pr ON p.id = pr.product_id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_details pd ON p.id = pd.product_id;

-- View: Cart with Product Info
CREATE OR REPLACE VIEW cart_complete AS
SELECT 
  c.id,
  c.user_id,
  c.product_id,
  c.quantity,
  p.name as product_name,
  p.description as product_description,
  p.category,
  pr.price as unit_price,
  pi.image_url as product_image,
  (c.quantity * pr.price) as subtotal,
  c.created_at,
  c.updated_at
FROM cart c
JOIN products p ON c.product_id = p.id
JOIN prices pr ON p.id = pr.product_id
LEFT JOIN product_images pi ON p.id = pi.product_id;

-- ============================================================
-- DONE! 🎉
-- ============================================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Create Storage bucket "products" for images
-- 3. Upload product images to Supabase Storage
-- 4. Update product_images table dengan real URLs
-- ============================================================
