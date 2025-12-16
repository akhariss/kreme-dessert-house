# Penjelasan Baris per Baris: `CatalogScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/CatalogScreen.js`. Halaman ini menampilkan daftar semua produk (menu) dan fitur pencarian.

---

### **Persiapan (Baris 1-13)**

- **Baris 13:** Import `useProducts`. Ini "gudang" data produk kita yang sudah diambil dari database. Kita gak perlu fetch ulang di sini, cukup ambil dari context.
- **Baris 10:** Import `ProductCard`. Ini komponen kartu produk yang sudah kita buat sebelumnya.

---

### **Logic Halaman (Baris 18-35)**

- **Baris 19:** Ambil daftar `products` dan status `isLoading` dari context.
- **Baris 22:** `searchQuery`. Variabel buat nyimpen apa yang diketik user di kotak pencarian.
- **Baris 25 (Logic Filter):**
  - Variable `filteredProducts` isinya otomatis berubah.
  - Dia menyaring daftar `products` asli.
  - Syarat lolos: Nama produk (dikecilkan hurufnya) harus mengandung teks pencarian (searchQuery).

---

### **Tampilan Utama (Baris 38-86)**

- **Baris 38:** Wadah utama.
- **Baris 40:** Pasang `Navbar` di atas.
- **Baris 41:** Header judul "Our Collection".

- **Baris 48 (Kotak Pencarian):**

  - Ada ikon kaca pembesar (`Ionicons search`).
  - Ada `TextInput` tempat ngetik.
  - `onChangeText={setSearchQuery}`: Tiap ngetik, update variabel `searchQuery` -> otomatis update `filteredProducts`.

- **Baris 66 (Daftar Produk):**
  - **Cek Loading:** Kalau data belum siap (`isLoading`), tampilkan putaran loading dulu.
  - **Kalau Siap:** Tampilkan `FlatList`.
    - `data={filteredProducts}`: Yang ditampilkan adalah hasil filter (bukan semua produk).
    - `numColumns={2}`: Tampilkan 2 kolom (kiri-kanan) biar kayak galeri.
    - `renderItem`: Gambar pakai kartu `ProductCard`.
    - `ListEmptyComponent` (Baris 79): Kalau hasil filter kosong (misal cari "Nasi Goreng" gak ketemu), munculin tulisan "No desserts found".

---

### **Penutup**

- Eksport halaman ini.
