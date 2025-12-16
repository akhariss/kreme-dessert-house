# Deep Dive Implementasi: `productService.js`

Dokumen ini menjelaskan detail implementasi kode di `src/backend/productService.js` berdasarkan panduan arsitektur yang telah ditetapkan. File ini berfungsi sebagai "jembatan" yang menghubungkan aplikasi (UI) dengan database Supabase yang kompleks.

---

### 1. `getAllProducts()`

**Konsep:**
Fungsi ini mengambil katalog untuk Home Screen. Karena data tersebar (harga di tabel `prices`, gambar di `product_images`), kita perlu melakukan JOIN dan hanya mengambil produk yang `is_available = true`.

**Implementasi Code:**

```javascript
getAllProducts: async () => {
  // Logic SELECT dengan filter dan JOIN tabel prices & product_images
  const { data, error } = await supabase
    .from('products')
    .select('id, ..., prices(price, currency), product_images(image_url)')
    .eq('is_available', true); // Filter hanya produk yang tersedia

  // Format data: Mengubah struktur array/object nested dari Supabase
  // menjadi object flat yang mudah dipakai UI (misal: prices[0].price jadi price langsung)
  return data.map(product => { ... });
}
```

_Poin Penting: Logic mapping di akhir fungsi memastikan UI menerima object datar sederhana, menyembunyikan kompleksitas relation database._

---

### 2. `getProductById(id)`

**Konsep:**
Mengambil detail lengkap satu produk (resep, alergi, penyimpanan) untuk halaman Detail. Menggunakan `.maybeSingle()` adalah best-practice untuk menangani kasus ID tidak ditemukan tanpa melempar exception error.

**Implementasi Code:**

```javascript
getProductById: async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      prices (price, currency),
      product_images (image_url),
      product_details (allergen_information, storage_care, ingredients)
    `
    ) // Load SEMUA data terkait (detail, harga, gambar)
    .eq("id", id)
    .maybeSingle(); // PENTING: Return null jika tidak ketemu, bukan error

  if (!data) return null;
  return data;
};
```

---

### 3. `createProduct(productData)`

**Konsep:**
Operasi **Multi-Table Insert**. Supabase (PostgreSQL) menuntut kita mengisi tabel induk dulu (`products`) untuk mendapatkan ID, baru bisa mengisi tabel anak (`prices`, `details`, `images`) menggunakan ID tersebut.

**Implementasi Code:**

```javascript
createProduct: async (productData) => {
  // 1. Insert ke tabel induk (PRODUCTS) dan ambil ID barunya
  const { data: prodData } = await supabase.from('products').insert({ ... }).select().single();
  const newId = prodData.id;

  // 2. Insert ke tabel PRICES pakai ID tadi
  await supabase.from('prices').insert({ product_id: newId, ... });

  // 3. Insert ke tabel DETAILS
  await supabase.from('product_details').insert({ product_id: newId, ... });

  // 4. Insert ke tabel IMAGES (Jika ada upload gambar)
  if (productData.imageUrl) {
    await supabase.from('product_images').insert({ product_id: newId, ... });
  }
}
```

---

### 4. `updateProduct(id, productData)`

**Konsep:**
Logic **Upsert (Update or Insert)** manual. Kita tidak bisa berasumsi data anak (harga/detail) sudah ada.

- Jika data sudah ada -> Lakukan `UPDATE`.
- Jika belum ada (misal data legacy) -> Lakukan `INSERT`.

**Implementasi Code:**

```javascript
updateProduct: async (id, productData) => {
  // 1. Update tabel PRODUCTS (langsung update karena pasti ada)
  await supabase.from('products').update({ ... }).eq('id', id);

  // 2. Logic Cerdas untuk PRICES (Cek dulu baru aksi)
  const { data: priceData } = await supabase.from('prices').select('id').eq('product_id', id).single();
  if (priceData) {
    // Kalau sudah ada -> UPDATE
    await supabase.from('prices').update({ ... }).eq('product_id', id);
  } else {
    // Kalau produk lama belum punya harga -> INSERT
    await supabase.from('prices').insert({ product_id: id, ... });
  }

  // (Pola yang sama diulang untuk product_details dan product_images)
}
```

---

### 5. `deleteProduct(id)`

**Konsep:**
Memanfaatkan fitur **Cascade Delete** di database PostgreSQL. Kita tidak perlu menghapus manual data di tabel anak. Cukup hapus induknya, sisanya otomatis bersih.

**Implementasi Code:**

```javascript
deleteProduct: async (id) => {
  // Simple & Clean: Cukup hapus induknya saja
  const { error } = await supabase.from("products").delete().eq("id", id);

  // Tidak perlu code tambahan untuk hapus prices/images, database yang kerja.
};
```

---

### 6. `uploadProductImage(imageUri)`

**Konsep:**
React Native tidak memiliki objek `File` seperti di browser. Kita harus membaca file lokal menjadi binary (`ArrayBuffer`) menggunakan `fetch` sebelum bisa di-upload ke Supabase Storage.

**Implementasi Code:**

```javascript
uploadProductImage: async (imageUri) => {
  // 1. Fetch file lokal dan ubah jadi ArrayBuffer (Binary)
  const response = await fetch(imageUri);
  const arrayBuffer = await response.arrayBuffer();

  // 2. Generate nama unik
  const fileName = `product_${Date.now()}.png`;

  // 3. Upload ke Storage Bucket 'products'
  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, arrayBuffer, { upsert: true });

  // 4. Minta Public URL untuk disimpan di DB
  const { data: urlData } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);
  return urlData.publicUrl;
};
```
