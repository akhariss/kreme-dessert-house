# Penjelasan Baris per Baris: `AuthContext.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/context/AuthContext.js`. Ini adalah "pusat kendali" untuk urusan Login, Logout, dan Identitas User. Kita pakai Context biar data user bisa diakses dari layar mana saja tanpa oper-operan yang ribet.

---

### **Persiapan (Baris 1-5)**

- **Baris 1:** Import React dan hook dasar (`createContext` buat bikin wadah data, `useContext` buat ambil data, `useEffect` & `useState` buat logic).
- **Baris 2:** Import hook dari **Clerk**. Clerk adalah layanan pihak ketiga yang kita pakai buat ngurusin Login Google/Email yang aman.
- **Baris 3:** Import **Supabase**. Kita butuh ini buat nyimpen data user ke database kita sendiri (PostgreSQL).
- **Baris 5:** `createContext()`. Kita bikin "gelas kosong" bernama `AuthContext` yang nanti bakal kita isi data user.

---

### **Custom Hook (Baris 7-13)**

- **Baris 7:** `useAuthContext`. Ini adalah jalan pintas buat komponen lain yang mau pakai data user.
- **Logic:**
  - Ambil isi gelas `AuthContext`.
  - **Baris 9:** Kalau gelasnya kosong (komponen yang manggil ada di luar `AuthProvider`), marahin programmernya ("Error: must be used within AuthProvider").
  - Kalau ada isinya, balikin datanya.

---

### **Komponen Penyedia Data (AuthProvider) (Baris 15)**

- Ini komponen utama yang membungkus seluruh aplikasi kita di `App.js`. Jadi semua layar ada di dalam "lingkupan" AuthProvider.
- **Baris 16-17 (Data User):**
  - `useUser`: Ambil info profil user dari Clerk (Nama, Email, Foto).
  - `useAuth`: Ambil token rahasia (JWT) buat izin akses ke Supabase.
- **Baris 18:** `supabaseUser`. Kita butuh nyimpen data user versi Supabase juga. Kenapa? Karena data transaksi (bon belanja) disimpen di Supabase dan butuh ID user versi Supabase, bukan ID versi Clerk.

---

### **Fungsi Sinkronisasi User (Baris 24-73)**

- **Tujuan:**
  - Clerk adalah tempat Log in.
  - Supabase adalah tempat Simpan Data.
  - Kita harus pastikan user yang login di Clerk, datanya juga ada di tabel `users` Supabase.
- **Baris 29:** Minta "Surat Jalan" (Token) dari Clerk.
- **Baris 31:** Kasih Token itu ke Supabase ("Nih, saya user resmi, jangan ditolak").
- **Baris 35-39 (Cek User):**
  - Tanya Supabase: "Eh, user dengan ID Clerk xxx udah ada belum di tabel `users`?"
  - **Baris 41:** Kalau sudah ada (`existingUser`), simpan datanya ke state `supabaseUser`. Selesai.
- **Baris 48-59 (Simpan Baru):**
  - Kalau belum ada (user baru daftar), kita buat data baru di tabel `users`.
  - Ambil Nama, Email, Foto dari Clerk, terus `insert` ke Supabase.
- **Baris 67:** Update state `supabaseUser` dengan data user baru.

---

### **Fungsi Pemantau (Baris 78-98)**

- `useEffect` ini kayak CCTV. Dia memantau variabel `user` dari Clerk.
- **Logic:**
  - Tiap kali ada perubahan status login (misal user baru buka app atau baru login), fungsi ini jalan.
  - **Baris 85 (Login):** Kalau user login, jalankan `syncUserToSupabase` tadi.
  - **Baris 88 (Logout):** Kalau user logout, kosongkan data.

---

### **Fungsi Logout (Baris 103)**

- Panggil fungsi `signOut` dari Clerk.
- Bersihkan data lokal.

---

### **Bungkusan Akhir (Baris 114-127)**

- **Baris 114:** `value`. Ini isi paket yang kita bagikan ke semua komponen. Isinya:
  - `clerkUser`: Info profil (buat nampilin foto/nama).
  - `user`: Info database (buat transaksi).
  - `isAuthenticated`: Status (true kalau sudah login).
  - Fungsi-fungsi (`logout`, `syncUser`).
- **Baris 127:** Bungkus `children` (aplikasi kita) dengan Provider ini.

---

### **Penutup**

- Eksport File.
