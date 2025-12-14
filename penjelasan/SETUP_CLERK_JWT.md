# 🚨 ACTION REQUIRED: SETUP CLERK JWT

App Anda error karena Clerk & Supabase belum terhubung. Ikuti 3 langkah ini di browser PC/Laptop Anda:

### **Langkah 1: Buka Clerk Dashboard**

1. Login ke [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Klik aplikasi **kreme-dessert-house**
3. Di menu kiri, scroll ke bawah klik **JWT Templates**

### **Langkah 2: Buat Template "supabase"**

1. Klik tombol **New Template** (pojok kanan atas)
2. Cari dan pilih icon **Supabase** (warna hijau)
3. Di kolom **Name**, pastikan tulisannya `supabase` (huruf kecil semua)
4. Klik **Apply Changes** (atau Save)

   > ⚠️ **PENTING:** Nama template HARUS `supabase` persis. Kalau namanya beda (misal: "Supabase" atau "my-supabase"), kodingan akan ERROR.

### **Langkah 3: Restart App**

Setelah langkah di atas selesai:

1. Kembali ke terminal VS Code
2. Tekan `Ctrl + C` untuk stop server
3. Jalankan lagi: `npx expo start --clear`
4. Login di app, error akan hilang! 🎉

---

### **Kenapa Harus Melakukan Ini?**

Kodingan kita di `src/context/AuthContext.js` baris 44 memanggil:
`await getToken({ template: 'supabase' })`

Artinya app minta "tiket masuk Supabase" ke Clerk. Kalau template `supabase` belum dibuat di dashboard, Clerk tidak bisa kasih tiketnya, makanya muncul error:
`No JWT template exists with name: supabase`

**Lakukan sekarang ya!** 😊
