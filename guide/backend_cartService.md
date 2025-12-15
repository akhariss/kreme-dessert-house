# Dokumentasi Logic: `cartService.js`

**Path File:** `src/backend/cartService.js`

File ini adalah "Jembatan" antara aplikasi React Native dengan database Supabase khusus untuk fitur Keranjang Belanja. File ini tidak memiliki state (stateless), hanya berisi kumpulan fungsi asinkron (async functions).

---

## 📌 Tujuan Utama

Mengelola data keranjang belanja user di database Supabase. Memastikan bahwa sat user pindah device atau login ulang, keranjang mereka tetap ada (Persistent Cart).

---

## 🔧 Daftar Fungsi & Penjelasan Logic

### 1. `fetchCart(userId)`

**Fungsi:** Mengambil seluruh daftar belanjaan milik user tertentu.

- **Logic Alur:**
  1.  Menerima `userId` (UUID dari Supabase).
  2.  Melakukan Query `SELECT` ke tabel `cart`.
  3.  Melakukan **JOIN RELASI** (menggabungkan tabel) untuk mendapatkan detail produk:
      - Join `products` (ambil nama).
      - Join `prices` (ambil harga).
      - Join `product_images` (ambil gambar).
  4.  **Formatting Data**: Data mentah dari Supabase biasanya berbentuk _nested object_ (bertingkat). Fungsi ini merapikannya menjadi _flat object_ agar mudah ditampilkan di UI (misal: `item.products.prices[0].price` diubah menjadi `item.price`).

### 2. `addToCart(userId, product)`

**Fungsi:** Menambahkan barang ke keranjang atau menambah jumlahnya jika sudah ada.

- **Logic Alur (Upsert Manual):**
  1.  **Cek Eksistensi**: Query ke database "Apakah User X sudah punya Produk Y di cart?".
  2.  **Kondisi A (Barang Sudah Ada)**:
      - Ambil quantity lama.
      - Lakukan `UPDATE cart SET quantity = quantity + 1`.
  3.  **Kondisi B (Barang Belum Ada)**:
      - Lakukan `INSERT INTO cart` dengan `quantity: 1`.
- **Kenapa Manual?** Supaya kita punya kontrol penuh atas proses increment, daripada sekadar menimpa data.

### 3. `removeFromCart(userId, productId, currentQuantity)`

**Fungsi:** Mengurangi jumlah barang atau menghapusnya jika sisa 1.

- **Logic Alur:**
  1.  Cek parameter `currentQuantity`.
  2.  **Jika > 1**: Lakukan `UPDATE` quantity dikurangi 1.
  3.  **Jika = 1**: Lakukan `DELETE` baris tersebut dari tabel `cart`.
  4.  Parameter `currentQuantity` ini dikirim dari Frontend untuk menghemat 1x query select ke database.

### 4. `clearCart(userId)`

**Fungsi:** Mengosongkan keranjang (biasanya dipanggil setelah Checkout berhasil).

- **Logic Alur:**
  1.  Melakukan `DELETE FROM cart WHERE user_id = ...`.
  2.  Ini akan menghapus semua item belanja milik user tersebut sekaligus.

---

## 💡 Code Snippet Penting

Bentuk query join yang kompleks di `fetchCart`:

```javascript
.select(`
  id,
  product_id,
  quantity,
  products (
    id, name,
    prices (price),
    product_images (image_url)
  )
`)
```

Ini adalah fitur powerful Supabase (PostgREST) untuk mengambil data dari 4 tabel berbeda dalam 1 kali request HTTP.
