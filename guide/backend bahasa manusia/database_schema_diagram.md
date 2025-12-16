# Database Schema Diagram

Berikut adalah visualisasi hubungan antar tabel dalam database Supabase Anda (`supabsenow.sql`).

```mermaid
erDiagram
    USERS ||--o{ CART : "has"
    USERS ||--o{ ORDERS : "places"

    PRODUCTS ||--o{ CART : "is_in"
    PRODUCTS ||--|| PRICES : "has_one"
    PRODUCTS ||--|| PRODUCT_IMAGES : "has_one"
    PRODUCTS ||--|| PRODUCT_DETAILS : "has_one"
    PRODUCTS ||--o{ ORDER_ITEMS : "is_ordered_as"

    ORDERS ||--o{ ORDER_ITEMS : "contains"

    USERS {
        uuid id PK
        text clerk_user_id
        text email
        text full_name
        text avatar_url
    }

    PRODUCTS {
        uuid id PK
        text name
        text description
        text category
        boolean is_available
    }

    PRICES {
        uuid id PK
        uuid product_id FK
        numeric price
        text currency
    }

    PRODUCT_IMAGES {
        uuid id PK
        uuid product_id FK
        text image_url
    }

    PRODUCT_DETAILS {
        uuid id PK
        uuid product_id FK
        text ingredients
        text allergen_information
        text storage_care
    }

    CART {
        uuid id PK
        uuid user_id FK
        uuid product_id FK
        integer quantity
    }

    ORDERS {
        uuid id PK
        uuid user_id FK
        numeric total_amount
        text status
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        integer quantity
        numeric price_at_time
    }
```

## Penjelasan Relasi (Cardinality)

1.  **USERS ↔ ORDERS (1:N)**

    - Satu **User** bisa punya Banyak **Order** (History belanja).
    - Satu **Order** pasti milik Satu **User**.

2.  **USERS ↔ CART (1:N)**

    - Satu **User** bisa punya Banyak item di **Cart**.

3.  **ORDERS ↔ ORDER_ITEMS (1:N)**

    - Satu **Order** (Bon) terdiri dari Banyak **Order Items** (Rincian barang).

4.  **PRODUCTS ↔ PRICES / DETAILS / IMAGES (1:1)**

    - Hubungan ini unik (One-to-One).
    - Setiap **Product** hanya punya SATU harga, SATU detail, dan SATU gambar utama di tabel terpisah.
    - _Catatan: Ini adalah teknik Normalisasi database._

5.  **PRODUCTS ↔ ORDER_ITEMS (1:N)**
    - Satu jenis **Product** bisa muncul di Banyak **Order Items** (dibeli oleh banyak orang berbeda).
