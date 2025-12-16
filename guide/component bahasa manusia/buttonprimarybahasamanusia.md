# Penjelasan Baris per Baris: `ButtonPrimary.js` (Bahasa Manusia)

Dokumen ini menjelaskan kode `src/components/ButtonPrimary.js`. Ini adalah komponen tombol serbaguna yang bisa berubah bentuk (warna biasa atau gradasi).

---

### **Persiapan (Baris 1-4)**

- **Baris 3:** Import `LinearGradient`. Ini bahan rahasia biar tombolnya punya warna gradasi (campuran dua warna) yang keren.

---

### **Komponen Utama (Baris 7-53)**

- **Baris 7:** Komponen `ButtonPrimary` menerima banyak settingan:

  - `title`: Tulisan di tombolnya.
  - `onPress`: Aksi pas diklik.
  - `variant`: Jenis tombolnya. Ada 3 rasa: `'primary'` (utama/gradasi), `'secondary'` (biasa), atau `'outline'` (garis tepi doang).
  - `disabled`: Status mati/hidup.

- **Baris 8-15 (Ramuan Style Tombol):**

  - Kita bikin array `buttonStyle`. Isinya gabungan dari berbagai style.
  - Dimulai dari `baseButton` (style dasar: bulat, tengah).
  - Terus ditambah style sesuai variannya (kalau primary ya pakai style primary, dst).
  - Kalau `disabled`, tambah style tombol mati (agak transparan).

- **Baris 18-24 (Ramuan Style Teks):**

  - Sama kayak tombol, tapi ini buat warna teksnya.
  - Misal: Tombol `'outline'` teksnya berwarna, tapi tombol `'primary'` teksnya putih.

- **Baris 27-31 (Pengaman Klik):**

  - Fungsi `handlePress` ini satpam. Dia memastikan tombol cuma bisa diklik kalau **tidak sedang disabled**.

- **Baris 33-46 (Logic Render Tombol Utama):**

  - KHUSUS kalau variannya `'primary'`, kita bungkus tombolnya pakai `LinearGradient`.
  - Warnanya gradasi dari `theme.colors.primary` ke `theme.colors.darkPink`.
  - Kalau lagi disabled/mati, warnanya jadi abu-abu (`gray`).

- **Baris 48-52 (Logic Render Tombol Lain):**
  - Kalau BUKAN primary (misal secondary atau outline), kita pakai tombol kotak biasa tanpa gradasi.

---

### **Gaya / Styling (Baris 55-97)**

- Berisi resep css-nya React Native:
- `baseButton`: Padding tebal biar tombolnya gendut enak dipencet, sudutnya bulat banget (`borderRadius.xl`).
- `outlineButton`: Latar belakangnya transparan, tapi ada garis tepinya (`borderWidth: 2`).

---

### **Penutup (Baris 99)**

- Eksport komponen biar bisa dipakai di seluruh aplikasi.
