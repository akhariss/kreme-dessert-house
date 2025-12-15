# Dokumentasi Logic: `profileService.js`

**Path File:** `src/backend/profileService.js`

File ini menangani sinkronisasi data profil user. Uniknya, di aplikasi ini data user tersimpan di dua tempat: **Clerk** (untuk keamanan Auth) dan **Supabase** (untuk relasi Database).

---

## 📌 Tujuan Utama

Memastikan data di kedua sistem (Clerk & Supabase) selalu konsisten. Jika user ganti nama, kedua database harus diupdate.

---

## 🔧 Daftar Fungsi & Penjelasan Logic

### 1. `updateProfile(clerkUser, supabaseUserId, newName)`

**Fungsi:** Ganti nama user.

- **Logic Dual-Write:**
  1.  **Update Clerk**: Memanggil method `user.update({ firstName, lastName })` dari object user Clerk. Ini agar tampilan di komponen UI Clerk berubah.
  2.  **Update Supabase**: Memanggil query `UPDATE users SET full_name = ...` di Supabase. Ini agar data nama di invoice/database kita ikut berubah.
  3.  Kalau salah satu gagal, fungsi throw error agar frontend tahu ada masalah.

### 2. `updatePassword(clerkUser, newPassword)`

**Fungsi:** Ganti password.

- **Logic**:
  - Hanya memanggil fungsi Clerk `updatePassword`.
  - **Supabase TIDAK TAHU Password**. Supabase hanya menyimpan data profil publik. Keamanan/verifikasi password 100% diurus Clerk.
  - Ini adalah praktik keamanan yang baik (Separation of Concerns).

---

## 💡 Struktur Data

- **Clerk**: Menyimpan Email, Password, Phone, MFA (Data Sensitif).
- **Supabase**: Menyimpan ID, Nama, Avatar URL (Data Relasional).
  Semua query yang berhubungan dengan fitur (Cart, Order) akan join ke tabel Supabase User, bukan ke Clerk. Clerk hanya pintu masuk.
