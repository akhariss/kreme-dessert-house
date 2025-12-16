# Penjelasan Baris per Baris: `UserForm.js` (Bahasa Manusia)

Dokumen ini menjelaskan apa yang terjadi di dalam kode `src/components/UserForm.js`. Komponen ini adalah formulir sederhana untuk mengubah nama pengguna.

---

### **Persiapan (Baris 1-4)**

- **Baris 1-2:** Import "bahan baku" utama: React untuk logika komponen, dan komponen UI dasar (View, Text, Input, Tombol) dari React Native.
- **Baris 3-4:** Import gaya (styles) dan tema warna biar tampilannya seragam dengan halaman lain.

---

### **Komponen Utama (Baris 6-35)**

- **Baris 6:** Membuat fungsi komponen `UserForm`. Dia menerima 3 "titipan" (props) dari induknya:
  1.  `currentName`: Nama user saat ini (biar kolom input gak kosong).
  2.  `onUpdateProfile`: Fungsi yang dijalankan saat tombol "Simpan" ditekan.
  3.  `loading`: Status apakah sedang proses simpan atau tidak (biar tombol bisa dimatikan sementara).
- **Baris 7:** **State Nama.** Kita buat variabel `name` yang bisa berubah-ubah saat user mengetik. Nilai awalnya diambil dari `currentName`.

---

### **Tampilan / UI (Baris 9-34)**

- **Baris 10:** Kotak pembungkus utama formulir.
- **Baris 11:** Judul formulir: "Edit Profile".
- **Baris 14-32 (Grup Input):**
  - **Baris 15:** Label kecil "Full Name" di atas kotak input.
  - **Baris 16-22 (Kotak Input):**
    - Tempat user mengetik nama.
    - `value={name}`: Isinya selalu mengikuti variabel `name` kita.
    - `onChangeText={setName}`: Setiap kali user ngetik satu huruf, langsung update variabel `name`.
  - **Baris 23-31 (Tombol Simpan):**
    - Tombol ini punya warna hitam (`theme.colors.black`).
    - **Baris 25:** Saat ditekan, panggil fungsi `onUpdateProfile` sambil bawa nama baru yang sudah diketik tadi.
    - **Baris 26:** `disabled={loading}`. Kalau lagi loading (lagi nyimpen ke database), tombolnya **mati/gak bisa dipencet** biar user gak spam klik.
    - **Baris 29:** Teks tombolnya juga pintar. Kalau lagi loading tulisannya "Updating...", kalau tidak tulisannya "Update Name".

---

### **Penutup (Baris 37)**

- Eksport komponen ini biar bisa dipakai di halaman Profile.
