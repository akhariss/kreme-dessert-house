# Penjelasan Baris per Baris: `DetailScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/DetailScreen.js`. Halaman ini menampilkan info super lengkap tentang satu produk.

---

### **Persiapan (Baris 1-17)**

- **Baris 16:** Import `productService`. Kita butuh ini buat ambil detail "rahasia" kayak resep dan alergi yang nggak ada di halaman depan.
- **Baris 12:** Import `useCart`. Buat aksi tombol "Add to Cart".

---

### **Logic Halaman (Baris 20-64)**

- **Baris 22:** `initialProduct`. Ini data dasar (nama, harga, gambar) yang dikirim dari halaman sebelumnya. Jadi pas baru buka, layar gak kosong, minimal ada gambarnya dulu.
- **Baris 23:** `productDetails`. State buat nyimpen data lengkap (resep, alergi) yang lagi diambil dari server.
- **Baris 30 (useEffect - Fetch Data):**

  - Begitu halaman dibuka, jalankan fungsi ini.
  - Panggil `productService.getProductById` pakai ID produk.
  - **Baris 35-41:** Logic penjaga gawang. Supabase kadang balikin data dalam bentuk Array atau Object. Kita cek dua-duanya biar aplikasi gak crash.
  - **Baris 44:** Kalau sukses, simpan datanya ke state `productDetails`.
  - **Baris 49:** Matikan loading.

- **Baris 61 (Handle Add to Cart):**
  - Panggil fungsi `addToCart`.
  - Langsung lempar user ke halaman `Cart` biar dia checkout.

---

### **Tampilan Utama (Baris 67-155)**

- **Baris 78 (Gambar Besar):**

  - Foto produk memenuhi bagian atas layar.
  - Dikasih gradasi hitam transparan (Baris 80) biar tombol "Back" (panah kiri) warna putih di pojok atas tetap kelihatan jelas.
  - Dikasih gradasi pink (Baris 85) buat efek premium/feminin.

- **Baris 91 (Konten Detail):**

  - **Baris 92:** Badge Kategori (misal "CAKE").
  - **Baris 98:** Nama Produk besar.
  - **Baris 105:** Harga.
  - **Baris 111:** Deskripsi standar.

- **Baris 118 (Bagian Loadings & Detail Lengkap):**

  - Kalau masih `loading`: Muncul putaran loading kecil.
  - Kalau sudah ada `productDetails`:
    - Tampilkan **Ingredients** (Bahan-bahan).
    - Tampilkan **Allergen Info** (Info Alergi).
    - Tampilkan **Storage & Care** (Cara Penyimpanan).
  - Kalau kosong: Tampilkan "Details unavailable".

- **Baris 147 (Footer Tombol):**
  - Tombol "ADD TO CART" melayang di bawah layar.
  - Pakai varian `secondary` (warna emas/aksen).

---

### **Penutup**

- Eksport halaman.
