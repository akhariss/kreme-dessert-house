-- ============================================================
-- FIX CART PERMISSION
-- Matikan sementara RLS Cart agar fungsi Add to Cart berjalan lancar
-- ============================================================

-- 1. Disable RLS pada Cart
ALTER TABLE cart DISABLE ROW LEVEL SECURITY;

-- 2. (Opsional) Jika tetap ingin pakai RLS, gunakan policy sederhana ini:
-- DROP POLICY IF EXISTS "Users can insert to own cart" ON cart;
-- CREATE POLICY "Users can insert to own cart" ON cart FOR INSERT WITH CHECK (true);
