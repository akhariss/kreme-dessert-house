# 🚀 SETUP GUIDE - Kreme Dessert House

## ✅ Prerequisites Checklist

- [x] Dependencies installed (`@supabase/supabase-js`, `@clerk/clerk-expo`, `expo-secure-store`)
- [ ] Supabase project created
- [ ] Clerk project created
- [ ] SQL schema executed
- [ ] Storage bucket created
- [ ] Images uploaded
- [ ] Environment variables configured

---

## 📋 Step-by-Step Implementation

### **STEP 1: Setup Supabase Database** (10 menit)

#### 1.1 Buka Supabase Dashboard

- URL: https://app.supabase.com/project/lkeinracquokqpgkhwed
- Login dengan akun Anda

#### 1.2 Get Anon Key

1. Buka **Settings** → **API**
2. Copy `anon` / `public` key
3. Update `.env` file:
   ```bash
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
   ```

#### 1.3 Execute SQL Schema

1. Buka **SQL Editor** (di sidebar kiri)
2. Click **+ New Query**
3. Copy semua isi file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Click **Run** (atau Ctrl+Enter)
6. ✅ Harus success - check di **Table Editor** untuk confirm

---

### **STEP 2: Setup Supabase Storage** (5 menit)

#### 2.1 Create Storage Bucket

1. Buka **Storage** (di sidebar kiri)
2. Click **New bucket**
3. Bucket name: `products`
4. **Public bucket**: ✅ YES (centang)
5. Click **Create bucket**

#### 2.2 Configure Bucket Policies

```sql
-- Di SQL Editor, run ini untuk allow public access:
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- Allow authenticated upload (untuk future admin panel)
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'products' AND auth.role() = 'authenticated' );
```

#### 2.3 Upload Product Images

1. Buka bucket `products` yang baru dibuat
2. Click **Upload file**
3. Upload 8 images dari `assets/images/`:

   - rose-macaron.png
   - raspberry-tart.png
   - chocolate-cake.png
   - pistachio-choux.png
   - lemon-pie.png
   - matcha-opera.png
   - vanilla-eclair.png
   - strawberry-mille.png

4. ✅ Verify URL format:
   ```
   https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/rose-macaron.png
   ```

#### 2.4 Update Image URLs di Database

```sql
-- Update dengan real URLs dari Supabase Storage
UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/rose-macaron.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440001';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/raspberry-tart.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440002';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/chocolate-cake.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440003';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/pistachio-choux.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440004';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/lemon-pie.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440005';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/matcha-opera.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440006';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/vanilla-eclair.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440007';

UPDATE product_images SET image_url = 'https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/strawberry-mille.png'
WHERE product_id = '550e8400-e29b-41d4-a716-446655440008';
```

---

### **STEP 3: Setup Clerk Authentication** (10 menit)

#### 3.1 Buka Clerk Dashboard

- URL: https://dashboard.clerk.com/
- Sign in (atau create account jika belum ada)

#### 3.2 Configure Application

1. Pilih aplikasi yang sudah ada (dengan publishable key: `pk_test_ZW1lcmdpbmctYmFkZ2VyLTguY2xlcmsuYWNjb3VudHMuZGV2JA`)
2. Atau create new application jika perlu

#### 3.3 Enable OAuth Providers

1. Buka **User & Authentication** → **Social Connections**
2. Enable **Google** (Gmail login)

   - Click **Add provider**
   - Pilih **Google**
   - Click **Continue**
   - ✅ Enabled

3. Enable **Email** (Email + Password login)
   - Sudah enabled by default
   - ✅ Check

#### 3.4 Configure Sign-up Settings

1. Buka **User & Authentication** → **Email, Phone, Username**
2. **Email address**:
   - ✅ Required
   - ✅ Verification required
3. **Username**:
   - ❌ Disabled (opsional)
4. Click **Save**

#### 3.5 Test Publishable Key

- Verify key di `.env` sudah benar:
  ```bash
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1lcmdpbmctYmFkZ2VyLTguY2xlcmsuYWNjb3VudHMuZGV2JA
  ```

---

### **STEP 4: Verify Database & Test Queries** (5 menit)

#### 4.1 Test Query - Get All Products

```sql
SELECT * FROM products_complete;
```

✅ Should return 8 products dengan harga, image, details

#### 4.2 Test Query - Get by Category

```sql
SELECT * FROM products_complete WHERE category = 'Macarons';
```

#### 4.3 Verify RLS Policies

```sql
-- Check policies enabled
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('users', 'products', 'cart');
```

---

## 🔐 Security Considerations

### ⚠️ Important: Use Anon Key untuk Client

```javascript
// ✅ CORRECT - Di mobile app
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...  // Public, safe untuk client

// ❌ WRONG - JANGAN pakai di mobile app
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...      // Full access, backend only!
```

### 🔒 Row Level Security (RLS)

- ✅ **Products**: Public read (semua orang bisa lihat)
- ✅ **Cart**: Users hanya bisa akses cart mereka sendiri
- ✅ **Users**: Users hanya bisa lihat/edit data mereka sendiri

---

## 📝 Next Steps

Setelah semua setup selesai:

1. ✅ **Create Config Files**

   - `src/config/supabase.js`
   - `src/config/clerk.js`

2. ✅ **Create Services**

   - `src/services/productService.js`
   - `src/services/cartService.js`
   - `src/services/userService.js`

3. ✅ **Update Context**

   - `src/context/AuthContext.js` (new)
   - `src/context/CartContext.js` (refactor)

4. ✅ **Create Screens**

   - `src/screens/LoginScreen.js` (new)

5. ✅ **Update Existing Screens**
   - HomeScreen → fetch dari Supabase
   - CatalogScreen → fetch dari Supabase
   - DetailScreen → fetch dari Supabase
   - CartScreen → save ke Supabase

---

## 🎯 Validation Checklist

Before proceeding to code:

- [ ] Supabase database has 6 tables
- [ ] All tables have data (8 products seeded)
- [ ] Storage bucket `products` created and public
- [ ] 8 product images uploaded
- [ ] Image URLs updated in database
- [ ] Can query `products_complete` view successfully
- [ ] Clerk project configured
- [ ] Google OAuth enabled
- [ ] Email authentication enabled
- [ ] Both keys in `.env` are correct and not placeholder values

---

## 🆘 Troubleshooting

### Issue: "Failed to fetch" dari Supabase

**Fix**: Check anon key di `.env`, pastikan tidak ada extra spaces

### Issue: Images tidak muncul

**Fix**:

1. Verify bucket is public
2. Check URL format benar
3. Test URL di browser

### Issue: RLS blocking queries

**Fix**:

1. Verify policies dengan query di atas
2. Untuk testing, bisa temporary disable RLS:
   ```sql
   ALTER TABLE products DISABLE ROW LEVEL SECURITY;
   ```

---

**Ready untuk coding? Lanjut ke implementation! 🚀**
