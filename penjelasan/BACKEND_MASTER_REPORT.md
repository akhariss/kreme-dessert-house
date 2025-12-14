# Laporan Lengkap Backend Kreme Dessert House 🍰

> **Dokumen ini adalah "Kunci Jawaban" untuk presentasi teknis.**
> Gunakan dokumen ini untuk menjelaskan detail kode saat ditanya dosen.

---

## 1. Koneksi Database (Supabase Config)
**File**: `src/config/supabase.js`
**Tujuan**: Menghubungkan aplikasi React Native dengan Database Supabase.

### Kode Penting:
```javascript
import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Key dari Environment Variable agar aman
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Inisialisasi Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false, // Matikan auth bawaan Supabase karena kita pakai Clerk
    persistSession: false,
  },
});
```

**Penjelasan ke Dosen**:
*"Kami menggunakan `createClient` dari library SDK Supabase. Variabel URL dan KEY kami simpan di `.env` agar tidak bocor ke publik. Kami mematikan auto-refresh token bawaan karena manajemen usernya di-handle oleh Clerk."*

---

## 2. Product Service (Logic Produk)
**File**: `src/backend/productService.js`
**Tujuan**: Mengambil, Menambah, Mengedit, dan Menghapus produk.

### A. Mengambil Data (Read)
```javascript
getAllProducts: async () => {
  const { data, error } = await supabase
    .from('products') // Pilih tabel 'products'
    // JOIN TABLE: Ambil data produk + harga + gambar sekaligus
    .select('id, name, description, category, prices(price), product_images(image_url)')
    .eq('is_available', true); // Filter hanya yang stok ada

  // Mapping data agar mudah dipakai di UI
  return data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.prices?.[0]?.price || 0, // Ambil harga pertama
    image: product.product_images?.[0]?.image_url // Ambil gambar pertama
  }));
}
```
**Penjelasan ke Dosen**:
*"Fungsi ini melakukan **Query SQL SELECT dengan JOIN**. Kami mengambil data dari tabel `products`, lalu join ke tabel `prices` dan `product_images` dalam satu kali request. Hasilnya kami format ulang (mapping) biar frontend tinggal pakai tanpa pusing parsing JSON."*

### B. Menambah Data (Create - Transactional)
```javascript
createProduct: async (productData) => {
  // 1. Insert ke tabel PRODUCTS dulu
  const { data: prodData } = await supabase
    .from('products')
    .insert({ name: productData.name, category: productData.category })
    .select()
    .single();

  const newId = prodData.id; // Dapat ID produk baru

  // 2. Insert ke tabel PRICES pakai ID tadi
  await supabase.from('prices').insert({
    product_id: newId,
    price: parseFloat(productData.price)
  });

  // 3. Insert ke tabel DETAILS
  await supabase.from('product_details').insert({
    product_id: newId,
    ingredients: productData.ingredients 
  });
}
```
**Penjelasan ke Dosen**:
*"Saat admin tambah produk, kami melakukan **Multiple Inserts**. Pertama buat produknya, ambil ID-nya, lalu pakai ID itu untuk isi harga dan detail. Ini memastikan data terelasi dengan benar (Relational Integrity)."*

---

## 3. Cart Service (Logic Keranjang)
**File**: `src/backend/cartService.js`
**Tujuan**: Mengatur tambah/kurang barang di keranjang user.

### A. Tambah ke Cart (Smart Insert)
```javascript
addToCart: async (userId, product) => {
  // Cek dulu: Barang ini udah ada di cart user belum?
  const { data: existingItem } = await supabase
    .from('cart')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('product_id', product.id)
    .single();

  if (existingItem) {
    // Kalau ADA: Update quantity + 1
    await supabase.from('cart')
      .update({ quantity: existingItem.quantity + 1 })
      .eq('id', existingItem.id);
  } else {
    // Kalau BELUM ADA: Insert baru
    await supabase.from('cart')
      .insert({ user_id: userId, product_id: product.id, quantity: 1 });
  }
}
```
**Penjelasan ke Dosen**:
*"Di sini ada logika pengecekan. Sistem tidak asal insert. Dia cek dulu apakah user sudah punya barang itu di keranjang? Kalau sudah, cukup update jumlahnya (Quantity). Kalau belum, baru buat baris baru. Ini mencegah duplikasi data."*

---

## 4. Profile Service (Sync Auth)
**File**: `src/backend/profileService.js`

### Dual Update (Clerk + Supabase)
```javascript
updateProfile: async (clerkUser, supabaseUserId, newName) => {
  // 1. Update di Clerk (Untuk Login)
  await clerkUser.update({ firstName: newName });

  // 2. Update di Supabase (Untuk Data Aplikasi)
  await supabase
    .from('users')
    .update({ full_name: newName })
    .eq('id', supabaseUserId);
}
```
**Penjelasan ke Dosen**:
*"Kami menjaga konsistensi data antara Auth Provider (Clerk) dan Database Aplikasi (Supabase). Saat user ganti nama, kami update di kedua tempat tersebut secara bersamaan agar tidak ada perbedaan data."*

---

## 🚧 Struktur Tabel Database (SQL Schema)

Jika ditanya struktur tabelnya seperti apa, tunjukkan list ini:

1.  **products**: `id` (UUID), `name` (Text), `category` (Text), `is_available` (Bool).
2.  **prices**: `id`, `product_id` (FK), `price` (Numeric), `currency` (USD/IDR).
3.  **product_images**: `id`, `product_id` (FK), `image_url` (Text).
4.  **product_details**: `id`, `product_id` (FK), `ingredients` (Text), `allergens` (Text).
5.  **users**: `id` (UUID), `email` (Text), `full_name` (Text).
6.  **cart**: `id`, `user_id` (FK), `product_id` (FK), `quantity` (Int).

**Kenapa dipisah-pisah (Normalisasi)?**
*"Agar fleksibel, Pak. Misal satu produk nanti punya 2 harga (USD & IDR) atau punya banyak foto (Galeri), struktur tabel `prices` dan `product_images` yang terpisah ini sudah siap menampungnya tanpa merusak tabel utama."*

---
**Tips**: Bukalah file-file di atas di VS Code saat menjelaskan bagian terkait.
