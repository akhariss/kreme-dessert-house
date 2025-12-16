# Penjelasan Baris per Baris: `AdminEditProductScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/admin/AdminEditProductScreen.js`. Halaman ini adalah **formulir sakti** yang digunakan Admin untuk menambah produk baru ATAU mengedit produk yang sudah ada.

---

### **Persiapan (Baris 1-20)**

- **Baris 13:** Import `Expo Image Picker`. Ini alat buat buka galeri HP dan pilih foto produk.
- **Baris 18-19:** Import `productService` (buat kirim data ke Supabase) dan `useProducts` (buat refresh daftar produk setelah simpan).

---

### **Logic Halaman (Baris 26-160)**

- **Baris 26:** Menerima `route`. Di dalam `route.params` mungkin ada data `product`.
- **Baris 28:** **Deteksi Mode.**

  - Kalau ada data `product`, berarti **Mode Edit**.
  - Kalau kosong, berarti **Mode Tambah Baru (Create)**.

- **Baris 33:** `selectedImage`. Variabel sementara buat nampilin foto yang baru dipilih dari galeri HP (belum diupload).
- **Baris 36 (Form Data):**

  - Kita punya satu wadah besar `formData` untuk menyimpan semua isian user: Nama, Harga, Kategori, Deskripsi, URL Gambar, Resep, dll.
  - Nilai awalnya diambil dari data produk (kalau mode edit) atau kosong (kalau baru).

- **Baris 48 (useEffect - Ambil Detail):**

  - Khusus **Mode Edit**, kita perlu ambil data lengkap (resep, alergi) dari server, karena data di daftar depan (list) cuma data singkat.
  - Kita isi form `ingredients`, `allergens`, `storage` dengan data dari server.

- **Baris 86 (Fungsi Pilih Gambar):**

  - Minta izin akses galeri (`requestMediaLibraryPermissionsAsync`).
  - Buka galeri (`launchImageLibraryAsync`).
  - Pilih gambar, potong jadi kotak (aspect ratio 1:1) biar rapi.
  - Simpan URI gambar lokal ke `selectedImage` untuk preview.
  - **Baris 105:** Kosongkan URL gambar lama biar aplikasi tahu kita mau upload gambar baru.

- **Baris 110 (Fungsi Simpan):**
  - **Validasi:** Cek dulu nama, harga, kategori wajib diisi.
  - **Step 1 - Upload Gambar:**
    - Kalau user pilih gambar baru (`selectedImage` ada isinya), kita upload dulu pakai `productService.uploadProductImage`.
    - Dapat URL publik dari Supabase.
  - **Step 2 - Siapkan Paket Data:** Gabungkan data form + URL gambar baru.
  - **Step 3 - Kirim ke Database:**
    - Kalau Mode Edit -> Panggil `updateProduct`.
    - Kalau Mode Baru -> Panggil `createProduct`.
  - **Step 4:** Refresh daftar produk global, munculkan pesan Sukses, dan kembali ke halaman sebelumnya.

---

### **Tampilan Utama (Baris 162-300)**

- **Baris 163:** `KeyboardAvoidingView`. Biar form gak ketutupan keyboard.

- **Baris 180 (Bagian Gambar):**

  - Tombol kotak buat upload gambar.
  - Kalau ada gambar -> Tampilkan gambarnya.
  - Kalau kosong -> Tampilkan ikon kamera + teks "Add Photo".

- **Baris 200-244 (Info Dasar):**

  - Input Nama Produk.
  - Input Harga & Kategori (dijajar sebelahan kiri-kanan).
  - Input Deskripsi (multiline/kotak besar).

- **Baris 247 (Detail Lengkap):**

  - Input Bahan-bahan (Ingredients).
  - Input Alergi.
  - Input Cara Simpan (Storage).
  - Ada loading (`ActivityIndicator`) kalau data detail belum siap diambil.

- **Baris 288 (Tombol Simpan):**
  - Teks tombol berubah dinamis: "UPDATE PRODUCT" atau "CREATE PRODUCT".

---

### **Penutup**

- Eksport halaman ini.
