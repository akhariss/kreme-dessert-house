# Penjelasan Baris per Baris: `ProfileScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/ProfileScreen.js`. Halaman ini menampilkan profil user, form ganti nama, dan tombol logout.

---

### **Persiapan (Baris 1-9)**

- **Baris 3:** Import `useAuthContext`. Kita butuh data user (Clerk) dan user database (Supabase).
- **Baris 5:** Import `UserForm`. Komponen form edit nama yang sudah kita buat sebelumnya (yang ada di folder components).
- **Baris 9:** Import `profileService`. Service backend buat update nama di kedua sistem (Clerk & Supabase).

---

### **Logic Halaman (Baris 11-54)**

- **Baris 12:** Ambil `clerkUser`, `supabaseUser` (alias user), dan fungsi `logout`.
- **Baris 16 (Handle Update Profile):**

  - Dipanggil saat tombol "Update Name" di form ditekan.
  - Validasi: Nama nggak boleh kosong.
  - Set loading.
  - **Baris 25:** Panggil `profileService.updateProfile`. Kirim user Clerk, ID Supabase, dan Nama Baru.
  - Tampilkan Alert sukses atau error.

- **Baris 38 (Handle Logout):**
  - Munculin konfirmasi "Are you sure?" dulu. Jangan sampai user kepencet logout nggak sengaja.
  - Kalau "Yes", panggil fungsi `logout`.

---

### **Tampilan Utama (Baris 56-105)**

- **Baris 56:** Kalau data user belum siap, jangan tampilkan apa-apa (return null) biar nggak error.
- **Baris 60:** Navbar di atas.

- **Baris 64 (Header Profil):**

  - Tampilkan Foto Profil. Kalau user punya foto Google (`imageUrl`), pake itu. Kalau nggak, pakai ikon orang (`Ionicons person`).
  - Tampilkan Nama dan Email di bawah foto.

- **Baris 80 (Form Edit):**

  - Panggil komponen `UserForm`.
  - Kita kasih: Nama sekarang (`currentName`), fungsi update (`onUpdateProfile`), dan status loading.

- **Baris 87 (Info Aplikasi):**

  - Bagian pemanis di bawah.
  - Ada kata-kata mutiara, versi aplikasi, dan hak cipta.

- **Baris 95 (Tombol Logout):**
  - Tombol merah di paling bawah buat keluar akun.

---

### **Penutup**

- Eksport halaman ini.
