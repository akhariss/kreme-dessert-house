# Penjelasan Baris per Baris: `productService.js` (Bahasa Manusia)

Dokumen ini menjelaskan apa yang terjadi di dalam kode `src/backend/productService.js` secara urut dari atas ke bawah, menggunakan bahasa yang mudah dimengerti.

---

### **Persiapan (Baris 1-3)**

- **Baris 1:** Kita panggil ("import") alat penghubung ke database Supabase yang sudah kita setting sebelumnya. Tanpa ini, kita tidak bisa ngobrol sama database.
- **Baris 3:** Kita mulai membuat sebuah "wadah" atau objek bernama `productService`. Di dalam wadah ini, kita akan taruh semua jurus-jurus (fungsi) untuk mengurus produk.

---

### **Fungsi 1: Upload Gambar (Baris 8-40)**

_Tujuannya: Mengambil gambar dari HP dan mengirimnya ke awan (cloud)._

- **Baris 8:** Ini fungsi `uploadProductImage`. Dia minta satu hal: alamat gambar di HP (`imageUri`).
- **Baris 10:** **Cek dulu:** Kalau alamat gambarnya kosong/gak ada, ya sudah berhenti (return null).
- **Baris 13-14:** **Trik Penting!** Karena ini aplikasi HP, kita tidak bisa langsung kirim file. Kita harus "baca" dulu file gambar itu jadi kode biner (angka-angka komputer/ArrayBuffer).
- **Baris 17:** Kita kasih nama baru buat gambarnya. Kita pakai jam sekarang (`Date.now()`) biar namanya unik dan gak bentrok. Contoh: `product_17658293.png`.
- **Baris 20-25:** **Proses Upload.** Kita suruh Supabase: "Tolong simpan file biner tadi ke laci (bucket) bernama 'products' dengan nama file yang baru kita buat."
- **Baris 30-32:** **Minta Link.** Setelah sukses disimpan, kita tanya Supabase: "Mana link internet (URL) buat gambar tadi?" Biar nanti bisa kita simpan di database.
- **Baris 34:** Fungsi selesai, kita kembalikan link gambarnya ke yang manggil.
- **Baris 36-39:** Kalau ada error (misal internet mati), lapor ke console biar ketahuan.

---

### **Fungsi 2: Ambil Semua Produk (Baris 44-102)**

_Tujuannya: Mengambil data untuk ditampilkan di halaman depan (Home)._

- **Baris 44:** Ini fungsi `getAllProducts`. Gak butuh input apa-apa.
- **Baris 46-49:** **Ambil Data.** Kita suruh Supabase:
  - Buka tabel `products`.
  - Ambil kolom `id`, `name`, `description`, `category`.
  - **Sekalian minta tolong (Join):** Ambilin juga harganya dari tabel `prices` dan gambarnya dari tabel `product_images`.
  - Syaratnya: Ambil cuma produk yang `is_available` (tersedia) saja.
- **Baris 51-54:** Kalau error, lapor.
- **Baris 60:** **Mulai Merapikan Data.** Data mentah dari Supabase bentuknya kadang ribet (array di dalam array). Kita mau rapikan biar UI tinggal pakai.
- **Baris 62-67 (Logic Harga):** Kita cek, apakah harga bentuknya array atau objek? Kalau array, ambil yang pertama.
- **Baris 73-78 (Logic Gambar):** Sama kayak harga, kita cek apakah gambar bentuknya array atau objek? Kalau array, ambil yang pertama.
- **Baris 80-85:** **Gambar Cadangan.** Kalau produknya ternyata gak punya gambar, kita kasih gambar default (`rose-macaron.png`) biar tampilan aplikasi gak jelek.
- **Baris 87-96:** **Bungkus Ulang.** Kita susun ulang datanya jadi objek yang bersih: ada `id`, `name`, `price`, `image`, dll. Ini yang dikirim ke layar HP.

---

### **Fungsi 3: Ambil Detail Produk (Baris 107-128)**

