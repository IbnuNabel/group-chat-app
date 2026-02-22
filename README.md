# 💬 Aplikasi Group Chat Berbasis Web
**Tugas Studi Kasus Konsep Client dan Server Side Scripting** 
Mata Kuliah: CIF62237 Keamanan Aplikasi Berbasis Web  
Fakultas Ilmu Komputer, Universitas Brawijaya

---

## 📖 Deskripsi Proyek
Proyek ini adalah aplikasi *Group Chat* sederhana yang mendemonstrasikan pemisahan arsitektur antara **Client-Side** dan **Server-Side**. Aplikasi ini mengimplementasikan komunikasi berbasis REST API, sistem autentikasi (JWT), dan manajemen sesi menggunakan Web Storage (Session Storage / Local Storage).

## ✨ Fitur Utama
- **Autentikasi Pengguna:** Login dan Logout dengan manajemen sesi berbasis token.
- **Manajemen Sesi Cerdas:** Penggunaan `sessionStorage` (default) atau `localStorage` (jika fitur "Ingat Saya" dicentang).
- **Proteksi Halaman:** Pengalihan (redirect) otomatis jika pengguna mencoba mengakses ruang obrolan tanpa token (belum login).
- **Real-time Polling Chat:** Pesan yang dikirim oleh satu pengguna dapat diterima dan diurutkan berdasarkan *timestamp* di layar pengguna lain secara sinkron.

---

## 🛠️ Teknologi yang Digunakan
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6).
* **Backend:** Node.js, Express.js.
* **Keamanan & Autentikasi:** JSON Web Token (JWT) & CORS.

---

## 📂 Struktur Repositori Terkait
```text
/group-chat-app
├── /backend                 # Server API (Node.js/Express)
│   ├── /config              # Konfigurasi DB dummy & Auth
│   ├── /controllers         # Logika endpoint API
│   ├── /models              # Struktur data (User, Message)
│   ├── /routes              # Definisi rute REST API
│   └── server.js            # Entry point backend
│
├── /frontend                # Antarmuka Pengguna
│   ├── /css                 # Styling halaman
│   ├── /js                  # Logika Client-Side & Web Storage
│   ├── index.html           # Pengalihan halaman otomatis
│   ├── login.html           # Halaman Login
│   └── chat.html            # Halaman Ruang Obrolan (Group Chat)
│
└── /docs                    # Dokumentasi & Laporan Akhir

---

## 🚀 𝐂𝐚𝐫𝐚 𝐌𝐞𝐧𝐣𝐚𝐥𝐚𝐧𝐤𝐚𝐧 𝐀𝐩𝐥𝐢𝐤𝐚𝐬𝐢

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer lokal Anda:

### 𝟏. 𝐏𝐞𝐫𝐬𝐢𝐚𝐩𝐚𝐧 𝐀𝐰𝐚𝐥
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### 𝟐. 𝐂𝐥𝐨𝐧𝐞 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐢
```bash
git clone [https://github.com/IbnuNabel/group-chat-app.git](https://github.com/IbnuNabel/group-chat-app.git)
cd group-chat-app

### 𝟑. 𝐒𝐞𝐭𝐮𝐩 𝐁𝐚𝐜𝐤𝐞𝐧𝐝
```bash
1. Masuk ke folder backend: cd backend
2. Instal dependencies: npm install
3. Buat file .env di dalam folder backend dan tambahkan:
   PORT=5000
   JWT_SECRET=rahasia_kelompok_kita_123
4. Jalankan server: node server.js

### 𝟒. 𝐒𝐞𝐭𝐮𝐩 𝐅𝐫𝐨𝐧𝐭𝐞𝐧𝐝
1. Buka terminal baru (tetap biarkan terminal backend berjalan).
2. Masuk ke folder frontend: cd frontend
3. Buka file index.html langsung di browser, atau gunakan extension Live Server di VS Code untuk pengalaman yang lebih baik.
