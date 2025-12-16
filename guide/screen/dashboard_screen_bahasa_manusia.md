# Penjelasan Baris per Baris: `DashboardScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/DashboardScreen.js`. Halaman ini adalah halaman utama kedua setelah Home, tempat user mulai menjelajahi toko.

---

### **Persiapan (Baris 1-16)**

- **Baris 15:** Import `useProducts`. Kita butuh daftar produk unggulan buat ditampilkan di "Signature Collection".
- **Baris 10-13:** Import komponen-komponen UI kita: Tombol, Navbar, Produk Card, dan Teks Tema.

---

### **Logic Halaman (Baris 19-20)**

- **Baris 20:** Ambil daftar `products` dari context. Ini data yang bakal kita pamerkan.

---

### **Tampilan Utama (Baris 23-81)**

- **Baris 25:** Pasang `Navbar` di paling atas.
- **Baris 27:** `ScrollView`. Seluruh layar bisa digulir ke bawah.

---

### **Bagian Hero / Banner Utama (Baris 29-47)**

- **Baris 31:** Wadah gambar utama.
- **Baris 32:** Tampilkan gambar besar (`hero-dessert.png`) yang menggugah selera.
- **Baris 37:** **Efek Gradasi.** Lapisan transparan ke putih di bagian bawah gambar. Ini trik desain biar gambar terlihat "tenggelam" menyatu dengan background putih di bawahnya secara halus.
- **Baris 42:** Teks deskripsi puitis tentang "French dominance & modern sophistication".

---

### **Tombol Belanja (Baris 49-56)**

- **Baris 51:** Tombol besar "SHOP NOW".
- Tombol ini kalau diklik bakal membawa user ke halaman `Catalog` (Daftar menu lengkap).

---

### **Bagian Carousel Produk (Baris 59-78)**

- **Baris 60:** Judul seksi "Signature Collection".
- **Baris 64:** `ScrollView horizontal`. Ini carousel yang bisa digeser ke kanan-kiri.
- **Baris 69 (Looping Produk):**
  - Kita ambil semua `products`.
  - Untuk setiap produk, kita buat `ProductCard` (Baris 71).
  - Kalau kartunya diklik, pindah ke halaman `Detail` sambil bawa data produknya.

---

### **Penutup**

- Eksport halaman ini.
