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
