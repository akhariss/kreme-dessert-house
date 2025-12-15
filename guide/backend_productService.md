# Dokumentasi Logic: `productService.js`

**Path File:** `src/backend/productService.js`

File ini adalah "jantung" dari manajemen konten aplikasi. Menangani logic CRUD (Create, Read, Update, Delete) yang kompleks karena data produk tersebar di 4 tabel berbeda (Normalisasi Database).

---

## 📌 Tujuan Utama

Mengabstraksi kompleksitas struktur database dari UI. UI hanya perlu mengirim objek JSON produk sederhana, dan file ini yang pusing memecahnya ke tabel-tabel yang sesuai.

---

## 🔧 Daftar Fungsi & Penjelasan Logic

### 1. `getAllProducts()`

**Fungsi:** Mengambil katalog untuk Home Screen.

- **Logic**: Melakukan `SELECT` dengan filter `is_available = true`. Data yang diambil sudah di-join dengan tabel harga dan gambar.

### 2. `getProductById(id)`

**Fungsi:** Mengambil detail lengkap satu produk.

- **Logic**: Join ke tabel `product_details` untuk mengambil info resep, alergi, dan penyimpanan. Menggunakan `.maybeSingle()` agar tidak error 404 jika produk tidak ditemukan (return null saja).

### 3. `createProduct(productData)`

**Fungsi:** Membuat produk baru (Admin Panel).

- **Logic Multi-Table Insert:**
  1.  **Insert Product**: Masukkan nama & deskripsi ke tabel `products`. Ambil `id` baru.
  2.  **Insert Price**: Masukkan harga ke tabel `prices` pakai `id` tadi.
  3.  **Insert Details**: Masukkan resep ke tabel `product_details`.
  4.  **Insert Image**: Masukkan URL gambar ke tabel `product_images` (jika ada).
- Ini dilakukan berurutan (await satu per satu).

### 4. `updateProduct(id, productData)`

**Fungsi:** Mengedit produk yang sudah ada.

- **Logic Upsert (Update or Insert):**
  - Untuk tabel utama (`products`), langsung update.
  - Untuk tabel anak (`prices`, `details`), kita harus cek dulu: "Data anaknya sudah ada belum?".
  - Jika sudah ada -> `UPDATE`.
  - Jika belum ada (misal produk lama belum punya detail) -> `INSERT`.

### 5. `deleteProduct(id)`

**Fungsi:** Menghapus produk.

- **Logic**: Karena database menggunakan **Cascade Delete**, kita cukup menghapus row di tabel induk (`products`). PostgreSQL otomatis menghapus data terkait di tabel others (harga, gambar, cart user).

### 6. `uploadProductImage(imageUri)`

**Fungsi:** Mengupload file fisik gambar ke Cloud Storage.

- **Logic**:
  1.  Ubah URI gambar lokal jadi `ArrayBuffer` binary.
  2.  Generate nama file unik (`timestamp.png`).
  3.  Upload ke Supabase Storage Bucket `products`.
  4.  Kembalikan **Public URL** agar bisa disimpan di database.

---

## 💡 Tantangan Teknis: ArrayBuffer

React Native tidak bisa mengirim file object HTML standar. Kita perlu mem-fetch URI lokal user untuk mendapatkan data binary (`blob`/`arrayBuffer`) sebelum dikirim ke Supabase Storage.

```javascript
const response = await fetch(imageUri);
const arrayBuffer = await response.arrayBuffer();
```

Ini adalah trik kunci agar upload gambar jalan di mobile.
