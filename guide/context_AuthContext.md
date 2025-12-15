# Dokumentasi Context: `AuthContext.js`

**Path File:** `src/context/AuthContext.js`

File ini adalah "Gatekeeper" keamanan aplikasi. Menggabungkan dua dunia: Autentikasi Clerk dan Database Supabase.

---

## 📌 Tujuan Utama

Aplikasi kita butuh **User ID Supabase** untuk belanja, tapi loginnya pakai **Clerk**. Context ini bertugas menukar "Identitas Clerk" menjadi "Identitas Supabase" secara otomatis.

---

## 🔧 Logika Flow Sinkronisasi (`syncUserToSupabase`)

Setiap kali aplikasi mendeteksi user login di Clerk:

1.  **Get Token**: Minta JWT Token khusus template 'supabase' dari Clerk.
2.  **Set Auth**: Masukkan token itu ke Supabase Client (`setSupabaseAuth`). Ini membuat request Supabase kita dianggap "Authenticated".
3.  **Check User**: Query ke tabel `users` Supabase. "Apakah user ini ada?".
4.  **Create if New**:
    - Jika user tidak ditemukan di Supabase, Context ini otomatis membuatkannya (`INSERT`).
    - Mengambil data email/nama dari Clerk -> Simpan ke Tabel User.
5.  **State Update**: Menyimpan objek user Supabase ke state `user`.

Dengan cara ini, frontend tidak perlu pusing. Cukup panggil `useAuthContext()`, kita langsung dapat data lengkap user.

---

## 🔑 Variabel State Penting

1.  **`clerkUser`**: Object user dari library Clerk (berisi method update password, email, dll).
2.  **`user`**: Object user dari database Supabase (berisi `id` yang dipakai sebagai Foreign Key di tabel cart/order).
3.  **`isLoading`**: Penting untuk menampilkan Splash Screen loading selama proses sync terjadi. Jangan render halaman utama sebelum ini `false`.

---

## 💡 Hubungan dengan Fitur Lain

Context ini membungkus `CartContext`.

- Tanpa `AuthContext` selesai loading, `CartContext` tidak akan jalan (karena tidak ada ID user untuk query cart).
- Ini disebut _Dependency Injection_ via React Context structure.
