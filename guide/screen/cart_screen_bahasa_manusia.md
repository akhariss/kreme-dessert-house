# Penjelasan Baris per Baris: `CartScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/CartScreen.js`. Halaman ini menangani manajemen keranjang belanja dan proses Checkout.

---

### **Persiapan (Baris 1-18)**

- **Baris 12:** Import `useCart` (Hook keranjang). Ini alat utama kita buat nambah/kurang/hapus barang.
- **Baris 14:** Import `orderService` (Backend Service). Ini "kurir" yang bakal kirim data pesanan ke database saat checkout.
- **Baris 13, 24:** Import `useAuthContext`. Kita butuh tahu **siapa user yang login** saat ini.

---

### **Logic Halaman (Baris 21-72)**

- **Baris 23:** Ambil fungsi-fungsi sakti dari Context:
  - `cartItems`: Daftar barang di keranjang.
  - `removeFromCart`: Fungsi hapus barang.
  - `updateQuantity`: Fungsi tambah/kurang jumlah.
  - `getTotalPrice`: Fungsi hitung total duit yang harus dibayar.
  - `clearCart`: Fungsi buat mengosongkan keranjang.
- **Baris 25:** `isProcessing`: Penanda "Loading" saat tombol checkout ditekan biar gak dipencet 2x.

- **Logic Checkout (Baris 34-72):**
  - **Cek 1:** Kalau keranjang kosong, batal.
  - **Cek 2:** Kalau user belum login (`!user`), munculin peringatan suruh login dulu.
  - **Proses:** Set loading jadi `true`.
  - **Baris 52:** Panggil `orderService.createOrder` buat setor data ke database. Kita kirim ID user, Daftar barang, dan Total harga.
  - **Sukses:** Kosongkan keranjang (`clearCart`) dan munculin Alert "Order Success!". Kalau user klik OK, pindah ke Dashboard.
  - **Gagal:** Munculin pesan error.

---

### **Logic UI Item (Baris 87-130)**

- Fungsi `renderCartItem` ini menggambar wujud satu baris barang di keranjang.
- **Baris 91:** Foto produk.
- **Baris 104-120 (Tombol Plus-Minus):**
  - Tombol Minus (`-`) memanggil `updateQuantity` dengan jumlah dikurang 1.
  - Angka jumlah di tengah.
  - Tombol Plus (`+`) memanggil `updateQuantity` dengan jumlah ditambah 1.
- **Baris 123 (Tombol Sampah):**
  - Tombol merah buat hapus barang.
  - Sebelum hapus, dia tanya dulu "Are you sure?" pakai `Alert` (Baris 75).

---

### **Tampilan Utama (Baris 153-214)**

- **Baris 156:** Header tulisan "Shopping Cart" dan ikon keranjang kecil.
- **Baris 177:** **Percabangan Tampilan.**
  - **Kondisi A (Kosong):** Panggil `renderEmptyCart` (Baris 132). Isinya gambar keranjang kosong besar dan tombol "Browse Collection" buat belanja.
  - **Kondisi B (Ada Isi):**
    - Tampilkan `FlatList` (Daftar barang).
    - Tampilkan Bagian Footer (Baris 189).
- **Footer (Baris 189):**
  - Menampilkan **Total Harga**.
  - Menampilkan **Tombol Checkout**. Kalau lagi loading (`isProcessing`), tombol berubah jadi putaran loading (`ActivityIndicator`).

---

### **Penutup**

- Eksport halaman ini.
