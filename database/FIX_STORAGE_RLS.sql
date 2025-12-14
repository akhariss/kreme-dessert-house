-- ============================================================
-- FIX STORAGE RLS (Agar Upload Gambar Berhasil)
-- ============================================================

-- 1. Pastikan Bucket 'products' ada dan public
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Hapus Policy lama biar bersih
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;

-- 3. Buat Policy: Semua orang boleh Upload & Lihat (Mode Developer)
CREATE POLICY "Anyone can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'products' );

CREATE POLICY "Anyone can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'products' );

CREATE POLICY "Anyone can select"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- 4. Matikan RLS untuk storage (opsional "Nuclear Option" kalau policy gagal)
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
