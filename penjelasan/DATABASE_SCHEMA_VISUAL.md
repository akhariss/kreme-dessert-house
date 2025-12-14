# 📊 DATABASE SCHEMA VISUALIZATION

## 🗄️ Table Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLERK OAUTH                               │
│              (Email + Google Authentication)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ sync user
                             ▼
                    ┌─────────────────┐
                    │     USERS       │
                    ├─────────────────┤
                    │ id (PK)         │
                    │ clerk_user_id   │◄─── Unique ID dari Clerk
                    │ email           │
                    │ full_name       │
                    │ avatar_url      │
                    └────────┬────────┘
                             │
                             │ 1:N (one user, many cart items)
                             ▼
                    ┌─────────────────┐
                    │      CART       │
                    ├─────────────────┤
                    │ id (PK)         │
                    │ user_id (FK) ───┘
                    │ product_id (FK)─┐
                    │ quantity        │
                    └─────────────────┘
                             │
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│                         PRODUCTS                                │
│                    (Central Table)                              │
├────────────────────────────────────────────────────────────────┤
│ id (PK)                                                         │
│ name                                                            │
│ description                                                     │
│ category                                                        │
│ is_available                                                    │
└─────┬──────────────┬──────────────┬──────────────┬─────────────┘
      │              │              │              │
      │ 1:1          │ 1:1          │ 1:1          │
      ▼              ▼              ▼              ▼
┌──────────┐  ┌──────────────┐  ┌──────────────┐  (future)
│  PRICES  │  │PRODUCT_IMAGES│  │PRODUCT_DETAILS│  ┌─────────┐
├──────────┤  ├──────────────┤  ├──────────────┤  │ ORDERS  │
│id (PK)   │  │id (PK)       │  │id (PK)       │  └─────────┘
│product_id│  │product_id (U)│  │product_id (U)│
│price     │  │image_url ────┼──► Supabase     │
│currency  │  └──────────────┘  │  Storage      │
└──────────┘                    │allergen_info  │
                                │storage_care   │
                                │ingredients    │
                                └──────────────┘

Legend:
  PK = Primary Key
  FK = Foreign Key
  (U) = Unique constraint (1:1 relationship)
  1:N = One to Many
  ───► = Reference/Points to
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      MOBILE APP                                  │
│                   (React Native + Expo)                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
        ┌──────────────┐        ┌──────────────┐
        │    CLERK     │        │  SUPABASE    │
        │   (Auth)     │        │ (Database)   │
        ├──────────────┤        ├──────────────┤
        │ • Sign Up    │        │ • PostgreSQL │
        │ • Sign In    │        │ • Storage    │
        │ • OAuth      │        │ • RLS        │
        │ • JWT Token  │──────► │ • Real-time  │
        └──────────────┘  JWT   └──────────────┘
                            verification
                                    │
                        ┌───────────┼───────────┐
                        │           │           │
                        ▼           ▼           ▼
                    Products     Cart       Users
                    (Public)   (Private)  (Private)
```

---

## 🎯 Query Examples

### **1. Get Product Lengkap**

```sql
-- Menggunakan view (recommended)
SELECT * FROM products_complete
WHERE id = 'product-uuid';

-- Atau manual join
SELECT
  p.*,
  pr.price,
  pi.image_url,
  pd.allergen_information,
  pd.storage_care
FROM products p
LEFT JOIN prices pr ON p.id = pr.product_id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_details pd ON p.id = pd.product_id
WHERE p.id = 'product-uuid';
```

### **2. Get Cart User**

```sql
-- Menggunakan view (recommended)
SELECT * FROM cart_complete
WHERE user_id = 'user-uuid';

-- Manual dengan total
SELECT
  c.*,
  p.name,
  pr.price,
  pi.image_url,
  (c.quantity * pr.price) as subtotal
FROM cart c
JOIN products p ON c.product_id = p.id
JOIN prices pr ON p.id = pr.product_id
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE c.user_id = 'user-uuid';
```

### **3. Get Total Cart Value**

```sql
SELECT
  SUM(c.quantity * pr.price) as total_amount,
  COUNT(c.id) as total_items,
  SUM(c.quantity) as total_quantity
FROM cart c
JOIN prices pr ON c.product_id = pr.product_id
WHERE c.user_id = 'user-uuid';
```

### **4. Get Products by Category**

```sql
SELECT * FROM products_complete
WHERE category = 'Macarons'
AND is_available = true
ORDER BY name;
```

---

## 📦 Storage Structure

```
Supabase Storage
│
└── products/ (bucket - public)
    ├── rose-macaron.png
    ├── raspberry-tart.png
    ├── chocolate-cake.png
    ├── pistachio-choux.png
    ├── lemon-pie.png
    ├── matcha-opera.png
    ├── vanilla-eclair.png
    └── strawberry-mille.png

URL Format:
https://lkeinracquokqpgkhwed.supabase.co/storage/v1/object/public/products/{filename}
```

---

## 🔐 Row Level Security (RLS) Policies

### **Products, Prices, Images, Details**

```sql
-- ✅ Anyone can READ (public catalog)
CREATE POLICY "Public read access"
  ON products FOR SELECT
  USING (true);

-- ❌ Only admins can WRITE (future implementation)
CREATE POLICY "Admin write access"
  ON products FOR ALL
  USING (auth.jwt()->>'role' = 'admin');
```

### **Cart**

```sql
-- ✅ Users can only see THEIR cart
CREATE POLICY "Users view own cart"
  ON cart FOR SELECT
  USING (
    user_id IN (
      SELECT id FROM users
      WHERE clerk_user_id = auth.uid()::text
    )
  );

-- ✅ Users can only modify THEIR cart
CREATE POLICY "Users manage own cart"
  ON cart FOR ALL
  USING (
    user_id IN (
      SELECT id FROM users
      WHERE clerk_user_id = auth.uid()::text
    )
  );
```

### **Users**

```sql
-- ✅ Users can only see THEIR data
CREATE POLICY "Users view own data"
  ON users FOR SELECT
  USING (clerk_user_id = auth.uid()::text);

-- ✅ Users can only update THEIR data
CREATE POLICY "Users update own data"
  ON users FOR UPDATE
  USING (clerk_user_id = auth.uid()::text);
```

---

## 🎨 Categories

Current categories dalam dataset:

1. **Macarons** - 1 product (Rose Macaron)
2. **Tarts** - 1 product (Golden Raspberry Tart)
3. **Cakes** - 2 products (Chocolate Velvet, Matcha Opera)
4. **Pies** - 1 product (Lemon Meringue Pie)
5. **Pastries** - 3 products (Pistachio Choux, Vanilla Éclair, Strawberry Mille-Feuille)

---

## 📈 Future Enhancements

### **Phase 2: Orders System**

```sql
orders:
  - id, user_id, total_amount, status

order_items:
  - id, order_id, product_id, quantity, price_snapshot
```

### **Phase 3: Reviews**

```sql
reviews:
  - id, product_id, user_id, rating, comment
```

### **Phase 4: Admin Panel**

```sql
admin_users:
  - id, user_id, role, permissions
```

---

**Visual reference untuk memahami database structure! 📊**
