# Penjelasan Baris per Baris: `ProductCard.js` (Bahasa Manusia)

Dokumen ini menjelaskan kode `src/components/ProductCard.js`. Ini adalah komponen "kartu" yang menampilkan gambar dan info singkat produk di halaman depan.

---

### **Persiapan (Baris 1-4)**

- **Baris 1-4:** Import komponen dasar UI dan tema aplikasi. Kita juga pakai komponen buatan sendiri `ThemeText` biar font-nya konsisten.

---

### **Komponen Utama (Baris 6-35)**

- **Baris 6:** Membuat komponen `ProductCard`. Menerima 2 hal:
  1.  `product`: Data produk lengkap (nama, harga, gambar, dll).
  2.  `onPress`: Fungsi apa yang dijalankan kalau kartu ini diklik (biasanya pindah ke halaman Detail).
- **Baris 7-9 (Helper):** Fungsi kecil `formatPrice` buat nambahin simbol `$` dan koma di harga. Contoh: `1000` jadi `$1,000`.

---

### **Tampilan / UI (Baris 11-34)**

- **Baris 12:** Pembungkus utama pakai `TouchableOpacity`. Artinya, seluruh kartu ini **bisa diklik**.
- **Baris 17-19 (Bagian Gambar):**
  - Menampilkan gambar produk.
  - Pakai `resizeMode="cover"` biar gambarnya memenuhi kotak tanpa gepeng, meskipun mungkin ada bagian yang terpotong sedikit.
- **Baris 20-32 (Bagian Info):**
  - **Baris 21-27 (Nama):** Menampilkan nama produk. Ada fitur `numberOfLines={2}`, artinya kalau namanya kepanjangan, bakal dipotong jadi "..." di baris kedua.
  - **Baris 28 (Kategori):** Menampilkan jenis produk (misal: "CAKE", "DRINK") dengan huruf kecil/rapi.
  - **Baris 29-31 (Harga):** Menampilkan harga yang sudah diformat tadi. Warnanya dibikin menonjol (`theme.colors.accent`) dan tebal.

---

### **Gaya / Styling (Baris 37-67)**

- Di sini kita atur kosmetik kartu:
- `container`: Dikasih warna putih, sudut melengkung (`borderRadius`), dan bayangan (`shadows`) biar kelihatan melayang alias "pop-up".
- `imageContainer`: Tingginya dipatok 160 piksel.

---

### **Penutup (Baris 69)**

- Eksport komponen biar bisa dijajar di Home Screen.
