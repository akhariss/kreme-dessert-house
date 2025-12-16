# Penjelasan Baris per Baris: `LoginScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/LoginScreen.js`. Halaman ini menangani Login, Register (Daftar), dan Verifikasi Email.

---

### **Persiapan (Baris 1-23)**

- **Baris 14:** Import hook sakti dari Clerk (`useSignIn`, `useSignUp`, `useOAuth`). Mereka yang mengurus urusan keamanan login.
- **Baris 19:** Import browser buat Google Login.
- **Baris 23:** `WebBrowser.maybeCompleteAuthSession()`. Logic penting buat Android, biar kalau login Google selesai, aplikasi tahu kalau user sudah balik ke aplikasi.

---

### **Logic Halaman (Baris 25-148)**

- **Baris 26-29:** Siapkan alat-alat Clerk (SignIn, SignUp, OAuth-Google).
- **Baris 38:** `isLogin`. Switch buat ganti mode form antara "Login" dan "Register". Kalau `true` berarti lagi mode login.

- **Fungsi Login (Baris 50):**

  - Cek email & password sudah diisi?
  - Panggil `signIn.create`.
  - Kalau sukses, aktifkan sesi login (`setActiveSignIn`).

- **Fungsi Sign Up / Daftar (Baris 76):**

  - Cek semua kolom diisi.
  - Panggil `signUp.create`.
  - **Baris 88-89:** Pecah nama lengkap (Clerk butuh First Name & Last Name terpisah).
  - **Baris 93:** Kirim kode OTP ke email (`prepareEmailAddressVerification`).
  - Munculkan popup verifikasi (`setShowVerification(true)`).

- **Fungsi Verifikasi Kode (Baris 107):**

  - Cek kode 6 digit.
  - Panggil `signUp.attemptEmailAddressVerification`.
  - Kalau kode benar, user resmi terdaftar dan login.

- **Fungsi Google Login (Baris 133):**
  - Panggil `startOAuthFlow`. Ini akan membuka browser HP buat login Google.
  - Kalau sukses, balik lagi dan aktifkan sesi.

---

### **Tampilan Utama (Baris 150-340)**

- **Baris 151:** Background Gradasi (Pink ke Putih).
- **Baris 155:** `KeyboardAvoidingView`. Biar kalau keyboard muncul, form input nggak ketutupan keyboard (formnya naik ke atas).
- **Baris 170 (Toggle Tombol):**

  - Dua tombol "Login" dan "Register" di atas.
  - Kalau diklik, dia ubah nilai `isLogin`.

- **Baris 190 (Form Input):**

  - **Baris 191:** Kolom "Full Name" cuma muncul pas lagi mode Register (`!isLogin`).
  - **Baris 210:** Kolom Email.
  - **Baris 228:** Kolom Password. Ada tombol "Mata" buat intip password (`secureTextEntry` nyala/mati).

- **Baris 256 (Tombol Submit):**

  - Tombol ini pintar. Kalau mode Login dia jalankan `handleLogin`, kalau Register dia jalankan `handleSignUp`.

- **Baris 278 (Tombol Google):**

  - Tombol opsi login alternatif pakai Google.

- **Baris 291 (Modal Verifikasi):**
  - Popup yang menutupi layar kalau user habis daftar.
  - Minta input 6 angka kode OTP.

---

### **Penutup**

- Eksport halaman ini.