_Tujuannya: Mengambil info lengkap saat satu produk diklik._

- **Baris 107:** Fungsi `getProductById`. Dia butuh `id` produknya.
- **Baris 109-118:** **Ambil Paket Lengkap.** Kita suruh Supabase ambil data produk itu, TAPI kali ini lebih lengkap:
  - Ambil juga info `prices` (harga).
  - Ambil juga `product_images` (gambar).
  - **Penting:** Ambil juga `product_details` (resep, alergi, cara simpan).
  - `.maybeSingle()`: Artinya, "Coba cari satu aja. Kalau gak ada, jangan error, tapi bilang aja kosong (null)."
- **Baris 121:** Kalau datanya gak ketemu, kembalikan `null`.
- **Baris 123:** Kalau ketemu, kembalikan datanya.

---

### **Fungsi 4: Ambil Produk per Kategori (Baris 136-154)**

_Tujuannya: Filter produk, misal cuma mau lihat "Minuman"._

- **Baris 136:** Fungsi `getProductsByCategory`. Butuh input nama `category`.
- **Baris 138-146:** Minta Supabase cari di tabel `products` yang kolom `category`-nya sama dengan inputan kita.

---

### **Fungsi 5: Hapus Produk (Baris 159-171)**

_Tujuannya: Menghapus produk dari database._

- **Baris 159:** Fungsi `deleteProduct`. Butuh `id`.
- **Baris 161-164:** Perintah hapus baris di tabel `products` yang ID-nya cocok.
- **Catatan:** Kita gak perlu repot hapus harga atau gambar manual. Database sudah disetting "Cascade", jadi kalau induknya (produk) dihapus, anak-anaknya (harga, detail) otomatis ikut terhapus.

---

### **Fungsi 6: Tambah Produk Baru (Baris 176-223)**

_Tujuannya: Admin membuat produk baru. Ini agak panjang karena datanya dipecah ke 4 tabel._

- **Baris 176:** Fungsi `createProduct`. Menerima data produk baru.
- **Baris 179-188 (Langkah 1):** **Simpan Induk.** Masukkan nama, deskripsi, kategori ke tabel `products`. Setelah berhasil, **simpan ID barunya**. Kita butuh ID ini buat langkah selanjutnya.
- **Baris 194-200 (Langkah 2):** **Simpan Harga.** Masukkan harga ke tabel `prices`, sambil tempel ID produk tadi biar database tahu ini harga buat produk mana.
- **Baris 203-208 (Langkah 3):** **Simpan Detail.** Masukkan resep, alergi, penyimpanan ke tabel `product_details` pakai ID tadi juga.
- **Baris 211-216 (Langkah 4):** **Simpan Gambar.** Kalau ada URL gambar, masukkan ke tabel `product_images` pakai ID tadi juga.

---

### **Fungsi 7: Update Produk (Baris 228-285)**

_Tujuannya: Admin mengedit produk. Paling rumit karena harus cek "Update atau Insert?"._

- **Baris 228:** Fungsi `updateProduct`. Butuh `id` dan data baru.
- **Baris 231-238 (Langkah 1):** Update tabel `products` (nama, deskripsi). Ini mudah karena pasti datanya ada.
- **Baris 248-254 (Langkah 2 - Harga):** **Cek Dulu.** Kita cek, produk ini sebelumnya sudah punya harga di database gak?
  - Kalau sduah ada (`priceData` ketemu) -> Lakukan **UPDATE**.
  - Kalau belum ada (misal data lama) -> Lakukan **INSERT** baru.
- **Baris 257-268 (Langkah 3 - Detail):** Sama kayak harga. Cek dulu apakah tabel `product_details` sudah ada datanya buat produk ini? Update kalau ada, Insert kalau belum.
- **Baris 271-278 (Langkah 4 - Gambar):** Sama lagi. Cek tabel `product_images`. Update URL-nya kalau ada, buat baru kalau belum.

---

### **Penutup (Baris 286)**

- Menutup kurung objek `productService`. Kode selesai.
