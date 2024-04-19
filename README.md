# AutoViewStatus

## Deskripsi:

AutoViewStatus adalah sebuah bot WhatsApp yang dibangun menggunakan Node.js. Bot ini menggunakan library `@whiskeysockets/baileys` untuk terhubung ke layanan WhatsApp dan melakukan tindakan spesifik, yaitu melihat status WhatsApp. Bot ini juga dilengkapi dengan fitur autentikasi multi-file, penyimpanan dalam memori, dan penanganan koneksi yang kuat.

## Fitur:

- **Melihat Status WhatsApp**: Bot dapat secara otomatis melihat status WhatsApp yang terbaru.
- **Autentikasi Multi-file**: Bot dapat melakukan autentikasi dengan menggunakan berbagai file sesi untuk keamanan tambahan.
- **Tampilan QR Code**: Bot dapat menampilkan QR code di terminal untuk autentikasi WhatsApp.
- **Notifikasi Koneksi**: Bot memberikan notifikasi visual saat terhubung atau terputus dari layanan WhatsApp.
- **Penanganan Kesalahan**: Bot memiliki penanganan kesalahan yang kuat untuk mengatasi masalah koneksi dan autentikasi.

## Penggunaan:

1. Instal semua dependensi dengan menjalankan `npm install`.
2. Jalankan bot dengan perintah `node index.js`.
3. Bot akan menampilkan QR code di terminal. Gunakan ponsel Anda untuk memindai QR code tersebut.
4. Bot akan secara otomatis melihat status WhatsApp dan menampilkan hasilnya.