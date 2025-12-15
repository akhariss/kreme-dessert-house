# Dokumentasi Database: Real Schema Verification

Dokumen ini berisi skema SQL **aktual** yang digunakan di database Supabase Anda, dibandingkan dengan logika kode aplikasi yang sudah ditulis.

> **Status Verifikasi**: ✅ Schema Validated
> **Format ID**: Menggunakan `UUID` (bukan Int/BigInt).

---

## 1. Schema Tables (Source of Truth)

Berikut adalah struktur tabel yang aktif di Database Anda saat ini.

### A. Users & Auth

```sql
CREATE TABLE public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  clerk_user_id text NOT NULL UNIQUE, -- Link ke Clerk Auth
  email text NOT NULL UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
```

- **Status Code**: **AKTIF**. Digunakan di `AuthContext` dan `profileService`.
- **Note**: Kolom `clerk_user_id` adalah kunci utama untuk login.

---

### B. Products Catalog (Cluster)

#### 1. Tabel Induk: `products`

```sql
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
```

#### 2. Tabel Harga: `prices`

```sql
CREATE TABLE public.prices (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL UNIQUE, -- ⚠️ STRICT 1-to-1 Constraint
  price numeric NOT NULL CHECK (price >= 0::numeric),
  currency text DEFAULT 'USD'::text,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT prices_pkey PRIMARY KEY (id),
  CONSTRAINT prices_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
```

- **⚠️ NOTE PENTING (Analisis Code vs Schema)**:
  - **Code Capability**: Code `productService.js` sebenarnya dirancang fleksibel (mengambil `prices` sebagai array) yang _mungkin_ mendukung multi-currency di masa depan.
  - **Schema Limitation (INACTIVE Feature)**: Schema di atas memiliki constraint `product_id UNIQUE`. Artinya satu produk **HANYA BOLEH** punya 1 harga di tabel ini. Fitur _Multi-Currency_ (misal ada harga IDR dan harga USD untuk barang yang sama) saat ini **TIDAK AKTIF/BLOCKED** secara database.

#### 3. Tabel Gambar: `product_images`

```sql
CREATE TABLE public.product_images (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL UNIQUE, -- ⚠️ STRICT 1-to-1 Constraint
  image_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
```

- **⚠️ NOTE PENTING**:
  - **Code Capability**: Code `productService.js` menggunakan logic `if (Array.isArray(images))` yang siap menangani banyak gambar (Carousel/Slider).
  - **Schema Limitation (INACTIVE Feature)**: Schema menggunakan `product_id UNIQUE`. Artinya satu produk hanya bisa punya **tepat 1 gambar utama**. Fitur _Gallery/Multiple Images_ saat ini **TIDAK AKTIF** di database.

#### 4. Tabel Detail: `product_details`

```sql
CREATE TABLE public.product_details (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  product_id uuid NOT NULL UNIQUE,
  allergen_information text,
  storage_care text,
  ingredients text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT product_details_pkey PRIMARY KEY (id),
  CONSTRAINT product_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
```

- **Status**: **AKTIF**. Normalisasi 1-to-1 standard.

---

### C. Transaksi (Cart & Order)

#### 1. Tabel: `cart`

```sql
CREATE TABLE public.cart (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT cart_pkey PRIMARY KEY (id),
  CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
```

- **Status**: **AKTIF**. Digunakan penuh di `cartService.js`.
- **Logic**: Code melakukan "Upsert Manual" (Cek ada tidak? Kalau ada Update, kalau tidak Insert) untuk menjaga konsistensi.

#### 2. Tabel: `orders` & `order_items`

```sql
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0::numeric),
  status text DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.order_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL,
  product_id uuid,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_time numeric NOT NULL, -- Snapshot Harga
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
```

- **Status**: **AKTIF** (Logic ada di `orderService.js`).
- **Fitur Inactive**: Code saat ini meng-hardcode status `'pending'`. Belum ada fitur payment gateway switch / update status order.

---

## 2. Kesimpulan "Inactive" Features

Berdasarkan perbandingan Schema vs Code:

1.  **❌ Multi-Currency**: Tidak bisa dijalankan karena tabel `prices` membatasi 1 produk = 1 harga.
2.  **❌ Image Gallery**: Tidak bisa dijalankan karena tabel `product_images` membatasi 1 produk = 1 gambar. Code frontend yang mungkin sudah siap menampilkan slider hanya akan menampilkan 1 gambar.
3.  **❌ Auto-Update Timestamp**: Kolom `updated_at` ada di database, tetapi tidak ada Trigger SQL otomatis di schema untuk mengupdatenya (`ON UPDATE SET ...`). Code Backend (`productService`) juga tidak secara eksplisit mengirim field `updated_at: new Date()` saat update. Jadi kolom ini mungkin _stagnan_ (tidak berubah) kecuali diatur manual lewat Trigger database.
