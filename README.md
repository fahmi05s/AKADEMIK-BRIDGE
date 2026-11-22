# AKADEMIK BRIDGE

Platform kosakata akademik bilingual Indonesia–Thai (React + Vite + Tailwind CSS). Tanpa backend; data kosakata di `src/data/vocabulary.js`, kosakata tersimpan di LocalStorage.

## Menjalankan lokal
    npm install
    npm run dev
    npm run build

## Deploy ke Vercel
1. **Unduh** ZIP proyek, lalu ekstrak.
2. **Upload ke GitHub**: buat repository baru di github.com, lalu di folder proyek jalankan `git init`, `git add .`, `git commit -m "AKADEMIK BRIDGE"`, `git branch -M main`, `git remote add origin <URL-repo>`, `git push -u origin main` (atau unggah file lewat tombol *Add file → Upload files*).
3. **Hubungkan ke Vercel**: masuk ke vercel.com dengan akun GitHub, klik *Add New → Project*, pilih repository tadi.
4. **Deploy**: Vercel mendeteksi Vite otomatis (Build: `npm run build`, Output: `dist`). Klik *Deploy*.
5. **URL publik**: setelah selesai, Vercel memberi alamat `https://nama-proyek.vercel.app`.
6. **Bagikan** URL tersebut ke dosen dan mahasiswa. Setiap `git push` ke `main` memperbarui situs otomatis.

Navigasi memakai hash (`#/cari`) dan `vercel.json` sudah menyertakan rewrite SPA, jadi refresh halaman tidak menghasilkan 404.
