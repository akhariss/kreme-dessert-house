# Dokumentasi Screen: `AdminProductListScreen.js`

**Path File:** `src/screens/admin/AdminProductListScreen.js`

Halaman dashboard utama untuk admin melihat daftar produk dan melakukan manajemen (Delete/Edit).

---

## 🔧 Struktur Logic & UI

### 1. Data Fetching

Menggunakan hook `useProducts()` dari context global.

- Tidak fetch data sendiri. Mengandalkan `ProductContext` yang sudah mengambil data saat app start.
- Ini membuat load halaman instan.
- Fitur **Pull-to-Refresh**: Memanggil fungsi `refreshProducts()` dari context untuk memaksa ambil data baru dari server.

### 2. Handle Delete (`handleDelete`)

Fitur menghapus produk dengan UX yang aman.

- **Alert Confirmation**: Mencegah kepencet. Muncul popup "Are you sure?".
- **Pending State**: State `deletingId` dipakai untuk mengubah icon Sampah menjadi Loading Spinner pada item spesifik yang sedang dihapus.
- **Service Call**: Memanggil `productService.deleteProduct(id)`.
- **Auto Refresh**: Jika sukses, panggil `refreshProducts()` agar item yang dihapus hilang dari layar.

### 3. Navigasi

- **Edit Button**: `navigation.navigate('AdminEditProduct', { product: item })`. Melampirkan objek produk yang mau diedit sebagai parameter.
- **Create Button (FAB)**: `navigation.navigate('AdminEditProduct')`. Tanpa parameter, menandakan mode "Buat Baru".

---

# Dokumentasi Screen: `AdminEditProductScreen.js`

**Path File:** `src/screens/admin/AdminEditProductScreen.js`

Form sakti yang berfungsi ganda: Bisa untuk **Create New** produk atau **Edit Existing** produk.

---

## 🔧 Logic Utama

### 1. Deteksi Mode (Create vs Edit)

```javascript
const { product } = route.params || {};
const isEditMode = !!product;
```

- Jika ada parameter `product`, berarti Admin sedang mengedit. Form diisi otomatis (_Pre-fill_) dengan data produk tersebut.
- Jika kosong, berarti Admin membuat baru. Form kosong.

### 2. Form State Management

Menggunakan satu state object `formData` untuk menampung semua input (nama, harga, kategori, dll).

- **Detail Fetching**: Saat mode Edit, data awal yang didapat dari list mungkin tidak lengkap (misal tidak ada resep). `useEffect` akan memanggil `productService.getProductById` untuk mengambil detail tambahan (Ingredients, Allergens, dll) agar form lengkap.

### 3. Image Picker & Handling

Menggunakan `expo-image-picker`.

- User memilih gambar -> Simpan URI lokal ke state `selectedImage`.
- Simpan juga URL lama ke `formData.imageUrl`.
- **Logic Prioritas**: Saat tombol Save ditekan, aplikasi cek:
  - Jika ada `selectedImage` (gambar baru dipilih) -> Upload dulu ke Supabase -> Pakai URL hasil upload.
  - Jika tidak ada -> Pakai `formData.imageUrl` (URL lama).

### 4. Tombol Save

Meng-handle percabangan Create/Update:

- Jika **Mode Edit**: Panggil `productService.updateProduct`.
- Jika **Mode Create**: Panggil `productService.createProduct`.
- Setelah sukses, panggil `refreshProducts()` dan kembali ke layar sebelumnya (`navigation.goBack()`).
