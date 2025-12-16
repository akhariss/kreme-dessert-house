# Penjelasan Baris per Baris: `profileService.js` (Bahasa Manusia)

Dokumen ini menjelaskan apa yang terjadi di dalam kode `src/backend/profileService.js` secara urut dari atas ke bawah, menggunakan bahasa yang mudah dimengerti.

---

### **Persiapan (Baris 1-7)**

- **Baris 1:** Kita panggil ("import") alat penghubung ke database Supabase.
- **Baris 7:** Membuat objek `profileService`. Ini adalah "manager personalia" yang mengurus data diri user.

---

### **Fungsi 1: Ganti Nama Profil (Baris 13-43)**

_Tujuannya: Saat user mengganti nama di menu Edit Profile. Ini unik karena kita pakai 2 sistem: Clerk (Log in) dan Supabase (Data)._

- **Baris 13:** Fungsi `updateProfile`. Butuh 3 data: User Clerk (`clerkUser`), ID User di database (`supabaseUserId`), dan Nama Baru (`newName`).
- **Baris 15-17:** **Pecah Nama.** Karena Clerk memisahkan "Nama Depan" dan "Nama Belakang", kita harus memecah nama lengkap dari inputan user.
  - Misal "Budi Santoso" -> Depan: "Budi", Belakang: "Santoso".
- **Baris 20-23 (Langkah 1):** **Lapor ke Clerk.** Kita update data di sistem Login (Clerk) dulu, biar kalau besok login, namanya sudah baru.
- **Baris 27-34 (Langkah 2):** **Lapor ke database Supabase.** Kita update juga data di tabel `users`.
  - Kenapa dua kali? Karena Supabase butuh nama user untuk relasi data (misal untuk bon transaksi), sedangkan Clerk butuh untuk sesi login. **Dua-duanya wajib sinkron.**
  - Kita update kolom `full_name` di baris yang ID-nya cocok.
- **Baris 38:** Berhasil! Lapor balik kalau sukses.

---

### **Fungsi 2: Ganti Password (Baris 49-59)**

_Tujuannya: Saat user ingin ganti kata sandi._

- **Baris 49:** Fungsi `updatePassword`. Cuma butuh User Clerk dan Password Barunya.
- **Baris 51-53:** **Lapor ke Clerk saja.**
  - **Penting:** Kita **TIDAK** menyimpan password di database Supabase kita sendiri. Itu bahaya. Biar Clerk (ahli keamanan) yang simpan passwordnya. Kita cuma suruh Clerk: "Tolong ganti password user ini ya."
- **Baris 54:** Selesai. Password aman, kita tenang.

---

### **Penutup (Baris 60)**

- Kode selesai.
