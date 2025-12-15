# Dokumentasi Logic: `orderService.js`

**Path File:** `src/backend/orderService.js`

File ini menangani proses pencatatan transaksi (Checkout) dan pengambilan riwayat pesanan (Order History). Ini adalah langkah akhir dari alur belanja.

---

## 📌 Tujuan Utama

Memindahkan data transaksi dari memori sementara (Cart) menjadi data permanen (Orders & Order Items) untuk arsip dan pembukuan.

---

## 🔧 Daftar Fungsi & Penjelasan Logic

### 1. `createOrder(userId, cartItems, totalAmount)`

**Fungsi:** Menyimpan order baru dengan mekanisme yang menyerupai transaksi database.

- **Logic Alur (Transactional Flow):**
  1.  **Validasi**: Pastikan keranjang tidak kosong.
  2.  **Langkah 1 (Header)**: Buat record baru di tabel `orders` (simpan siapa yang beli dan total harganya). Dapatkan `order_id` baru.
  3.  **Langkah 2 (Items)**: Siapkan data detail barang.
      - **PENTING**: Kita menyimpan `price_at_time` (Harga saat beli). Jika harga produk naik minggu depan, riwayat order user harus tetap harga lama.
  4.  **Langkah 3 (Bulk Insert)**: Masukkan semua item ke tabel `order_items` sekaligus menggunakan ID order tadi.
  5.  **Langkah 4 (Cleanup)**: Panggil fungsi untuk menghapus isi keranjang user (`cart`) karena sudah dibeli.

### 2. `getUserOrders(userId)`

**Fungsi:** Mengambil riwayat belanja untuk ditampilkan di halaman profil/history.

- **Logic Alur:**
  1.  Select dari tabel `orders`.
  2.  **Join Nested**: Ambil juga `order_items` -> `products` -> `product_images`.
  3.  **Sorting**: Urutkan dari yang terbaru (`created_at` descending).

---

## 💡 Konsep Kunci: Snapshot Harga

```javascript
const orderItems = cartItems.map((item) => ({
  price_at_time: item.price, // <--- KUNCI
}));
```

Jangan pernah me-refer harga ke tabel `products` saat menyimpan order. Harga di tabel `products` adalah "harga sekarang", sedangkan `price_at_time` di tabel order adalah "harga saat transaksi terjadi".

---

## ⚡ Error Handling

Fungsi ini menggunakan `try-catch` block. Jika salah satu langkah insert gagal (misal internet putus di tengah jalan), error akan dilempar ke UI agar user tahu transaksinya gagal dan tidak ada uang yang terpotong/order tercatat setengah-setengah.
