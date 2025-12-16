# Penjelasan Baris per Baris: `supabsenow.sql` (Bahasa Manusia)

Dokumen ini menjelaskan struktur database aplikasi yang didefinisikan dalam file SQL. Ini adalah "cetak biru" dari tempat penyimpanan data kita di Supabase.

---

### **1. Tabel `users` (Pengguna)**

_Tujuannya: Menyimpan data user yang login._

- **Baris 74-82:**
  - `id`: Kartu identitas unik (UUID) buat setiap user di database kita.
  - `clerk_user_id`: ID titipan dari Clerk. Ini penting biar kita bisa cocokin user yang login lewat Clerk dengan data di database kita.
  - `email`: Email user.
  - `full_name`: Nama lengkap.
  - `avatar_url`: Link foto profil.

---

### **2. Tabel `products` (Produk Utama)**

_Tujuannya: Menyimpan info dasar jualan._

- **Baris 64-73:**
  - `id`: Kode unik produk.
  - `name`: Nama kue/minuman.
  - `description`: Penjelasan singkat.
  - `category`: Jenis (misal: Cake, Drink).
  - `is_available`: Status barang (Ada/Habis). Kalau `false`, nggak muncul di aplikasi.

---

### **3. Tabel `prices` (Harga Produk)**

_Tujuannya: Memisahkan harga dari produk utama (Normalisasi)._

- **Baris 36-44:**
  - `product_id`: Menunjuk ke tabel `products`. Artinya "Harga ini milik produk ID sekian".
  - `price`: Nominal harganya.
  - `currency`: Mata uang (Default 'USD').
  - **Kenapa dipisah?** Biar kalau nanti mau ada diskon atau mata uang lain, gampang ngaturnya tanpa ngacak-ngacak tabel produk utama.

---

### **4. Tabel `product_images` (Gambar Produk)**

_Tujuannya: Menyimpan link gambar._

- **Baris 56-63:**
  - `product_id`: Menunjuk ini gambar punya siapa.
  - `image_url`: Link internet menuju gambarnya (disimpan di Supabase Storage).

---

### **5. Tabel `product_details` (Detail Tambahan)**

_Tujuannya: Menyimpan info rinci yang mungkin nggak semua produk punya._

- **Baris 45-55:**
  - `ingredients`: Resep bahan-bahan.
  - `allergen_information`: Info buat yang alergi (misal: Mengandung kacang).
  - `storage_care`: Cara penyimpanan (misal: "Simpan di kulkas").

---

### **6. Tabel `cart` (Keranjang Belanja)**

_Tujuannya: Menyimpan barang yang masi "dipilih-pilih" user sebelum bayar._

- **Baris 4-14:**
  - `user_id`: Punya siapa keranjang ini?
  - `product_id`: Barang apa yang dipilih?
  - `quantity`: Berapa banyak? (Minimal 1).
  - **Constraint:** Kalau User atau Produk dihapus, data keranjang ini biasanya ikut hilang (Foreign Key).

---

### **7. Tabel `orders` (Bon Pesanan Utama)**

_Tujuannya: Mencatat transaksi yang sudah terjadi (Checkout)._

- **Baris 26-35:**
  - `user_id`: Siapa yang beli.
  - `total_amount`: Total duit yang dibayar.
  - `status`: Status pesanan. Awalnya 'pending' (menunggu), nanti bisa jadi 'completed' (selesai).

---

### **8. Tabel `order_items` (Rincian Barang di Bon)**

_Tujuannya: Mencatat detail barang per transaksi._

- **Baris 15-25:**
  - `order_id`: Ini barang masuk ke Bon nomor berapa?
  - `product_id`: Barang apa yang dibeli?
  - `quantity`: Jumlahnya.
  - `price_at_time`: **PENTING!** Harga saat beli. Kalau bulan depan harga kue naik, harga di riwayat belanja user TETAP harga lama. Jangan sampai riwayat belanja ikut berubah harganya.

---

### **Istilah Penting:**

- **UUID:** Kode acak super panjang (contoh: `a0eebc99-9c0b...`) biar ID nggak mungkin kembar.
- **Foreign Key (FK):** Tali pengikat antar tabel. Misal `cart` diikat ke `users`, jadi kita tahu keranjang itu punya siapa.
