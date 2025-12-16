# Penjelasan Baris per Baris: `AboutScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/AboutScreen.js`. Halaman ini berisi informasi tentang profil, sejarah, dan nilai-nilai perusahaan.

---

### **Persiapan (Baris 1-13)**

- **Baris 1-9:** Import komponen dasar seperti `ScrollView` (biar bisa digulir), `Image` (foto), `LinearGradient` (efek gradasi di foto), dan ikon `Ionicons`.
- **Baris 10:** Import `Navbar` kita sendiri biar navigasinya seragam.

---

### **Komponen Utama (Baris 16-131)**

- **Baris 16:** Fungsi `AboutScreen`. Menerima `navigation` buat pindah halaman lewat Navbar.
- **Baris 19:** Wadah utama layar.

---

### **Bagian Atas: Gambar Interior (Baris 26-38)**

- **Baris 28:** Menampilkan foto interior toko (`about-interior.png`) yang besar.
- **Baris 34:** **Efek Gradasi.** Kita tempel lapisan transparan-ke-putih di atas foto. Tujuannya biar perbatasan antara foto dan teks di bawahnya jadi halus (nggak kaku potongannya), seolah-olah fotonya menyatu dengan background putih.

---

### **Bagian Cerita & Nilai (Baris 40-90)**

- **Baris 41:** Bagian "Our Story".
  - Berisi teks promosi tentang Kreme Dessert House yang bergaya patisserie Prancis.
- **Baris 53:** Bagian "Our Values" (Nilai-nilai kami).
  - **Baris 59-88:** Kita jejerkan 3 poin utama: Excellence (Bintang), Passion (Hati), Tradition (Infinity).
  - Setiap poin punya ikon besar berwarna, judul, dan penjelasan singkat.

---

### **Bagian Kontak (Baris 92-127)**

- **Baris 92:** Bagian "Visit Us" (Kunjungi Kami).
- **Baris 98-126:** Daftar informasi kontak disusun rapi.
  - Ada Alamat (ikon lokasi).
  - Jam Buka (ikon jam).
  - Email (ikon surat).
  - Telepon (ikon telepon).
  - Semuanya pakai `Ionicons` biar cantik.

---

### **Penutup (Baris 133)**

- Eksport halaman ini biar bisa dipanggil di `App.js` atau navigator.
