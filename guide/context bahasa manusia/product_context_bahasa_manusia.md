# Penjelasan Baris per Baris: `ProductContext.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/context/ProductContext.js`. Context ini bertugas menyediakan data produk ke seluruh aplikasi, jadi kita nggak perlu download data produk berkali-kali di setiap layar. Cukup sekali ambil, bagi-bagi ke semua.

---

### **Persiapan (Baris 1-3)**

- **Baris 2:** `productService`. Tukang ambil data dari database.
- **Baris 3:** Import `localProducts` (data dummy/palsu di folder data).
  - **Fungsi:** Sebagai "ban serep" (Fallback). Kalau internet mati atau database error, aplikasi nggak boleh kosong melompong. Kita tampilin data lokal ini biar user tetap bisa lihat-lihat.

---

### **Komponen Utama (ProductProvider) (Baris 15-18)**

- `products`: Daftar produk yang siap ditampilkan. Awalnya kosong `[]`.
- `isLoading`: Status lagi ambil data atau nggak. Awalnya `true` (Loading).
- `error`: Buat nyimpen pesan kalau ada yang error.

---

### **Fungsi Fetch Products (Baris 20-41)**

- **Tujuan:** Mengisi variabel `products` dengan data kue beneran.
- **Logic:**
  - Set loading dulu.
  - **Baris 24:** Coba panggil `productService.getAllProducts()` (Ambil dari Supabase).
  - **Baris 26 (Cek Hasil):**
    - Kalau ada data (`data.length > 0`), simpan ke `products`. Sukses!
    - Kalau database kosong (atau error aneh), pakai data lokal (`localProducts`) biar aplikasi tetap jalan.
  - **Baris 33 (Error Handling):**
    - Kalau fetch gagal total (misal internet mati), masuk ke `catch`.
    - Tetap pakai data lokal (`localProducts`). Aplikasi ini didesain "Anti-Crash".
  - **Baris 39:** Matikan loading.

---

### **Effect Awal (Baris 43-45)**

- `useEffect` dengan `[]`. Artinya: Jalankan fungsi `fetchProducts` **CUMA SEKALI** saat aplikasi pertama kali dibuka.

---

### **Bungkusan Akhir (Baris 47-56)**

- Kita bagikan paket berisi:
  - `products`: Datanya.
  - `isLoading`: Status loadingnya (buat nampilin spinner).
  - `refreshProducts`: Fungsi buat maksa update data lagi (misal user tarik layar ke bawah buat refresh).

---

### **Penutup**

- Eksport File.
