# Penjelasan Baris per Baris: `HomeScreen.js` (Bahasa Manusia)

Dokumen ini menjelaskan `src/screens/HomeScreen.js`. Ini adalah halaman pembuka (Landing Page) yang pertama kali dilihat user saat buka aplikasi. Isinya simpel tapi nendang: Video Full Screen.

---

### **Persiapan (Baris 1-12)**

- **Baris 10:** Import `Video` dari paket `expo-av`. Ini komponen sakti buat muter video di React Native.
- **Baris 6:** Import `Dimensions` buat ngukur lebar layar HP (Video harus pas layar).

---

### **Tampilan Utama (Baris 14-54)**

- **Baris 16:** Wadah utama.
- **Baris 23:** Seluruh layar dibungkus `TouchableOpacity` yang mengarah ke `Dashboard`. Jadi user klik DI MANA SAJA di layar, langsung masuk ke menu utama. User gak perlu cari tombol "Start".

- **Baris 24 (Video):**

  - **Baris 26:** Logic cerdas pemilihan video.
    - Kalau layar kecil (HP) -> Ambil video versi Portrait (Tegak).
    - Kalau layar besar (Tablet/iPad) -> Ambil video versi Landscape (Lebar).
    - Tujuannya biar video gak pecah dan pas di layar.
  - `shouldPlay`: Auto play.
  - `isLooping`: Video muter terus gak berhenti.
  - `isMuted`: Suara dimatiin (biar gak kaget).
  - `useNativeControls={false}`: Tombol play/pause dihilangkan. Tampilan jadi bersih kayak poster hidup.

- **Baris 38 (Overlay Gradasi):**

  - Lapisan gelap transparan di atas video.
  - Fungsinya biar tulisan putih "Kremé Dessert House" terbaca jelas.

- **Baris 42 (Branding):**
  - Judul besar "Kremé" di tengah layar.
  - Subjudul "Dessert House".

---

### **Penutup**

- Eksport halaman ini.
