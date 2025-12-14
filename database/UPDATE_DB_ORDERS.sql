-- ============================================================
-- SCRIPT UPDATE DATABASE KREME DESSERT HOUSE
-- Jalankan script ini untuk menambahkan fitur Checkout (Orders)
-- ============================================================

-- 1. Buat Tabel ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);

-- 2. Buat Tabel ORDER_ITEMS
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL, 
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_time NUMERIC(10,2) NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- 3. Setup Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy: User bisa lihat ordernya sendiri
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = orders.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- Policy: User bisa buat order baru (Checkout)
CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = orders.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- Policy: User bisa lihat item ordernya sendiri
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN users ON users.id = orders.user_id
      WHERE orders.id = order_items.order_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- Policy: User bisa insert item ke ordernya sendiri
CREATE POLICY "Users can insert own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      JOIN users ON users.id = orders.user_id
      WHERE orders.id = order_items.order_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- 4. Setup Auto Update Trigger (optional error handling if trigger func missing)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_orders_updated_at') THEN
    CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
