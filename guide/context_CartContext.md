# Dokumentasi Context: `CartContext.js`

**Path File:** `src/context/CartContext.js`

File ini adalah "Otak" yang mengatur state keranjang belanja di seluruh aplikasi (Global State).

---

## 📌 Tujuan Utama

1.  Menyediakan data `cartItems` ke semua layar (Badge navigation, Checkout, dll).
2.  Mengimplementasikan **Optimistic UI Updates** agar aplikasi terasa cepat.
3.  Memanggil `cartService` di background.

---

## 🔧 Logika Kunci

### 1. `loadCart()` (Initialization)

Dipanggil otomatis oleh `useEffect` saat:

- User berhasil login (`isAuthenticated`).
- Data user Supabase siap (`user.id`).

Jika user logout, cart otomatis di-set kosong `[]` untuk keamanan.

### 2. Optimistic UI (The Magic)

Perhatikan logika di `addToCart` dan `updateQuantity`.
Aplikasi **TIDAK MENUNGGU** response database untuk mengupdate layar.

```javascript
// 1. Update UI DULUAN
setCartItems(prev => { ...logic tambah item... });

// 2. Kirim update ke Database di background
try {
  await cartService.addToCart(...);
} catch (error) {
  // 3. Kalau gagal, balikin lagi (Rollback)
  setCartItems(prevCart);
  alert('Gagal simpan');
}
```

**Mengapa ini penting?**
User benci loading spinner setiap kali klik tombol "+". Dengan cara ini, klik terasa instan (0 delay), padahal aslinya loading terjadi di belakang layar.

### 3. State Management Array

Menggunakan fungsi `.map`, `.filter`, dan `.reduce` bawaan JS untuk memanipulasi array immutable state.

- Menghitung Total Harga: Loop semua item, `price * quantity`.
- Menghitung Total Item: Sum quantity untuk badge icon notifikasi.

---

## 📦 Data yang Diexport (Provider)

Komponen lain bisa mengambil data ini lewat hook `useCart()`:

- `cartItems` (Data Array)
- `loading` (Boolean)
- `addToCart` (Function)
- `removeFromCart` (Function)
- `updateQuantity` (Function)
- `clearCart` (Function)
- `getTotalPrice`, `getTotalItems` (Helper Functions)
