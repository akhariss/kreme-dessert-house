# Penjelasan Baris per Baris: `Navbar.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/components/Navbar.js`. Ini adalah komponen navigasi atas yang juga punya menu samping (Sidebar/Drawer) tersembunyi.

---

### **Persiapan (Baris 1-11)**

- **Baris 5-6:** Kita panggil context `Cart` (buat hitung jumlah belanjaan) dan `Auth` (buat tahu siapa yang login).
- **Baris 11:** Kita ukur lebar layar HP (`width`). Ini penting buat animasi menyembunyikan sidebar ke kiri layar.

---

### **Komponen Utama (Baris 14-38)**

- **Baris 15-16:** Ambil data: Jumlah item di keranjang, dan Info User yang sedang login.
- **Baris 17:** `sidebarOpen`: Saklar untuk tahu sidebar lagi buka atau tutup.
- **Baris 18:** `slideAnim`: Nilai animasi. Awalnya diset `-width` (minus lebar layar), artinya sidebar sembunyi total di sebelah kiri layar alias gak kelihatan.

- **Baris 21-38 (Fungsi Buka-Tutup):**
  - **Tutup Sidebar:** Animasi geser nilai koordinat X kembali ke minus (`-width`).
  - **Buka Sidebar:** Animasi geser nilai koordinat X ke `0` (masuk ke layar).

---

### **Daftar Menu (Baris 41-47)**

- Kita bikin daftar menu di sini biar gampang diedit. Isinya: Home, Dashboard, About, Cart, dan **Admin Panel**.

---

### **Tampilan Navbar Atas (Baris 52-80)**

- **Baris 52:** Latar belakang Navbar pakai `LinearGradient` (Gradasi warna pink/ungu).
- **Baris 58 (Tombol Menu Kiri):** Kalau diklik, panggil fungsi `toggleSidebar` buat buka menu samping. Ikonnya garis tiga (hamburger menu).
- **Baris 64 (Judul Tengah):** Teks "Kremé Dessert House".
- **Baris 69 (Tombol Cart Kanan):**
  - Kalau diklik pindah ke halaman cart.
  - **Baris 73:** Fitur **Badge**. Kalau ada barang di keranjang (`> 0`), munculin bulatan kecil merah dengan angka jumlah barangnya.

---

### **Tampilan Sidebar / Menu Samping (Baris 82-151)**

- Bagian ini cuma muncul kalau `sidebarOpen` bernilai true.
- **Baris 83:** Pakai `Modal` transparan biar sidebar menutupi layar.
- **Baris 89 (Overlay):** Layar hitam transparan di belakang sidebar. Kalau bagian gelap ini diklik, sidebar nutup.
- **Baris 90 (Kotak Animasi):** Ini kotak putih sidebarnya. Posisinya digerakkan oleh `translateX: slideAnim`.
- **Baris 105 (Info User):**
  - Cek dulu user sudah login belum?
  - Kalau sudah, tampilkan Nama dan Email user.
  - Bisa diklik buat ke halaman Profile.
- **Baris 128 (Looping Menu):**
  - Kita ambil daftar `menuItems` yang dibuat di atas tadi.
  - Untuk setiap item, kita bikin satu tombol menu.
  - Kalau diklik: Navigasi ke halaman itu, lalu tutup sidebar.

---

### **Penutup (Baris 387)**

- Eksport Navbar.
