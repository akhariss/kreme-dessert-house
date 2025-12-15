# Dokumentasi Config: `supabase.js`

**Path File:** `src/config/supabase.js`

File konfigurasi inti untuk koneksi database.

---

## 🔧 Poin-Poin Kode

### 1. Inisialisasi Client

```javascript
export const supabase = createClient(apiUrl, apiKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
```

**PENTING**: Kita mematikan (`false`) fitur auth bawaan Supabase (persist & refresh). Mengapa? Karena kita mendelegasikan semua manajemen sesi login ke **Clerk**. Supabase di sini diperlakukan murni sebagai "Data Store", bukan "Auth Provider".

### 2. Fungsi `setSupabaseAuth(token)`

Fungsi vital untuk keamanan RLS (Row Level Security).

- Token JWT yang didapat dari Clerk, disuntikkan ke sini.
- Supabase akan membaca token ini di setiap request database untuk mengetahui "Siapa yang request data ini?".
- Tanpa fungsi ini, database akan menganggap semua request sebagai "Anonymous" dan mungkin menolak akses (tergantung setting RLS di dashboard).

### 3. Environment Variables

Menggunakan `process.env.EXPO_PUBLIC_...`. Prefix `EXPO_PUBLIC_` wajib ada agar variabel ini terbaca di aplikasi React Native (Expo).

---

# Dokumentasi Config: `clerk.js`

**Path File:** `src/config/clerk.js`

File helper untuk integrasi Clerk dengan ekosistem Expo (React Native).

---

## 🔧 Token Cache (`tokenCache`)

Secara default, Clerk didesain untuk Web (menyimpan token di Browser Cookies/LocalStorage). Di HP (React Native), tidak ada cookie.

Fungsi `tokenCache` di sini meng-override perilaku save token Clerk:

1.  User Login -> Token dapat.
2.  Clerk panggil `tokenCache.saveToken`.
3.  Kita simpan token ke **`expo-secure-store`** (Encrypted Storage di HP).
4.  Saat aplikasi dibuka lagi -> Clerk panggil `tokenCache.getToken`.
5.  Kita ambil dari SecureStore -> User auto-login.

Tanpa konfigurasi ini, user akan ter-logout setiap kali menutup aplikasi.
