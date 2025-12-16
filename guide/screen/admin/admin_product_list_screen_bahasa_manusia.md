# Penjelasan Baris per Baris: `AdminProductListScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/admin/AdminProductListScreen.js`. Halaman ini adalah **Dashboard Admin** yang menampilkan daftar semua produk. Di sini admin bisa melihat, menghapus, atau masuk ke menu edit.

---

### **Persiapan (Baris 1-17)**

- **Baris 24:** Kita pakai `useProducts` buat ambil daftar produk dan fungsi `refreshProducts`. Kita nggak perlu fetch manual, cukup pakai yang sudah disediakan Context.

---

### **Logic Halaman (Baris 23-51)**

- **Baris 25:** `deletingId`. Variabel buat nyatet ID produk mana yang lagi proses dihapus (biar tombol hapusnya bisa berubah jadi loading).
- **Baris 28 (Fungsi Hapus):**
  - Munculin `Alert` peringatan "Are you sure?". Ini penting biar nggak kehapus nggak sengaja.
  - Kalau user klik "Delete":
    - Tandai produk ini lagi diproses (`setDeletingId`).
    - Panggil `productService.deleteProduct`.
    - Kalau sukses, refresh daftar produk biar yang dihapus hilang dari layar.
    - Munculin pesan sukses.

---

### **Logic Tampilan Item (Baris 54-86)**

- Ini fungsi `renderItem` yang menggambar kotak untuk SATU produk.
- **Baris 55:** Kotak kartu produk.
- **Baris 56:** Foto kecil produk.
- **Baris 58-61 (Info):**
  - Nama Produk tebal.
  - Harga dan Kategori di bawahnya.
- **Baris 65 (Tombol Aksi):**
  - **Tombol Edit (Pensil):** Pindah ke halaman `AdminEditProduct`, sambil bawa data produk ini (`{ product: item }`) supaya form di sana otomatis terisi.
  - **Tombol Hapus (Sampah):**
    - Memanggil fungsi `handleDelete`.
    - Kalau lagi proses hapus (`deletingId === item.id`), ikon sampah berubah jadi jam pasir (`hourglass`). Keren kan detailnya?

---

### **Tampilan Utama (Baris 88-115)**

- **Baris 91:** Navbar di atas. Judulnya "Admin Dashboard".
- **Baris 97 (Daftar Produk):**

  - Pakai `FlatList`.
  - `refreshControl`: Fitur "Tarik ke bawah untuk refresh". Kalau ditarik, dia panggil `refreshProducts`. Berguna kalau admin habis update data di HP lain.

- **Baris 108 (Tombol Tambah / FAB):**
  - Tombol bulat melayang (Floating Action Button) di pojok kanan bawah.
  - Ada tanda plus (+).
  - Kalau diklik, pindah ke halaman `AdminEditProduct` **tanpa** bawa data. Halaman edit bakal tahu kalau ini berarti "Buat Baru".

---

### **Penutup**

- Eksport halaman ini.
