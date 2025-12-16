# Penjelasan Baris per Baris: `orderService.js` (Bahasa Manusia)

Dokumen ini menjelaskan apa yang terjadi di dalam kode `src/backend/orderService.js` secara urut dari atas ke bawah, menggunakan bahasa yang mudah dimengerti.

---

### **Persiapan (Baris 1-3)**

- **Baris 1:** Kita panggil ("import") alat penghubung ke database Supabase agar app bisa komunikasi dengan server.
- **Baris 3:** Membuat objek `orderService`. Ini adalah "tukang urus pesanan" kita. Semua urusan belanja ada di sini.

---

### **Fungsi 1: Buat Pesanan Baru / Checkout (Baris 10-57)**

_Tujuannya: Menyimpan data belanjaan user ke database saat tombol "Checkout" ditekan._

- **Baris 10:** Fungsi `createOrder`. Fungsi ini butuh 3 hal: Siapa yang beli (`userId`), Apa yang dibeli (`cartItems`), dan Total bayarnya (`totalAmount`).
- **Baris 12:** **Cek Keamanan.** Kalau keranjangnya kosong, tolak. Ngapain checkout angin?
- **Baris 15-24 (Langkah 1):** **Buat Bon Utama.** Kita buat satu baris data di tabel `orders`. Isinya: siapa yang beli, total harganya berapa, dan status awalnya 'pending' (belum lunas/diproses).
  - Kita pakai `.single()` karena kita cuma buat 1 bon.
  - Hasilnya kita dapat `orderData` yang berisi **Nomor Bon (Order ID)**. Ini penting buat langkah selanjutnya.
- **Baris 28:** Kita simpan Nomor Bon tadi ke variabel `orderId`.
- **Baris 31-36 (Langkah 2):** **Siapkan Daftar Barang.** Kita ambil daftar barang dari keranjang (`cartItems`) dan kita rapihkan formatnya biar sesuai sama tabel `order_items`.
  - **Penting (Baris 35):** Kita simpan `price_at_time` (Harga saat ini). Kenapa? Karena harga barang bisa berubah bulan depan. Di riwayat belanja, harga harus tetap harga yang dulu dibayar, gak boleh ikut naik.
- **Baris 39-41 (Langkah 3):** **Simpan Daftar Barang.** Kita masukkan semua daftar barang tadi ke tabel `order_items` sekaligus ("Bulk Insert").
- **Baris 46-49 (Langkah 4):** **Bersih-bersih.** Karena sudah dibeli, keranjang belanja user di tabel `cart` kita kosongkan (hapus semua isinya buat user ini).
- **Baris 51:** Sukses! Kembalikan kabar gembira dan nomor orderya.

---

### **Fungsi 2: Lihat Riwayat Belanja (Baris 62-86)**

_Tujuannya: Menampilkan daftar transaksi yang pernah dilakukan user di halaman "History"._

- **Baris 62:** Fungsi `getUserOrders`. Butuh `userId`.
- **Baris 64-78:** **Minta Data Lengkap.** Kita suruh Supabase ambil data dari tabel `orders`.
  - **Baris 66-70:** Ambil info dasar bon (ID, tanggal beli, total harga, status).
  - **Baris 71-75 (Join Bertingkat):**
    - Ambil detail barangnya dari tabel `order_items`.
    - Dari `order_items`, loncat lagi ke tabel `products` buat ambil **Nama Produk** dan **Gambarnya**.
    - Masuk sampai 3 lapisan tabel (Orders -> Order Items -> Products -> Product Images).
  - **Baris 78:** Urutkan dari yang paling baru (`ascending: false`). Jadi belanjaan terakhir muncul paling atas.
- **Baris 81:** Kembalikan data riwayatnya ke layar HP.

---

### **Penutup (Baris 87)**

- Fungsi selesai.
