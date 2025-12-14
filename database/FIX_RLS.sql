-- FIX PERMISSION UNTUK TABLE USERS (REVISI V2)
-- Menyesuaikan dengan schema: id (uuid) vs clerk_user_id (text)

-- 1. Reset policy lama (biar fresh & tidak bentrok)
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;

-- 2. Pastikan RLS aktif
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Policy: User BOLEH insert data diri sendiri
-- KOREKSI: Gunakan (select auth.jwt() ->> 'sub') untuk mengambil Clerk ID yang pasti TEXT
-- Ini lebih aman daripada auth.uid() yang kadang dipaksa jadi UUID oleh Supabase
CREATE POLICY "Users can insert their own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK ((select auth.jwt() ->> 'sub') = clerk_user_id);

-- 4. Policy: User BOLEH lihat data diri sendiri
CREATE POLICY "Users can view their own profile"
ON public.users
FOR SELECT
TO authenticated
USING ((select auth.jwt() ->> 'sub') = clerk_user_id);

-- 5. Policy: User BOLEH update data diri sendiri
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO authenticated
USING ((select auth.jwt() ->> 'sub') = clerk_user_id);

-- 6. Grant akses dasar
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.users TO service_role;
