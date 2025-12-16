# Penjelasan Baris per Baris: `CartContext.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/context/CartContext.js`. Context ini mengurus "Keranjang Belanja Global". Kenapa global? Biar jumlah barang di keranjang bisa dilihat di Navbar, di halaman Detail, di halaman Cart, semua sinkron.

---

### **Persiapan (Baris 1-3)**

- **Baris 2:** `useAuthContext`. Kita butuh tahu siapa user yang login, biar keranjang belanjanya nggak ketukar sama orang lain.
- **Baris 3:** `cartService`. Ini tukang suruh-suruh ke backend (database) yang udah kita bahas sebelumnya.

---

### **Komponen Utama (CartProvider) (Baris 15-18)**

- `cartItems`: Daftar belanjaan user. Disimpan dalam bentuk Array `[]`.
- `user`: Data user yang diambil dari AuthContext.

---

### **Logic Load Cart (Baris 21-39)**

- `useEffect` (Penjaga).
- **Baris 22:** Kalau user login (`isAuthenticated` & punya `id`), otomatis panggil `loadCart()`.
- **Baris 32:** Panggil `cartService.fetchCart` buat ambil data belanjaan dari database Supabase.
- **Baris 33:** Simpan hasilnya ke `cartItems`. Jadi pas buka aplikasi, keranjang langsung keisi kalau dulu pernah masukin barang.

---

### **Logic Add to Cart (Baris 41-62)**

- **Tujuan:** Nambah barang ke keranjang.
- **Baris 42 (Optimistic Update):**
  - Ini trik UX (User Experience). Kita update tampilan aplikasi DULUAN sebelum data dikirim ke server.
  - Kenapa? Biar aplikasi terasa **cepat** dan **instan**, gak ada loading muter-muter.
  - **Logic:** Kita cek, barang ini udah ada belum di keranjang?
    - Kalau ada (`exist`), jumlahnya ditambah 1.
    - Kalau belum, masukin barang baru dengan `quantity: 1`.
- **Baris 52 (Sync Server):**
  - Setelah tampilan diupdate, baru kita kirim data ke database di background (`cartService.addToCart`).
  - **Baris 58:** Kalau ternyata gagal (internet mati/error), kita **Rollback** (balikin keranjang ke kondisi sebelum ditambah) dan kasih peringatan.

---

### **Logic Update Quantity (Baris 68-128)**

- **Tujuan:** Buat tombol Plus (+) dan Minus (-) di halaman Cart.
- **Logic Optimistic:** Sama kayak Add to Cart, kita ubah dulu angkanya di layar.
  - Kalau jumlah jadi 0 -> Hapus barang dari daftar.
  - Kalau > 0 -> Update angkanya.
- **Baris 84 (Sync Server):** Kirim peubahan ke database.

---

### **Logic Hapus Item (Baris 133-149)**

- **Tujuan:** Buat tombol Sampah (Trash).
- **Logic:** Langsung hapus item dari daftar lokal, terus kirim perintah hapus ke server.

---

### **Logic Clear Cart (Baris 154)**

- **Tujuan:** Mengosongkan keranjang. Biasanya dipanggil setelah user **Sukses Checkout**.

---

### **Fungsi Hitungan (Baris 167-173)**

- `getTotalItems()`: Menghitung total jumlah barang (misal beli 2 kue + 3 roti = 5 items). Dipakai buat angka merah kecil di ikon keranjang (Badge).
- `getTotalPrice()`: Menghitung total duit yang harus dibayar. (Harga x Jumlah) untuk semua barang.

---

### **Bungkusan Akhir (Baris 175-190)**

- Kita eksport semua fungsi tadi (`addToCart`, `removeFromCart`, `updateQuantity`, dll) dalam satu paket `value`.
- Komponen apa aja yang ada di dalam `CartProvider` bisa pakai fungsi-fungsi ini.

---

### **Penutup**

- Eksport File.
