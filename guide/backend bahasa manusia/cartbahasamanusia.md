# Penjelasan Baris per Baris: `cartService.js` (Bahasa Manusia)

Dokumen ini menjelaskan apa yang terjadi di dalam kode `src/backend/cartService.js` secara urut dari atas ke bawah, menggunakan bahasa yang mudah dimengerti.

---

### **Persiapan (Baris 1-3)**

- **Baris 1:** Kita panggil ("import") alat penghubung ke database Supabase agar aplikasi bisa ngobrol sama server.
- **Baris 3:** Membuat objek `cartService`. Ini adalah "tukang urus keranjang" kita. Semua logika tambah/kurang barang ada di sini.

---

### **Fungsi 1: Ambil Isi Keranjang (Baris 7-39)**

_Tujuannya: Melihat user ini lagi mau beli apa saja (tampil di halaman Cart)._

- **Baris 7:** Fungsi `fetchCart`. Butuh `userId`.
- **Baris 9-22:** **Ambil Data dari Database.**
  - Buka tabel `cart`.
  - Ambil isinya, tapi karena tabel `cart` isinya cuma ID produk, kita perlu **JOIN** (minta tolong ambilkan data teman-temannya).
  - **Baris 15-20:** Masuk ke tabel `products` buat ambil Nama, Harga (dari tabel `prices`), dan Gambar (dari tabel `product_images`).
  - **Baris 22:** Filter khusus punya user ini saja.
- **Baris 27-34:** **Rapi-rapi Data.**
  - Data mentah dari Supabase bentuknya agak ribet (bersarang-sarang).
  - Kita ubah jadi daftar yang rapi (`map`).
  - Kita ambil ID Produk, Nama, Harga (ambil harga pertama kalau ada banyak), Gambar (ambil gambar pertama), dan Jumlahnya.
  - Ini biar tampilan UI gak pusing bacanya.

---

### **Fungsi 2: Tambah ke Keranjang (Baris 44-83)**

_Tujuannya: Saat tombol "Add to Cart" ditekan. Kalau barang sudah ada, jumlahnya ditambah. Kalau belum, dimasukkan baru._

- **Baris 44:** Fungsi `addToCart`. Butuh `userId` dan barang apa (`product`).
- **Baris 47-52:** **Cek Dulu.** Kita tanya database: "Eh, user ini udah pernah masukin barang ini ke keranjang belum?"
  - Kita cari di tabel `cart` pake ID user dan ID produk.
- **Baris 54:** Kalau errornya cuma "data gak ketemu" (`PGRST116`), biarin aja. Itu wajar kalau belum pernah beli.
- **Baris 56:** **Percabangan Logika.**
  - **Baris 58-62 (Jalur A - Barang Sudah Ada):** Kita update jumlahnya (`quantity`). Jumlah lama ditambah 1.
  - **Baris 66-74 (Jalur B - Barang Belum Ada):** Kita bikin baris baru (`insert`) di tabel `cart`. Set jumlahnya jadi 1.

---

### **Fungsi 3: Kurangi Hapus Item (Baris 88-109)**

_Tujuannya: Saat tombol "minus" (-) ditekan di keranjang._

- **Baris 88:** Fungsi `removeFromCart`. Butuh `userId`, `productId`, dan jumlah sekarang (`currentQuantity`).
- **Baris 90:** **Cek Sisa Berapa.**
  - **Baris 92-96 (Kalau sisa > 1):** Cuma kurangi jumlahnya jadi dikurang 1. Jangan dihapus.
  - **Baris 99-103 (Kalau sisa tinggal 1):** Karena dikurang 1 jadi 0, mending langsung **hapus** aja barangnya dari keranjang.
- **Logic ini penting** biar gak ada barang dengan jumlah 0 nongkrong di keranjang.

---

### **Fungsi 4: Kosongkan Keranjang (Baris 114-124)**

_Tujuannya: Bersih-bersih keranjang kalau user sudah selesai bayar (checkout)._

- **Baris 114:** Fungsi `clearCart`. Butuh `userId`.
- **Baris 116-119:** Hapus **SEMUA** data di tabel `cart` milik user ini. Bersih total.

---

### **Penutup (Baris 125)**

- Kode selesai.
